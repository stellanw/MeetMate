import styled from "styled-components";
import useStore from "@/store";
import Navigation from "@/components/Navigation";
import CardForm from "@/components/CardForm";
import PageHeader from "./PageHeader";
import PageTitleBar from "./PageTitleBar";
import { Container, Overlay } from "@/components/ui/Layout";

/*
 * PageLayout
 * ----------
 * Shared frame for every page: header, title, content column,
 * bottom tab bar and the "create activity" overlay.
 *
 *   title           page title (centered)
 *   back            sub pages: back arrow on the left (see PageTitleBar)
 *   close           opened views: close button on the right (see PageTitleBar)
 *   showNavigation  false hides the tab bar (login, opened views with close)
 */
export default function PageLayout({
  title,
  back,
  close,
  showNavigation = true,
  children,
}) {
  const { isCreateMode, handleCreateClick, handleCloseClick } = useStore();

  return (
    <>
      <StyledMain $withNavigation={showNavigation}>
        <PageHeader />
        {(title || back || close) && (
          <PageTitleBar title={title} back={back} close={close} />
        )}
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
