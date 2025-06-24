import React, { useRef, useEffect } from "react";
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

  width: var(--icon-size);
  height: var(--icon-size);

  background-color: var(--color-default);

  mask: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbGUtdXNlciI+PHBhdGggZD0iTTE0IDJ2NGEyIDIgMCAwIDAgMiAyaDQiLz48cGF0aCBkPSJNMTUgMThhMyAzIDAgMSAwLTYgMCIvPjxwYXRoIGQ9Ik0xNSAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWN3oiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEzIiByPSIyIi8+PC9zdmc+)
    no-repeat center / contain;
`;

const AboutPage = ({ data }) => {
  const { photo, buttonText, buttonLink } = data.frontmatter;
  const { html } = data;

  const photoRef = useRef(null);
  const keyBuffer = useRef("");

  // Easter egg
  useEffect(() => {
    const handleKeyDown = (e) => {
      keyBuffer.current += e.key.toLowerCase();
      if (keyBuffer.current.length > 4) {
        keyBuffer.current = keyBuffer.current.slice(-4);
      }
      if (keyBuffer.current === "theo") {
        if (photoRef.current && photoRef.current.style.transition === "") {
          photoRef.current.style.transition =
            "transform 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
          photoRef.current.style.transform = "rotate(360deg)";
          setTimeout(() => {
            if (photoRef.current) {
              photoRef.current.style.transition = "";
              photoRef.current.style.transform = "";
            }
          }, 1500);
        }
        keyBuffer.current = "";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
        <Photo src={photo} ref={photoRef} />
      </Container>
    </Section>
  );
};

export default AboutPage;
