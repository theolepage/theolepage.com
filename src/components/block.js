import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Link from "./link";

const BlockElement = styled.div`
  position: relative;

  padding: 18px 22px;

  background: #fff;
  border-radius: 6px;
  border: 1px solid rgb(235, 235, 235);

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
        0.2s box-shadow,
        0.3s transform;

      &:hover {
        box-shadow:
          0px 4px 8px rgba(47, 55, 71, 0.02),
          0px 1px 3px rgba(47, 55, 71, 0.1);
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
  column-gap: 32px;
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

  border: 1px solid rgb(235, 235, 235);
  border-radius: 2px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.03);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.08);
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

  column-gap: 20px;
  row-gap: 6px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  max-width: 95%;

  color: rgb(0, 0, 0);
`;

const Info = styled.div`
  min-width: 320px;

  text-align: right;
  font-size: 14px;
  color: rgb(80, 80, 80);

  @media (max-width: 800px) {
    text-align: left;
  }
`;

const Children = styled.div`
  font-size: 14px;
  color: rgb(80, 80, 80);
`;

const Block = ({
  title,
  info,
  url,
  corner,
  children,
  image,
  border = true,
}) => {
  const body = (
    <BlockElement hover={url} border={border}>
      {corner && <Corner style={{ background: corner }} />}

      <BlockContainer>
        {image && (
          <Image>
            <img src={image} alt={`Preview`} />
          </Image>
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
