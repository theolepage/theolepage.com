import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Link from "./link";

const AlertContainer = styled.div`
  display: flex;
`;

const AlertElement = styled.div`
  margin: 0 auto;
  padding: var(--spacing) 64px;

  text-align: center;
  font-size: var(--size-small);

  background: var(--background-accent);
  border: 1px solid var(--color-accent);
  border-radius: var(--border-radius);
`;

const Alert = ({ data }) => {
  const { enabled, message, linkText, linkTo } = data.frontmatter;

  if (!enabled) {
    return null;
  }

  return (
    <Section>
      <AlertContainer>
        <AlertElement>
          {message} <Link to={linkTo}>{linkText}</Link>
        </AlertElement>
      </AlertContainer>
    </Section>
  );
};

export default Alert;
