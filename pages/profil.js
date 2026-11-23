import { useState } from "react";
import PageLayout from "@/components/Layout/PageLayout";
import UserProfile from "@/components/UserProfile";
import ProfileForm from "@/components/ProfileForm";
import { Overlay } from "@/components/ui/Layout";

/* Profile only – more profile details can be added here later */
export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <PageLayout title="Mein Profil">
      <UserProfile onEdit={() => setIsEditing(true)} />

      {isEditing && (
        <Overlay>
          <ProfileForm onClose={() => setIsEditing(false)} />
        </Overlay>
      )}
    </PageLayout>
  );
}
