import styled from "styled-components";
import useStore from "@/store";
import Navigation from "@/components/Navigation";
import CardForm from "@/components/CardForm";
import PageHeader from "./PageHeader";
import { Container, Overlay } from "@/components/ui/Layout";

/*
 * PageLayout
 * ----------
 * Shared frame for every page: header, title, content column,
 * bottom tab bar and the "create activity" overlay.
 *
 *   title           page title in the header (home: app name instead)
 *   close           opened views: close button (X) instead of profile/sign out
 *   showHeader      false hides the header (activity details: close sits in the card)
 *   showNavigation  false hides the tab bar (login, opened views with close)
 */
export default function PageLayout({
  title,
  close,
  showHeader = true,
  showNavigation = true,
  children,
}) {
  const { isCreateMode, handleCreateClick, handleCloseClick } = useStore();

  return (
    <>
      <StyledMain $withNavigation={showNavigation}>
        {showHeader && <PageHeader title={title} close={close} />}
        {children}
      </StyledMain>

      {showNavigation && !isCreateMode && (
        <Navigation onCreateClick={handleCreateClick} />
      )}

      {isCreateMode && (
        <Overlay>
          <CardForm
            pageTitle="Neue Aktivität"
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
