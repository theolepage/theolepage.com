import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Link from "./link";

const BlockElement = styled.div`
  padding: 18px 22px;

  background: var(--background-container);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);

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

const BlockContainer = styled.div`
  display: flex;
  gap: calc(var(--element-spacing) + 10px);
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
  align-items: ${(props) => props.alignItems};

  gap: var(--element-spacing);
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  color: var(--color-title);
`;

const Pastille = styled.div`
  position: relative;
  top: 1px;

  width: 14px;
  height: 14px;

  border-radius: 100%;
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
  color,
  children,
  image,
  imageActionUrl,
  border = true,
  headerAlignItems = "baseline",
}) => {
  const body = (
    <BlockElement hover={url} border={border}>
      <BlockContainer>
        {image && (
          <Link to={imageActionUrl} invisible>
            <Image>
              <img src={image} alt={`Preview`} />
            </Image>
          </Link>
        )}

        <BlockContent>
          <Header alignItems={headerAlignItems}>
            <Title>
              {color && (
                <Pastille
                  style={{
                    background: color,
                    border: `2px solid color-mix(in srgb, ${color} 75%, white)`,
                  }}
                />
              )}
              {title}
            </Title>
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
