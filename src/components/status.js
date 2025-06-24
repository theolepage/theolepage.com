import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Link from "./link";
import Icon from "./icon";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Element = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--element-spacing);

  padding: var(--element-spacing) calc(var(--element-spacing) * 2);

  background: var(--background-accent);
  border: 1px solid var(--color-accent);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
`;

const Action = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const Status = ({ data }) => {
  const { enabled, message, linkText, linkTo } = data.frontmatter;

  if (!enabled) {
    return null;
  }

  return (
    <Section>
      <Container>
        <Element>
          <Icon
            name="alert"
            width={18}
            height={18}
            color="var(--color-accent)"
          />
          <div>
            {message}{" "}
            <Action to={linkTo}>
              {linkText}
              <Icon name="rightArrow" style={{ marginTop: 2 }} />
            </Action>
          </div>
        </Element>
      </Container>
    </Section>
  );
};

export default Status;
