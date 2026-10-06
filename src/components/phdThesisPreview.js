import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Link from "./link";

const Container = styled.div`
  display: flex;
  gap: calc(var(--element-spacing) * 3);
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: calc(var(--element-spacing) * 2);
  }
`;

const Content = styled.div`
  flex: 1;

  p {
    line-height: 1.8;
  }
`;

// Same portrait PDF-preview treatment as Publications' thumbnails.
const Preview = styled.div`
  flex-shrink: 0;

  width: 140px;
  height: 200px;

  border: 1px solid var(--border-color);
  border-radius: 2px;
  transition:
    var(--transition-duration) box-shadow,
    var(--transition-duration) transform;

  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-2px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

`;

const PhdThesisPreview = ({ data }) => {
  const { html } = data;

  return (
    <Section title="Ph.D. Thesis" icon="bookmark">
      <Container>
        <Content dangerouslySetInnerHTML={{ __html: html }} />

        <Link to="/phd_thesis" invisible>
          <Preview>
            <img src="/images/publications/thesis.png" alt="Ph.D. thesis preview" />
          </Preview>
        </Link>
      </Container>
    </Section>
  );
};

export default PhdThesisPreview;
