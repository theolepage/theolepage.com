import React from "react";
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";

import Link from "../components/link";
import Icon from "../components/icon";
import SEO from "../components/seo";

const Container = styled.div`
  height: 100%;

  background-color: var(--background-primary);
`;

const Header = styled.div``;

const HeaderWrapper = styled.div`
  width: 1250px;

  margin: auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid rgba(230, 230, 230, 1);

  padding: var(--spacing) 0;

  @media (max-width: 1300px) {
    width: 950px;
  }

  @media (max-width: 1000px) {
    width: 90%;
  }
`;

const SiteTitle = styled(Link)`
  color: var(--color-title);
  font-size: var(--size-title);
  font-family: "Questrial", sans-serif;
`;

const HomepageLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;

  color: var(--color-muted-2);

  transition: color var(--transition-duration);

  font-size: var(--size-default);

  &:hover {
    color: var(--color-title);
  }
`;

const Body = styled.div``;

const BodyWrapper = styled.div`
  width: 950px;

  margin: auto;
  padding-top: 60px;

  @media (max-width: 1000px) {
    width: 90%;
  }
`;

const Footer = styled.div``;

const FooterWrapper = styled.div`
  width: 950px;

  margin: auto;
  padding: var(--spacing) 0 calc(var(--spacing) + 6px) 0;

  color: var(--color-muted-2);
  font-size: var(--size-small);

  border-top: 1px solid rgba(230, 230, 230, 1);

  @media (max-width: 1000px) {
    width: 90%;
  }
`;

const Page = ({ title, description, children, layout = true }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `);

  // Add fallback values in case siteMetadata is undefined
  const siteMetadata = data?.site?.siteMetadata || {
    title: "",
    author: "",
  };

  if (!layout) {
    return (
      <>
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <SEO title={title} description={description} />
        {children}
      </>
    );
  }

  return (
    <Container>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <SEO title={title} description={description} />
      <Header>
        <HeaderWrapper>
          <SiteTitle to="/" invisible>
            {siteMetadata.title}
          </SiteTitle>
          <HomepageLink to="/" activeStyle={{ display: "none" }} invisible>
            <Icon name="home" width={16} height={16} />
            Home
          </HomepageLink>
        </HeaderWrapper>
      </Header>
      <Body>
        <BodyWrapper>{children}</BodyWrapper>
      </Body>
      <Footer>
        <FooterWrapper>
          © {new Date().getFullYear()} {siteMetadata.author}
        </FooterWrapper>
      </Footer>
    </Container>
  );
};

export default Page;
