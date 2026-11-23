import { toast } from "react-toastify";
export default async function handleDelete(endpoint, router) {
  const response = await fetch(endpoint, {
    method: "DELETE",
  });
  if (response.ok) {
    toast.success("Aktivität gelöscht.");
    router.back();
  } else {
    toast.error("Löschen fehlgeschlagen.");
  }
}
