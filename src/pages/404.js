import React from "react";
import styled from "@emotion/styled";

import SEO from "../components/seo";
import Link from "../components/link";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgb(250, 250, 250);
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 390px;

  padding: 26px;

  background: #fff;
  border-radius: 6px;
  border: 1px solid rgb(235, 235, 235);

  @media (max-width: 450px) {
    width: 90%;
  }
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-bottom: 20px;

  text-align: left;
`;

const Action = styled(Link)``;

const _404Page = () => {
  return (
    <Container>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <SEO title={"Page not found"} />

      <Content>
        <Title>Page not found</Title>
        <Description>
          Oops! You’ve followed a broken link or entered a URL that doesn’t
          exist on this site.
        </Description>
        <Action to={"/"}>Go to homepage →</Action>
      </Content>
    </Container>
  );
};

export default _404Page;
