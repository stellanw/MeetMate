import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import styled from "styled-components";
import useAuthentication from "./api/auth/useAuthentication";
import PageLayout from "@/components/Layout/PageLayout";
import ActivityList from "@/components/ActivityList";
import { Card } from "@/components/ui/Card";
import { StatusText } from "@/components/ui/Typography";
import { categoryColor } from "@/utils/categories";
import Face from "@/Icons/Face";
import { isParticipant } from "@/utils/participation";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

const MAX_ENTRIES_PER_DAY = 3;

const CalendarPage = () => {
  const { data: activities, isLoading } = useSWR("/api/activities");
  const { authenticated, loading, session } = useAuthentication();
  const userId = session?.user?.id;
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
            <Face together={isParticipant(activity, userId)} />
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
      <ActivityList
        activities={selectedDateActivities}
        emptyText="An diesem Tag ist nichts geplant."
        label="Aktivitäten am gewählten Tag"
      />
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
    height: var(--field-height);
    margin-bottom: var(--space-s);
  }

  .react-calendar__navigation button {
    min-width: var(--field-height);
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
    height: var(--calendar-tile-height);
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

  /* scoped under .react-calendar to win over the button reset above */
  .react-calendar .react-calendar__tile--now {
    background-color: var(--color-confirm-soft);
  }

  .react-calendar .react-calendar__tile--active,
  .react-calendar .react-calendar__tile--active:enabled:hover {
    background-color: var(--color-confirm);
  }
`;

const StyledEntries = styled.span`
  position: relative;
  display: block;
  width: var(--icon-l);
  height: var(--icon-l);
`;

/* Stacked face chips, one per activity, offset like a little pile of cards.
   Smiling XX = you joined, single X = not (yet) */
const StyledEntry = styled.span`
  position: absolute;
  top: calc(${({ $index }) => $index} * var(--space-xs) * -1);
  left: calc(${({ $index }) => $index} * var(--space-xs) * -1);
  width: var(--icon-l);
  height: var(--icon-l);
  background-color: ${({ $category }) => categoryColor($category)};
  border: var(--border-thin) solid var(--color-text);
  border-radius: var(--radius-s);
`;
