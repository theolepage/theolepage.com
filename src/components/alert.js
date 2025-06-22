import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Link from "./link";

const AlertContainer = styled.div`
  display: flex;
`;

const AlertElement = styled.div`
  margin: 0 auto;
  padding: 16px 64px;

  color: rgb(60, 60, 60);
  line-height: 1.75;
  text-align: center;
  font-size: 14px;

  background: #f2f7ff;
  border: 1px solid rgb(135, 177, 255);
  border-radius: 6px;
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
