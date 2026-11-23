import { useState } from "react";
import PageLayout from "@/components/Layout/PageLayout";
import UserProfile from "@/components/UserProfile";
import ProfileForm from "@/components/ProfileForm";
import MyActivities from "@/components/MyActivities";
import { Divider, Overlay } from "@/components/ui/Layout";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <PageLayout title="Mein Profil">
      <UserProfile onEdit={() => setIsEditing(true)} />
      <Divider />
      <MyActivities />

      {isEditing && (
        <Overlay>
          <ProfileForm onClose={() => setIsEditing(false)} />
        </Overlay>
      )}
    </PageLayout>
  );
}
