import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Button from "./button";
import Icon from "./icon";

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

  pointer-events: none;

  @media (max-width: 800px) {
    width: 90px;

    margin: 0 auto 32px auto;
  }
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
            <Icon name="resume" />
            {buttonText}
          </Button>
        </Content>
        <Photo src={photo} ref={photoRef} />
      </Container>
    </Section>
  );
};

export default AboutPage;
