import styled from "styled-components";
import useStore from "@/store";
import Navigation from "@/components/Navigation";
import CardForm from "@/components/CardForm";
import PageHeader from "./PageHeader";
import { Container, Overlay } from "@/components/ui/Layout";
import { PageTitle } from "@/components/ui/Typography";

/*
 * PageLayout
 * ----------
 * Shared frame for every page: header, optional title, content column,
 * bottom navigation and the "create activity" overlay.
 */
export default function PageLayout({
  title,
  headerActions,
  showNavigation = true,
  children,
}) {
  const { isCreateMode, handleCreateClick, handleCloseClick } = useStore();

  return (
    <>
      <StyledMain $withNavigation={showNavigation}>
        <PageHeader actions={headerActions} />
        {title && <PageTitle>{title}</PageTitle>}
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
