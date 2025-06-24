import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Link from "../components/link";

const button = css`
  display: inline-block;

  padding: 12px 16px;

  color: var(--color-default);

  background: var(--background-container);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);

  border: 1px solid var(--border-color);

  cursor: pointer;

  transition:
    var(--transition-duration) color,
    var(--transition-duration) background,
    var(--transition-duration) box-shadow,
    var(--transition-duration) transform;

  &:hover {
    color: var(--color-title);

    background: var(--background-secondary);
    box-shadow: var(--shadow-hover);
  }

  &:active {
    transform: scaleX(0.97) scaleY(0.95);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Button = ({ children, ...props }) => {
  return (
    <Link invisible css={button} {...props}>
      <Wrapper>{children}</Wrapper>
    </Link>
  );
};

export default Button;
