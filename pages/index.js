import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import LoginPage from "./loginpage";
import PageLayout from "@/components/Layout/PageLayout";
import Filter from "@/components/Filter/Index";
import ActivityCard from "@/components/ActivityCard";
import NextActivity from "@/components/NextActivity";
import { Button } from "@/components/ui/Button";
import { SearchField } from "@/components/ui/Form";
import { Row, Stack } from "@/components/ui/Layout";
import { StatusText } from "@/components/ui/Typography";

export default function HomePage() {
  const { data: session, status } = useSession();
  const { data: activities, isLoading: activitiesIsLoading } =
    useSWR("/api/activities");
  const { data: appUsers, isLoading: appUsersIsLoading } = useSWR("/api/users");
  const [appUserFriendsList, setAppUserFriendsList] = useState([]);
  const [weather, setWeather] = useState(null);
  const [condition, setCondition] = useState(null);
  const [city, setCity] = useState("Berlin");
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showFilterWindow, setShowFilterWindow] = useState(false);

  useEffect(() => {
    const hasDisplayedToast = sessionStorage.getItem("hasDisplayedToast");
    if (session && !hasDisplayedToast) {
      toast.success(`Angemeldet als ${session.user.email}`);
      sessionStorage.setItem("hasDisplayedToast", true);
    }

    return () => {
      if (!session) {
        sessionStorage.removeItem("hasDisplayedToast");
      }
    };
  }, [session]);

  useEffect(() => {
    async function fetchData() {
      const url = `/api/weather?city=${encodeURIComponent(city)}`;

      try {
        const response = await fetch(url);
        const result = await response.json();

        const mainTemp = result.current.temp_c;
        const condition = result.current.condition.icon;

        setWeather(mainTemp);
        setCondition(condition);
        if (appUsers && session?.user?.id) {
          const user = appUsers.find((user) => user._id === session.user.id);
          setAppUserFriendsList(user?.friends || []);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (appUsers) {
      fetchData();
    }
  }, [appUsers, session, city]);

  if (
    activitiesIsLoading ||
    status === "loading" ||
    appUsersIsLoading ||
    !appUsers
  )
    return <StatusText>Lädt …</StatusText>;

  if (!activities) return <StatusText>Daten konnten nicht geladen werden.</StatusText>;

  if (!session) {
    return <LoginPage />;
  }

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleFilter = ({ author, category }) => {
    setAuthorFilter(author);
    setCategoryFilter(category);
  };

  function getUpcomingActivities() {
    if (activitiesIsLoading || !activities) {
      return [];
    }

    let upcomingActivities = activities;

    if (authorFilter) {
      upcomingActivities = upcomingActivities.filter(
        (activity) =>
          activity.author.toLowerCase() === authorFilter.toLowerCase()
      );
    }

    if (categoryFilter) {
      upcomingActivities = upcomingActivities.filter(
        (activity) =>
          activity.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    upcomingActivities = upcomingActivities.filter((activity) => {
      const activityDate = new Date(`${activity.date}T${activity.time}`);
      const currentDate = new Date();
      return activityDate >= currentDate;
    });

    return upcomingActivities;
  }

  const filteredActivities = getUpcomingActivities();

  const displayedActivities = searchTerm
    ? filteredActivities.filter((activity) =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredActivities;

  displayedActivities.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  const toggleFilterWindow = () => {
    setShowFilterWindow(!showFilterWindow);
  };

  const friendsActivities = displayedActivities.filter((activity) =>
    appUserFriendsList?.find((user) => user === activity.authorId)
  );

  return (
    <PageLayout>
      <Stack>
        <Row $gap="m">
          <SearchField
            label="Aktivitäten suchen"
            onChange={(event) => handleSearch(event.target.value)}
          />
          <Button
            onClick={toggleFilterWindow}
            $square
            aria-label="Filter"
            aria-expanded={showFilterWindow}
          >
            <HiOutlineAdjustmentsHorizontal />
          </Button>
        </Row>
        <Filter onSubmit={handleFilter} showFilterWindow={showFilterWindow} />
      </Stack>

      <StyledWeather>
        {weather !== null && <span>{weather}°C</span>}
        {condition !== null && (
          <Image
            src={`https:${condition}`}
            width={48}
            height={48}
            alt="Aktuelles Wetter"
          />
        )}
        <span>{city}</span>
      </StyledWeather>

      <NextActivity activities={activities} />

      <Stack as="section" $gap="l" aria-label="Aktivitäten deiner Freund*innen">
        {friendsActivities.length > 0 ? (
          friendsActivities.map((activity) => (
            <Link key={activity._id} href={`/${activity._id}`}>
              <ActivityCard
                name={activity.name}
                date={activity.date}
                time={activity.time}
                joined={activity.joined}
                category={activity.category}
              />
            </Link>
          ))
        ) : (
          <StatusText>Deine Freund*innen haben noch nichts geplant.</StatusText>
        )}
      </Stack>
    </PageLayout>
  );
}

const StyledWeather = styled(Row)`
  font-family: var(--font-heading);
  font-size: var(--font-size-l);
`;
