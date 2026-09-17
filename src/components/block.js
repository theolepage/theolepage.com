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
    props.minimal &&
    css`
      border: none;
      border-left: 3px solid var(--border-color);
      border-radius: 0;
      background: none;
      padding: 8px 0 8px 18px;

      transition: border-color var(--transition-duration);

      &:hover {
        border-left-color: var(--color-muted-3);
      }
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

  /* On narrow screens, a wide landscape thumbnail reads better stacked
     above the text than squeezed beside it. */
  ${(props) =>
    props.landscape &&
    css`
      @media (max-width: 800px) {
        flex-direction: column;
        align-items: stretch;
      }
    `}
`;

const BlockContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Image = styled.div`
  width: 140px;
  height: 185px;

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

  @media (max-width: 800px) {
    height: 100px;
    width: 75px;
  }

  /* Wide thumbnail (e.g. blog post previews) instead of the tall
     portrait shape sized for PDF-like previews (publications). No border/
     shadow/transform of its own — the whole block (Post) already has its
     own hover animation, so this avoids a redundant, misaligned second
     lift effect confined to just the image. */
  ${(props) =>
    props.landscape &&
    css`
      width: 150px;
      height: 70px;

      border: none;
      transition: none;

      &:hover {
        box-shadow: none;
        transform: none;
      }

      @media (max-width: 800px) {
        width: 100%;
        height: 140px;
      }
    `}
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
  gap: 10px;

  color: var(--color-title);
`;

const Pastille = styled.div`
  position: relative;
  top: 1px;

  flex-shrink: 0;

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
  imageLandscape = false,
  border = true,
  minimal = false,
  headerAlignItems = "baseline",
}) => {
  const body = (
    <BlockElement hover={!!url} border={border} minimal={minimal}>
      <BlockContainer landscape={imageLandscape}>
        {image && (
          // When `url` is set, the whole block (image included) is already
          // wrapped in a Link below — nesting another one here would put an
          // <a> inside an <a>. Only wrap the image on its own otherwise
          // (e.g. Publication, where only the image links out).
          imageActionUrl && !url ? (
            <Link to={imageActionUrl} invisible>
              <Image landscape={imageLandscape}>
                <img src={image} alt={`Preview`} />
              </Image>
            </Link>
          ) : (
            <Image landscape={imageLandscape}>
              <img src={image} alt={`Preview`} />
            </Image>
          )
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
