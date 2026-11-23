import { useRouter } from "next/router";
import styled from "styled-components";
import { TbArrowBackUp } from "react-icons/tb";
import useStore from "@/store";
import Navigation from "@/components/Navigation";
import CardForm from "@/components/CardForm";
import PageHeader from "./PageHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container, Overlay } from "@/components/ui/Layout";
import { PageTitle } from "@/components/ui/Typography";

/*
 * PageLayout
 * ----------
 * Shared frame for every page: header, title, content column,
 * bottom tab bar and the "create activity" overlay.
 *
 *   title           page title (centered)
 *   back            sub pages only: href string, or true for browser back
 *   showNavigation  false hides the tab bar (login)
 */
export default function PageLayout({
  title,
  back,
  showNavigation = true,
  children,
}) {
  const router = useRouter();
  const { isCreateMode, handleCreateClick, handleCloseClick } = useStore();

  return (
    <>
      <StyledMain $withNavigation={showNavigation}>
        <PageHeader />
        {(title || back) && (
          <StyledTitleRow>
            {typeof back === "string" && (
              <ButtonLink href={back} $square aria-label="Back">
                <TbArrowBackUp />
              </ButtonLink>
            )}
            {back === true && (
              <Button onClick={() => router.back()} $square aria-label="Back">
                <TbArrowBackUp />
              </Button>
            )}
            {title && <PageTitle>{title}</PageTitle>}
          </StyledTitleRow>
        )}
        {children}
      </StyledMain>

      {showNavigation && !isCreateMode && (
        <Navigation onCreateClick={handleCreateClick} />
      )}

      {isCreateMode && (
        <Overlay>
          <CardForm
            pageTitle="Create your activity!"
            onCancel={handleCloseClick}
          />
        </Overlay>
      )}
    </>
  );
}

const StyledMain = styled(Container).attrs({ as: "main" })`
  display: flex;
  flex-direction: column;
  gap: var(--space-l);
  padding-top: var(--space-l);
  padding-bottom: ${({ $withNavigation }) =>
    $withNavigation
      ? "calc(var(--nav-height) + var(--space-xl))"
      : "var(--space-xl)"};
`;

/* Back button left, title centered – the right column keeps it centered */
const StyledTitleRow = styled.div`
  display: grid;
  grid-template-columns: var(--control-m) minmax(0, 1fr) var(--control-m);
  align-items: center;
  gap: var(--space-s);

  > ${PageTitle} {
    grid-column: 2;
  }
`;
