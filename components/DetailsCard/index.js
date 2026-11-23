import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import useStore from "@/store";
import CardForm from "../CardForm";
import PageLayout from "@/components/Layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, JoinBadge } from "@/components/ui/Card";
import { FormGrid, FormLabel, FormValue } from "@/components/ui/Form";
import { Overlay, Row, Stack } from "@/components/ui/Layout";
import { StatusText } from "@/components/ui/Typography";
import handleDelete from "@/utils/components/DetailsCard/handleDelete";
import handleJoin from "@/utils/components/DetailsCard/handleJoin";
import { categoryLabel } from "@/utils/categories";
import formatLongDate from "@/utils/formatLongDate";

export default function DetailsCard() {
  const router = useRouter();
  const { id } = router.query;
  const endpoint = `/api/activities/${id}`;
  const { data: activities, isLoading, mutate, error } = useSWR(endpoint);
  const { isEditMode, setIsEditMode, handleEditClick } = useStore();
  const [joinState, setJoinState] = useState({
    isJoined: false,
    joinButtonText: "Join",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetch(endpoint);
          if (!response.ok) {
            console.error("Error fetching activity:", response.statusText);
            return;
          }
          const activityData = await response.json();

          setJoinState((prevState) => ({
            ...prevState,
            isJoined: activityData.joined,
          }));
        }
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchData();
  }, [id, endpoint]);

  if (isLoading) return <StatusText>Lädt …</StatusText>;
  if (!activities || error) {
    return <StatusText>Hoppla, da ist etwas schiefgelaufen …</StatusText>;
  }

  const details = [
    ["Von", activities.author],
    ["Datum", formatLongDate(activities.date)],
    ["Uhrzeit", activities.time],
    ["Ort", activities.location],
    ["Kategorie", categoryLabel(activities.category)],
  ];

  return (
    <PageLayout title="Bist du dabei?" close>
      <StyledNameCard $category={activities.category}>
        {joinState.isJoined && <JoinBadge aria-label="Dabei">XX</JoinBadge>}
        <CardTitle as="h2">{activities.name}</CardTitle>
      </StyledNameCard>

      <Card $padded>
        <Stack $gap="l">
          <FormGrid>
            {details.map(([label, value]) => (
              <DetailRow key={label} label={label} value={value} />
            ))}
          </FormGrid>

          {activities.description && (
            <Stack $gap="s">
              <FormLabel as="span">Beschreibung:</FormLabel>
              <p>{activities.description}</p>
            </Stack>
          )}

          <Button
            $wide
            $variant={joinState.isJoined ? "alert" : "confirm"}
            onClick={() => handleJoin(setJoinState, joinState, endpoint, mutate)}
          >
            {joinState.isJoined ? "Doch nicht dabei" : "XX Ich bin dabei"}
          </Button>

          <Row $justify="center" $gap="m">
            <Button onClick={handleEditClick} $square aria-label="Aktivität bearbeiten">
              <FiEdit3 />
            </Button>
            <Button
              $square
              aria-label="Aktivität löschen"
              onClick={() => {
                if (
                  window.confirm("Möchtest du diese Aktivität wirklich löschen?")
                ) {
                  handleDelete(endpoint, router);
                }
              }}
            >
              <FiTrash2 />
            </Button>
          </Row>
        </Stack>
      </Card>

      {isEditMode && (
        <Overlay>
          <CardForm
            onCancel={() => setIsEditMode(false)}
            existingActivityData={activities}
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
