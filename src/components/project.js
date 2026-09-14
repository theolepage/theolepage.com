import React from "react";
import styled from "@emotion/styled";

import Link from "./link";
import Icon from "./icon";

const PREVIEW_HEIGHT = "150px";

const Card = styled.div`
  overflow: hidden;

  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--background-container);

  transition:
    var(--transition-duration) box-shadow,
    var(--transition-duration) transform;

  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-2px);
  }
`;

const Preview = styled.div`
  height: ${PREVIEW_HEIGHT};
  padding: ${(props) => props.padding || 0}px;

  background: ${(props) =>
    props.hasImage ? "#fff" : "var(--background-secondary)"};
  border-bottom: ${(props) =>
    props.hasImage ? "1px solid var(--border-color)" : "none"};

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: ${(props) => (props.padding ? "contain" : "cover")};
    object-position: ${(props) => props.position || "center"};
  }
`;

const PreviewPlaceholder = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Questrial", sans-serif;
  font-size: 20px;
  text-align: center;
  color: ${(props) => props.color || "var(--color-muted-1)"};
`;

const Body = styled.div`
  padding: 18px 22px;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  font-size: var(--size-tiny);
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-muted-2);
`;

const UnderDevelopmentIconContainer = styled.div`
  position: relative;

  width: 12px;
  height: 12px;
`;

const UnderDevelopmentIcon = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 100%;
  border: 2px solid rgb(220, 220, 220);

  &:after {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    content: "";

    border-radius: 100%;
    border: 2px solid transparent;
    border-top-color: var(--color-muted-2);

    animation: spin 2s infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Description = styled.div`
  font-size: var(--size-small);
  color: var(--color-muted-1);
`;

const Project = ({ project }) => {
  const {
    name,
    description,
    image,
    imagePadding,
    imagePosition,
    url,
    target,
    color,
  } = project.frontmatter;
  const { githubStarsCount, githubForksCount, githubPushedAt } =
    project.fields || {};

  // `url` is kept for GitHub metadata (stars/forks/pushedAt) even when the
  // card should link elsewhere (e.g. a blog post) via `target`.
  const linkTo = target || url;

  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageFailed, setImageFailed] = React.useState(false);
  const showImage = image && !imageFailed && imageLoaded;

  const isUnderDevelopment =
    githubPushedAt &&
    new Date(githubPushedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const card = (
    <Card>
      <Preview
        padding={imagePadding}
        position={imagePosition}
        hasImage={showImage}
      >
        {image && !imageFailed && (
          <img
            src={image}
            alt={`${name} preview`}
            style={{ display: imageLoaded ? "block" : "none" }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
          />
        )}
        {!showImage && (
          <PreviewPlaceholder color={color}>{name}</PreviewPlaceholder>
        )}
      </Preview>

      <Body>
        <Header>
          <Title>
            {color && (
              <Pastille
                style={{
                  background: color,
                  border: `2px solid color-mix(in srgb, ${color} 75%, white)`,
                }}
              />
            )}
            {name}
          </Title>

          <IconsContainer>
            {isUnderDevelopment && (
              <UnderDevelopmentIconContainer>
                <UnderDevelopmentIcon />
              </UnderDevelopmentIconContainer>
            )}
            {githubStarsCount !== null && githubStarsCount !== undefined && (
              <IconContainer>
                <Icon name="star" width={14} height={14} />
                <span>{githubStarsCount}</span>
              </IconContainer>
            )}
            {githubForksCount !== null && githubForksCount !== undefined && (
              <IconContainer>
                <Icon name="fork" width={14} height={14} />
                <span>{githubForksCount}</span>
              </IconContainer>
            )}
          </IconsContainer>
        </Header>

        <Description>{description}</Description>
      </Body>
    </Card>
  );

  if (linkTo)
    return (
      <Link invisible to={linkTo}>
        {card}
      </Link>
    );
  return card;
};

export default Project;
