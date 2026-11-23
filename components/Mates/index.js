import { useEffect, useState } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";
import { FiUserPlus, FiPlus, FiX } from "react-icons/fi";
import useAuthentication from "@/pages/api/auth/useAuthentication";
import FriendRequest from "@/components/FriendRequest";
import FriendCard from "@/components/FriendCard";
import { Button } from "@/components/ui/Button";
import { SearchField } from "@/components/ui/Form";
import { Row, Stack } from "@/components/ui/Layout";
import { StatusText } from "@/components/ui/Typography";
import handleDeleteClick from "@/utils/pages/friendlist/handleDeleteClick";
import handleSendFriendRequest from "@/utils/pages/friendlist/handleSendFriendRequest";

/* Content of the "Meine Mates" page: search, requests, friend list */
const fuseOptions = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ["name"],
};

export default function Mates() {
  const { authenticated, loading, session } = useAuthentication();
  const userId = session?.user?.id;
  const [myMates, setMyMates] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [showRequestWindow, setShowRequestWindow] = useState(false);
  const [mates, setMates] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const { data: allUser, error: error2, isLoading } = useSWR(`/api/users`);

  useEffect(() => {
    if (session) {
      setMyMates(session.user?.friends);
      setFriendRequests(session.user?.friendRequests);
      setFuse(new Fuse(allUser, fuseOptions));
    }
  }, [session, allUser]);

  function handleSearch(event) {
    const searchTerm = event.target.value.trim();
    setIsSearching(searchTerm !== "");
    if (!fuse || searchTerm === "") return;

    const searchResult = fuse.search(searchTerm);
    setMates(searchResult.map((result) => result.item));
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  const toggleRequestWindow = () => {
    setShowRequestWindow(!showRequestWindow);
  };

  if (isLoading || loading) return <StatusText>Lädt …</StatusText>;
  if (!authenticated) {
    return (
      <StatusText>Bitte melde dich an, um diese Seite zu sehen.</StatusText>
    );
  }

  const isFriend = (mateId) =>
    session.user.friends.some((friend) => friend === mateId);

  const friends = (allUser ?? []).filter((user) =>
    myMates.find((friend) => friend === user._id)
  );

  return (
    <Stack as="section" $gap="m">
      <div>
        <Row $gap="m">
          <SearchField
            label="Mates suchen"
            onChange={handleSearch}
            onKeyDown={handleKeyPress}
          />
          <Button
            onClick={toggleRequestWindow}
            $square
            aria-label="Freundschaftsanfragen"
            aria-expanded={showRequestWindow}
          >
            <FiUserPlus />
          </Button>
        </Row>

        {allUser && myMates && (
          <FriendRequest
            showRequestWindow={showRequestWindow}
            friendRequestList={friendRequests}
            allUsers={allUser}
            session={session}
            myMates={myMates}
            setMyMates={setMyMates}
            userId={userId}
          />
        )}
      </div>

      {isSearching &&
        (mates.length > 0 ? (
          <Stack as="ul" $gap="m" aria-label="Suchergebnisse">
            {mates.map((mate) => (
              <FriendCard key={mate._id} name={mate.name}>
                {isFriend(mate._id) ? (
                  <span>Mate ✓</span>
                ) : (
                  <Button
                    $square
                    $variant="confirm"
                    aria-label={`Freundschaftsanfrage an ${mate.name} senden`}
                    onClick={() =>
                      handleSendFriendRequest(
                        mate._id,
                        userId,
                        setFriendRequests,
                        friendRequests
                      )
                    }
                  >
                    <FiPlus />
                  </Button>
                )}
              </FriendCard>
            ))}
          </Stack>
        ) : (
          <StatusText>Niemand gefunden.</StatusText>
        ))}

      {!isSearching &&
        (friends.length > 0 ? (
          <Stack as="ul" $gap="m">
            {friends.map((user) => (
              <FriendCard key={user._id} name={user.name}>
                <Button
                  $square
                  $variant="alert"
                  aria-label={`${user.name} aus meinen Mates entfernen`}
                  onClick={() =>
                    handleDeleteClick(user._id, userId, myMates, setMyMates)
                  }
                >
                  <FiX />
                </Button>
              </FriendCard>
            ))}
          </Stack>
        ) : (
          <StatusText>
            Noch keine Mates – such oben nach deinen Freund*innen.
          </StatusText>
        ))}
    </Stack>
  );
}
