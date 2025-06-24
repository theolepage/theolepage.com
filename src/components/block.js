import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Link from "./link";

const BlockElement = styled.div`
  position: relative;

  padding: 18px 22px;

  background: var(--background-container);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);

  overflow: hidden;

  ${(props) =>
    !props.border &&
    css`
      border: none;
      padding: 0;
    `}

  ${(props) =>
    props.hover &&
    css`
      transition:
        var(--transition-duration) box-shadow,
        var(--transition-duration) transform;

      &:hover {
        box-shadow: var(--shadow-hover);
        transform: translateY(-2px);
      }
    `}
`;

const Corner = styled.div`
  position: absolute;
  top: -28px;
  left: -28px;

  width: 48px;
  height: 48px;

  border-radius: 100%;
`;

const BlockContainer = styled.div`
  display: flex;
  gap: calc(var(--spacing) + 10px);
  align-items: center;
  height: 100%;
`;

const BlockContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Image = styled.div`
  width: 150px;
  height: 200px;

  margin: 8px;

  border: 1px solid var(--border-color);
  border-radius: 2px;
  transition:
    var(--transition-duration) box-shadow,
    var(--transition-duration) transform;

  &:hover {
    box-shadow: var(--shadow-hover);
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 800px) {
    height: 100px;
    width: 75px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  gap: var(--spacing);
`;

const Title = styled.div`
  color: var(--color-title);
`;

const Info = styled.div`
  flex-shrink: 0;

  text-align: right;
  font-size: var(--size-small);
  color: var(--color-muted-1);

  @media (max-width: 800px) {
    text-align: left;
  }
`;

const Children = styled.div`
  font-size: var(--size-small);
  color: var(--color-muted-1);
`;

const Block = ({
  title,
  info,
  url,
  corner,
  children,
  image,
  imageActionUrl,
  border = true,
}) => {
  const body = (
    <BlockElement hover={url} border={border}>
      {corner && <Corner style={{ background: corner }} />}

      <BlockContainer>
        {image && (
          <Link to={imageActionUrl} invisible>
            <Image>
              <img src={image} alt={`Preview`} />
            </Image>
          </Link>
        )}

        <BlockContent>
          <Header>
            <Title>{title}</Title>
            {info && <Info>{info}</Info>}
          </Header>

          {children && <Children>{children}</Children>}
        </BlockContent>
      </BlockContainer>
    </BlockElement>
  );

  if (url)
    return (
      <Link invisible to={url}>
        {body}
      </Link>
    );
  return body;
};

export default Block;
