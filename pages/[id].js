import DetailsCard from "@/components/DetailsCard";
import useAuthentication from "./api/auth/useAuthentication";
import { StatusText } from "@/components/ui/Typography";

export default function DetailsCardPage() {
  const { authenticated, loading } = useAuthentication();

  if (loading) return <StatusText>Lädt …</StatusText>;
  if (!authenticated) {
    return <StatusText>Bitte melde dich an, um diese Seite zu sehen.</StatusText>;
  }

  return <DetailsCard />;
}
