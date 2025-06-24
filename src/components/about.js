import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Button from "./button";
import Icon from "./icon";
import Link from "./link";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: calc(var(--element-spacing) * 3);

  @media (max-width: 800px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
`;

const Content = styled.div`
  p {
    margin-bottom: 0;
  }
`;

const Photo = styled.img`
  width: 100px;

  margin-bottom: 0;

  border-radius: 100%;

  pointer-events: none;

  @media (max-width: 800px) {
    width: 90px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(var(--element-spacing) * 2);

  margin-top: 100px;

  padding: 32px;

  text-align: center;

  border: 1px solid var(--border-color);
  background: var(--background-secondary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);

  @media (max-width: 600px) {
    flex-direction: column;
    gap: calc(var(--element-spacing) * 1.5);
  }
`;

const ActionSeparator = styled.div`
  width: 1px;
  height: 24px;
  background-color: var(--border-color);
  transform: rotate(20deg);

  @media (max-width: 600px) {
    display: none;
  }
`;

const Contact = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  margin-top: 30px;

  color: var(--color-muted-1);

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const SocialLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialIcon = styled.img`
  width: 20px;

  margin-bottom: 0;

  filter: grayscale(100%);
  opacity: 0.5;

  transition: all var(--transition-duration);

  &[src*="github"] {
    opacity: 0.3;
  }

  &:hover {
    filter: grayscale(0%);
    opacity: 1;
  }
`;

const AboutPage = ({ data }) => {
  const { photo, email, socials } = data.frontmatter;
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
        <Content dangerouslySetInnerHTML={{ __html: html }} />
        <Photo src={photo} ref={photoRef} />
      </Container>

      <Actions>
        <Button to="/resume">
          <Icon name="resume" />
          Read my resume
        </Button>
        <ActionSeparator />
        <Button to={"mailto:" + email}>
          <Icon name="email" />
          Send me an email
        </Button>
      </Actions>

      <Contact>
        <span>Alternatively, you can explore my profiles on:</span>
        <Socials>
          {socials.map((s) => (
            <SocialLink to={s.url} key={s.name}>
              <SocialIcon
                alt={"icon-" + s.name}
                src={"/images/socials/icon-" + s.name + ".png"}
              />
            </SocialLink>
          ))}
        </Socials>
      </Contact>
    </Section>
  );
};

export default AboutPage;
