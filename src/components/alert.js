import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Link from "./link";
import Icon from "./icon";

const AlertContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AlertElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing);

  padding: var(--spacing) calc(var(--spacing) * 2);

  background: var(--background-accent);
  border: 1px solid var(--color-accent);
  border-radius: var(--border-radius);
`;

const AlertAction = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
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
          <Icon
            name="alert"
            width={18}
            height={18}
            color="var(--color-accent)"
          />
          <div>
            {message}{" "}
            <AlertAction to={linkTo}>
              {linkText}
              <Icon name="rightArrow" style={{ marginTop: 2 }} />
            </AlertAction>
          </div>
        </AlertElement>
      </AlertContainer>
    </Section>
  );
};

export default Alert;
