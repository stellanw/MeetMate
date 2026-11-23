import { useEffect, useRef } from "react";
import formatDate from "@/utils/components/ActivityCard/formatDate";
import {
  CardTitle,
  JoinBadge,
  SplitCard,
  SplitCardAside,
  SplitCardMain,
} from "@/components/ui/Card";

export default function ActivityCard({ name, date, time, joined, category }) {
  const activityNameRef = useRef(null);

  // Shrinks long activity names so they fit on one line
  useEffect(() => {
    const activityNameElement = activityNameRef.current;
    if (!activityNameElement) return;

    activityNameElement.style.fontSize = "";
    const containerWidth = activityNameElement.offsetWidth;
    const textWidth = activityNameElement.scrollWidth;

    if (textWidth > containerWidth) {
      const ratio = containerWidth / textWidth;
      const fontSize = parseFloat(
        window.getComputedStyle(activityNameElement).fontSize
      );
      activityNameElement.style.fontSize = `${fontSize * ratio}px`;
    }
  }, [name]);

  return (
    <SplitCard $category={category} $interactive>
      {joined && <JoinBadge aria-label="Dabei">XX</JoinBadge>}
      <SplitCardMain>
        <CardTitle ref={activityNameRef}>{name}</CardTitle>
      </SplitCardMain>
      <SplitCardAside>
        <span>{formatDate(date)}</span>
        <span>{time}</span>
      </SplitCardAside>
    </SplitCard>
  );
}
