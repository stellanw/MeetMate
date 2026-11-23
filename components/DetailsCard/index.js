import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import useStore from "@/store";
import CardForm from "../CardForm";
import PageLayout from "@/components/Layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, JoinBadge } from "@/components/ui/Card";
import Face from "@/Icons/Face";
import { FormGrid, FormLabel, FormValue } from "@/components/ui/Form";
import { Overlay, Row, Stack } from "@/components/ui/Layout";
import { StatusText } from "@/components/ui/Typography";
import handleDelete from "@/utils/components/DetailsCard/handleDelete";
import handleJoin from "@/utils/components/DetailsCard/handleJoin";
import { categoryLabel } from "@/utils/categories";
import formatLongDate from "@/utils/formatLongDate";
import { isAuthor, isParticipant } from "@/utils/participation";

export default function DetailsCard() {
  const router = useRouter();
  const { id } = router.query;
  const endpoint = `/api/activities/${id}`;
  const {
    data: activity,
    isLoading,
    mutate,
    error,
  } = useSWR(id ? endpoint : null);
  const { mutate: mutateGlobal } = useSWRConfig();
  const { data: session } = useSession();
  const { isEditMode, setIsEditMode, handleEditClick } = useStore();
  const userId = session?.user?.id;

  if (isLoading) return <StatusText>Lädt …</StatusText>;
  if (!activity || error) {
    return <StatusText>Hoppla, da ist etwas schiefgelaufen …</StatusText>;
  }

  const joined = isParticipant(activity, userId);
  const ownActivity = isAuthor(activity, userId);

  const toggleJoin = async () => {
    await handleJoin(activity, userId, mutate);
    mutateGlobal("/api/activities");
  };

  const details = [
    ["Von", activity.author],
    ["Datum", formatLongDate(activity.date)],
    ["Uhrzeit", activity.time],
    ["Ort", activity.location],
    ["Kategorie", categoryLabel(activity.category)],
  ];

  return (
    <PageLayout title="Bist du dabei?" close>
      <StyledNameCard $category={activity.category}>
        <JoinBadge together={joined} />
        <CardTitle as="h2">{activity.name}</CardTitle>
      </StyledNameCard>

      <Card $padded>
        <Stack $gap="l">
          <FormGrid>
            {details.map(([label, value]) => (
              <DetailRow key={label} label={label} value={value} />
            ))}
          </FormGrid>

          {activity.description && (
            <Stack $gap="s">
              <FormLabel as="span">Beschreibung:</FormLabel>
              <p>{activity.description}</p>
            </Stack>
          )}

          {/* own activity: edit · "Deine Aktivität" · delete – others: join/leave */}
          <Row $gap="m">
            {ownActivity && (
              <Button
                onClick={handleEditClick}
                $square
                aria-label="Aktivität bearbeiten"
              >
                <FiEdit3 />
              </Button>
            )}
            {ownActivity ? (
              /* not clickable → same box as a button, but no shadow */
              <StyledOwnActivity>
                <Face together animated={false} />
                Deine Aktivität
              </StyledOwnActivity>
            ) : (
              <Button
                $fill
                $variant={joined ? "alert" : "confirm"}
                onClick={toggleJoin}
              >
                {/* icon shows the result: together (XX) or alone again (X) */}
                <Face together={!joined} animated={false} />
                {joined ? "Nicht dabei" : "Bin dabei"}
              </Button>
            )}
            {ownActivity && (
              <Button
                $square
                aria-label="Aktivität löschen"
                onClick={() => {
                  if (
                    window.confirm(
                      "Möchtest du diese Aktivität wirklich löschen?"
                    )
                  ) {
                    handleDelete(endpoint, router);
                  }
                }}
              >
                <FiTrash2 />
              </Button>
            )}
          </Row>
        </Stack>
      </Card>

      {isEditMode && (
        <Overlay>
          <CardForm
            onCancel={() => setIsEditMode(false)}
            existingActivityData={activity}
            pageTitle="Aktivität bearbeiten"
          />
        </Overlay>
      )}
    </PageLayout>
  );
}

function DetailRow({ label, value }) {
  return (
    <>
      <FormLabel as="span">{label}:</FormLabel>
      <FormValue>{value || "–"}</FormValue>
    </>
  );
}

const StyledNameCard = styled(Card)`
  display: flex;
  align-items: center;
  min-height: var(--card-height);
  padding-inline: var(--space-m);
`;

const StyledOwnActivity = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: var(--space-s);
  height: var(--control-m);
  font-family: var(--font-heading);
  background-color: var(--color-confirm);
  border: var(--border-medium) solid var(--color-text);
  border-radius: var(--radius-m);

  svg {
    width: var(--icon-m);
    height: var(--icon-m);
  }
`;
