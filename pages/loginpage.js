import { signIn } from "next-auth/react";
import { FiLogIn } from "react-icons/fi";
import PageLayout from "@/components/Layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Stack } from "@/components/ui/Layout";
import { SectionTitle } from "@/components/ui/Typography";

export default function LoginPage() {
  return (
    <PageLayout showNavigation={false}>
      <Card $padded>
        <Stack $gap="m">
          <SectionTitle as="h1">Triff dich mit deinen Freund*innen</SectionTitle>
          <p>Melde dich mit deinem GitHub-Account an, um loszulegen.</p>
          <Button onClick={() => signIn("github")} $wide>
            Mit GitHub anmelden
            <FiLogIn />
          </Button>
        </Stack>
      </Card>
    </PageLayout>
  );
}
