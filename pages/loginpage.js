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
        <Stack $gap="l" $center>
          <SectionTitle as="h1">Plan meetups with your friends</SectionTitle>
          <p>Sign in with your GitHub account to get started.</p>
          <Button onClick={() => signIn("github")} $wide>
            Sign in with GitHub
            <FiLogIn />
          </Button>
        </Stack>
      </Card>
    </PageLayout>
  );
}
