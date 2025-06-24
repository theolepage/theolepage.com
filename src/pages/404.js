import React from "react";
import styled from "@emotion/styled";

import Link from "../components/link";
import Icon from "../components/icon";
import Page from "../components/page";

const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: var(--background-secondary);
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 390px;

  padding: 26px;

  background: var(--background-container);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);

  @media (max-width: 450px) {
    width: 90%;
  }
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-bottom: 20px;
`;

const Action = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const _404Page = () => {
  return (
    <Page title={"Page not found"} layout={false}>
      <Background />
      <Content>
        <Title>Page not found</Title>
        <Description>
          Oops! You’ve followed a broken link or entered a URL that doesn’t
          exist on this site.
        </Description>
        <Action to={"/"}>
          Go to homepage <Icon name="rightArrow" style={{ marginTop: 2 }} />
        </Action>
      </Content>
    </Page>
  );
};

export default _404Page;
