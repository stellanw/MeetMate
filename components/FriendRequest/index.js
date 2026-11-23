import { FiCheck, FiX } from "react-icons/fi";
import FriendCard from "@/components/FriendCard";
import { Button } from "@/components/ui/Button";
import { Collapsible, Stack } from "@/components/ui/Layout";
import { SectionTitle, StatusText } from "@/components/ui/Typography";
import handleRemoveFromFriendRequests from "@/utils/components/FriendRequest/handleRemoveFromFriendRequests";
import handleAccept from "@/utils/components/FriendRequest/handleAccept";

export default function FriendRequest({
  showRequestWindow,
  friendRequestList,
  allUsers,
  session,
  myMates,
  setMyMates,
  userId,
}) {
  const getUserName = (id) =>
    allUsers?.find((user) => user._id === id)?.name ?? "";

  return (
    <Collapsible open={showRequestWindow}>
      <Stack as="section" $gap="l">
        <SectionTitle>We wanna be your mates!</SectionTitle>
        {friendRequestList.length > 0 ? (
          <Stack as="ul" $gap="l">
            {friendRequestList.map((request) => (
              <FriendCard key={request} name={getUserName(request)}>
                <Button
                  $size="s"
                  $square
                  $variant="confirm"
                  aria-label="Accept"
                  onClick={() => {
                    handleAccept(request, session, setMyMates, myMates);
                    handleRemoveFromFriendRequests(request, userId);
                  }}
                >
                  <FiCheck />
                </Button>
                <Button
                  $size="s"
                  $square
                  $variant="alert"
                  aria-label="Decline"
                  onClick={() => handleRemoveFromFriendRequests(request, userId)}
                >
                  <FiX />
                </Button>
              </FriendCard>
            ))}
          </Stack>
        ) : (
          <StatusText>No open friend requests.</StatusText>
        )}
      </Stack>
    </Collapsible>
  );
}
