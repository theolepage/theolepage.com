import React from "react";
import styled from "@emotion/styled";

import Link from "../components/link";

import SEO from "../components/seo";

const Container = styled.div``;

const Header = styled.div``;

const HeaderWrapper = styled.div`
  width: 1250px;

  margin: auto;

  display: flex;
  justify-content: space-between;
  align-items: baseline;

  border-bottom: 1px solid rgba(230, 230, 230, 1);

  padding: 16px 0;

  @media (max-width: 1300px) {
    width: 950px;
  }

  @media (max-width: 1000px) {
    width: 90%;
  }
`;

const SiteTitle = styled(Link)`
  font-size: 22px;
  font-family: "Questrial", sans-serif;
`;

const HomepageLink = styled(Link)`
  color: rgb(120, 120, 120);

  transition: color 0.3s;

  &:hover {
    color: rgb(0, 0, 0);
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
  padding: 16px 0 26px 0;

  color: rgb(120, 120, 120);
  font-size: 15px;

  border-top: 1px solid rgba(230, 230, 230, 1);

  @media (max-width: 1000px) {
    width: 90%;
  }
`;

const Page = ({ title, description, children, layout = true }) => {
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
            Theo Lepage
          </SiteTitle>
          <HomepageLink to="/" activeStyle={{ display: "none" }} invisible>
            About
          </HomepageLink>
        </HeaderWrapper>
      </Header>
      <Body>
        <BodyWrapper>{children}</BodyWrapper>
      </Body>
      <Footer>
        <FooterWrapper>© {new Date().getFullYear()} Theo Lepage</FooterWrapper>
      </Footer>
    </Container>
  );
};

export default Page;
