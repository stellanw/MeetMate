import {
  CardTitle,
  SplitCard,
  SplitCardAside,
  SplitCardMain,
} from "@/components/ui/Card";

/* Compact card for a person: name on the left, actions on the right */
export default function FriendCard({ name, children }) {
  return (
    <SplitCard as="li" $compact>
      <SplitCardMain>
        <CardTitle as="h3" $size="m">
          {name}
        </CardTitle>
      </SplitCardMain>
      <SplitCardAside $row>{children}</SplitCardAside>
    </SplitCard>
  );
}
