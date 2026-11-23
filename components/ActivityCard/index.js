import formatDate from "@/utils/components/ActivityCard/formatDate";
import {
  CardTitle,
  JoinBadge,
  SplitCard,
  SplitCardAside,
  SplitCardMain,
} from "@/components/ui/Card";

export default function ActivityCard({ name, date, time, joined, category }) {
  return (
    <SplitCard $category={category} $interactive>
      {joined && <JoinBadge />}
      <SplitCardMain>
        <CardTitle>{name}</CardTitle>
      </SplitCardMain>
      <SplitCardAside>
        <span>{formatDate(date)}</span>
        <span>{time}</span>
      </SplitCardAside>
    </SplitCard>
  );
}
