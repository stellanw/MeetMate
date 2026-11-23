import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import { FiSave, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardCloseButton,
  CardTitleInput,
  TitleCard,
} from "@/components/ui/Card";
import { Container, Stack } from "@/components/ui/Layout";
import { StatusText } from "@/components/ui/Typography";

/* Edit the own profile – same layout as the activity form */
export default function ProfileForm({ onClose }) {
  const { data: session, update } = useSession();
  const { mutate } = useSWRConfig();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const name = new FormData(event.target).get("name");
    setIsSaving(true);

    const response = await fetch("/api/users/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setIsSaving(false);
    if (!response.ok) {
      toast.error("Speichern fehlgeschlagen. Bitte versuch es noch einmal.");
      return;
    }

    await update(); // reload the session so the new name shows everywhere
    mutate("/api/users");
    mutate("/api/activities");
    toast.success("Profil gespeichert!");
    onClose();
  }

  return (
    <Container>
      <Stack as="form" $gap="m" aria-label="Profil bearbeiten" onSubmit={handleSubmit}>
        <TitleCard>
          <CardTitleInput
            name="name"
            aria-label="Dein Name"
            defaultValue={session?.user?.name ?? ""}
            minLength={2}
            maxLength={40}
            autoComplete="name"
            autoFocus
            required
          />
          <CardCloseButton onClick={onClose}>
            <FiX />
          </CardCloseButton>
        </TitleCard>

        <Card $padded>
          <Stack $gap="m">
            <StatusText as="p">
              Dein Profilbild kommt von deinem GitHub-Account.
            </StatusText>
            <Button type="submit" $wide disabled={isSaving}>
              Speichern
              <FiSave />
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
