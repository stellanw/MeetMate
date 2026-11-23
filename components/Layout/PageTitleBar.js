import { useRouter } from "next/router";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { TbArrowBackUp } from "react-icons/tb";
import { Button, ButtonLink } from "@/components/ui/Button";
import { PageTitle } from "@/components/ui/Typography";

/*
 * PageTitleBar
 * ------------
 * Title centered, optional actions on fixed positions:
 *   back   left  ← sub pages (friend list)
 *   close  right ✕ things you open and close (activity details, forms)
 *
 * back/close accept an href, a function, or true (= browser back).
 */
export default function PageTitleBar({ title, back, close }) {
  return (
    <StyledTitleBar>
      <StyledSlot>
        {back && <TitleAction action={back} label="Zurück" icon={<TbArrowBackUp />} />}
      </StyledSlot>
      {title && <PageTitle>{title}</PageTitle>}
      <StyledSlot>
        {close && <TitleAction action={close} label="Schließen" icon={<FiX />} />}
      </StyledSlot>
    </StyledTitleBar>
  );
}

function TitleAction({ action, label, icon }) {
  const router = useRouter();

  if (typeof action === "string") {
    return (
      <ButtonLink href={action} $square aria-label={label}>
        {icon}
      </ButtonLink>
    );
  }

  const handleClick = typeof action === "function" ? action : () => router.back();

  return (
    <Button onClick={handleClick} $square aria-label={label}>
      {icon}
    </Button>
  );
}

/* Equal side columns keep the title centered */
const StyledTitleBar = styled.div`
  display: grid;
  grid-template-columns: var(--control-m) minmax(0, 1fr) var(--control-m);
  align-items: center;
  gap: var(--space-s);
`;

const StyledSlot = styled.div`
  display: flex;
`;
