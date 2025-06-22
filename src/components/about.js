import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Button from "./button";

const Container = styled.div`
  display: flex;
  align-items: flex-start;

  @media (max-width: 800px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
`;

const Content = styled.div``;

const Photo = styled.img`
  width: 100px;

  margin: 0 0 0 48px;

  border-radius: 100%;

  user-select: none;
  pointer-events: none;

  @media (max-width: 800px) {
    // display: none;
    width: 90px;

    margin: 0 auto 32px auto;
  }
`;

const ResumeIcon = styled.div`
  display: inline-block;

  position: relative;
  top: 2px;

  margin: 0 8px 0 0px;

  width: 16px;
  height: 16px;

  background-color: rgb(60, 60, 60);

  mask: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbGUtdXNlciI+PHBhdGggZD0iTTE0IDJ2NGEyIDIgMCAwIDAgMiAyaDQiLz48cGF0aCBkPSJNMTUgMThhMyAzIDAgMSAwLTYgMCIvPjxwYXRoIGQ9Ik0xNSAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWN3oiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEzIiByPSIyIi8+PC9zdmc+)
    no-repeat center / contain;
`;

const AboutPage = ({ data }) => {
  const { photo, buttonText, buttonLink } = data.frontmatter;
  const { html } = data;

  return (
    <Section>
      <Container>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <Button to={buttonLink}>
            <ResumeIcon />
            {buttonText}
          </Button>
        </Content>
        <Photo src={photo} />
      </Container>
    </Section>
  );
};

export default AboutPage;
