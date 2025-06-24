import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Link from "./link";

const ContactBox = styled.p`
  padding: 32px;

  text-align: center;

  border: 1px dashed rgb(180, 180, 180);
  background: var(--background-secondary);
  border-radius: var(--border-radius);
`;

const Socials = styled.span`
  @media (max-width: 800px) {
    display: block;
  }
`;

const SocialLink = styled(Link)`
  position: relative;
  top: 4px;

  cursor: pointer;

  margin-left: 8px;
`;

const SocialIcon = styled.img`
  width: 20px;

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

const Social = ({ name, url }) => {
  return (
    <SocialLink to={url}>
      <SocialIcon
        alt={"icon-" + name}
        src={"/images/socials/icon-" + name + ".png"}
      />
    </SocialLink>
  );
};

const Contact = ({ data }) => {
  const { email, socials } = data.frontmatter;

  return (
    <Section>
      <ContactBox>
        Send me an email at <Link to={"mailto:" + email}>{email}</Link>{" "}
        <Socials>
          or reach me on
          {socials.map((s) => (
            <Social key={s.name} name={s.name} url={s.url} />
          ))}
        </Socials>
      </ContactBox>
    </Section>
  );
};

export default Contact;
