import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import useSWR from "swr";
import styled from "styled-components";
import useAuthentication from "./api/auth/useAuthentication";
import PageLayout from "@/components/Layout/PageLayout";
import ActivityCard from "@/components/ActivityCard";
import { Card } from "@/components/ui/Card";
import { Stack } from "@/components/ui/Layout";
import { StatusText } from "@/components/ui/Typography";
import { categoryColor } from "@/utils/categories";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

const MAX_ENTRIES_PER_DAY = 3;

const CalendarPage = () => {
  const { data: activities, isLoading } = useSWR("/api/activities");
  const { authenticated, loading } = useAuthentication();
  const [selectedDateActivities, setSelectedDateActivities] = useState([]);

  const getActivitiesForDate = (date) =>
    (activities ?? []).filter(
      (activity) =>
        date.toDateString() === new Date(activity.date).toDateString()
    );

  useEffect(() => {
    if (!isLoading && activities) {
      setSelectedDateActivities(getActivitiesForDate(new Date()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, activities]);

  if (isLoading || loading) return <StatusText>Lädt …</StatusText>;
  if (!activities) return <StatusText>Daten konnten nicht geladen werden.</StatusText>;
  if (!authenticated) {
    return <StatusText>Bitte melde dich an, um diese Seite zu sehen.</StatusText>;
  }

  const renderTileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const dayActivities = getActivitiesForDate(date).slice(
      0,
      MAX_ENTRIES_PER_DAY
    );
    if (dayActivities.length === 0) return null;

    return (
      <StyledEntries>
        {dayActivities.map((activity, index) => (
          <StyledEntry key={activity._id} $index={index} $category={activity.category}>
            XX
          </StyledEntry>
        ))}
      </StyledEntries>
    );
  };

  const handleDateClick = (date) => {
    setSelectedDateActivities(getActivitiesForDate(date));
  };

  return (
    <PageLayout title="Kalender">
      <StyledCalendarCard>
        <Calendar
          tileContent={renderTileContent}
          onClickDay={handleDateClick}
          locale="de-DE"
        />
      </StyledCalendarCard>
      <Stack as="section" $gap="l" aria-label="Aktivitäten am gewählten Tag">
        {selectedDateActivities.length > 0 ? (
          selectedDateActivities.map((activity) => (
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
          <StatusText>An diesem Tag ist nichts geplant.</StatusText>
        )}
      </Stack>
    </PageLayout>
  );
};

export default CalendarPage;

const StyledCalendarCard = styled(Card)`
  padding: var(--space-s);

  .react-calendar {
    width: 100%;
    font-family: var(--font-heading);
  }

  .react-calendar button {
    margin: 0;
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    box-shadow: none;
  }

  .react-calendar__navigation {
    display: flex;
    height: var(--control-m);
    margin-bottom: var(--space-s);
  }

  .react-calendar__navigation button {
    min-width: var(--control-m);
    border-radius: var(--radius-s);
  }

  .react-calendar__navigation__label {
    font-size: var(--font-size-m);
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-size: var(--font-size-xs);
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding-block: var(--space-xs);
  }

  .react-calendar__tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
    height: var(--control-l);
    padding: var(--space-xs) 0;
    font-size: var(--font-size-xs);
    border-radius: var(--radius-s);
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: var(--color-text-muted);
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__navigation button:enabled:hover {
    background-color: var(--color-confirm-soft);
  }

  .react-calendar__tile--now {
    background-color: var(--color-confirm-soft);
  }

  .react-calendar__tile--active,
  .react-calendar__tile--active:enabled:hover {
    background-color: var(--color-confirm);
    box-shadow: var(--shadow-s);
  }
`;

const StyledEntries = styled.span`
  position: relative;
  display: block;
  width: var(--icon-l);
  height: var(--icon-m);
`;

/* Stacked "XX" chips, one per activity, offset like a little pile of cards */
const StyledEntry = styled.span`
  position: absolute;
  top: calc(${({ $index }) => $index} * var(--space-xs) * -1);
  left: calc(${({ $index }) => $index} * var(--space-xs) * -1);
  padding: 0 var(--space-xs);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-tight);
  background-color: ${({ $category }) => categoryColor($category)};
  border: var(--border-thin) solid var(--color-text);
  border-radius: var(--radius-s);
  box-shadow: var(--shadow-s);
`;
