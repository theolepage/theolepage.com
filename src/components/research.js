import React from "react";
import styled from "@emotion/styled";

import Section from "./section";

const Content = styled.div`
  p {
    line-height: 1.8;
  }
`;

const Research = ({ data }) => {
  const { html } = data;

  return (
    <Section title="Research">
      <Content dangerouslySetInnerHTML={{ __html: html }} />
    </Section>
  );
};

export default Research;
