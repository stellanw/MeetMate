import DetailsCard from "@/components/DetailsCard";
import useAuthentication from "./api/auth/useAuthentication";
import { StatusText } from "@/components/ui/Typography";

export default function DetailsCardPage() {
  const { authenticated, loading } = useAuthentication();

  if (loading) return <StatusText>Loading...</StatusText>;
  if (!authenticated) {
    return <StatusText>You must be signed in to view this page.</StatusText>;
  }

  return <DetailsCard />;
}
