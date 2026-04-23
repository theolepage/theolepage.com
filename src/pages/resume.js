import React from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

import Page from "../components/page";

// Global styles
const globalStyles = css`
  body {
    background-color: rgb(254, 254, 254);
  }

  * {
    box-sizing: border-box;
  }

  .resume img {
    margin-bottom: 0;
  }
`;

// General Components
const ResumeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10mm;
  gap: 10mm;
  font-family: "Open Sans", sans-serif;

  @media (max-width: 220mm) {
    justify-content: flex-start;
    padding: 0;
  }

  @media print {
    display: block;
    padding: 0;
  }
`;

const ResumePage = styled.div`
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 10mm;

  position: relative;
  width: 210mm;
  height: 296mm;
  padding: 14mm 12mm;
  font-size: 12px;
  line-height: 1.45;
  background: #fff;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.07);

  &:last-child {
    justify-content: flex-start;
  }

  @media print {
    box-shadow: none;
  }
`;

const Section = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-family: "Questrial";
  font-size: 18px;
`;

const Item = styled.div`
  margin-top: 16px;
`;

const Subtitle = styled.div`
  font-size: 13px;
`;

const SubSubtitle = styled.div`
  font-size: 10px;
  font-weight: 600;
`;

const Text = styled.div`
  margin-top: 2px;
  text-align: justify;
  font-family: "Open Sans", sans-serif;
  font-size: 11px;

  ul {
    margin-top: 4px;
    margin-left: 12px;
    margin-bottom: 0;
  }

  li {
    margin: 1px 0;
  }
`;

const Emphasize = styled.span`
  font-weight: 600;
`;

const Deemphasize = styled.span`
  font-size: 10px;
`;

const Icon = styled.img`
  display: inline-block;
  vertical-align: baseline;
  width: 10px;
  margin-right: 4px;
`;

const Label = styled.div`
  display: inline-block;
  margin: 0 4px 0 0;
  padding: 3px 4px 4px 4px;
  font-size: 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
`;

const FloatingItem = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 16px;

  ${SubSubtitle} {
    margin-right: 8px;
  }

  /* Add margin to the first FloatingItem to create space after the title */
  &:first-of-type {
    margin-top: 16px;
  }
`;

const Cols = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Col = styled.div`
  width: 330px;
`;

const Footer = styled.div`
  display: none;

  @media print {
    display: block;
  }

  position: absolute;
  bottom: 8mm;
  text-align: center;
  color: rgb(100, 100, 100);
  font-size: 9px;
  opacity: 0.8;
`;

// Header Components
const HeaderSection = styled(Section)``;

const Name = styled.div`
  font-family: "Questrial";
  font-size: 30px;
`;

const Description = styled.div`
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.4em;
  font-family: "Questrial";
  color: rgba(0, 0, 0, 0.5);
`;

const DescriptionEmphasize = styled.span`
  color: rgba(0, 0, 0, 0.8);
`;

const DescriptionSeparator = styled.span`
  display: inline-block;

  width: 8px;
`;

const Contact = styled.div`
  display: flex;
  margin-top: 6px;
`;

const ContactItem = styled.div`
  margin-top: 6px;
  margin-right: 20px;
  font-size: 11px;

  ${Icon} {
    position: relative;
    top: 1px;
  }
`;

// Education Components
const EducationIcons = styled.div`
  display: flex;
  margin-top: 2px;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.5);

  ${Icon} {
    width: 8px;
    margin-right: 4px;
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

// Experience Components
const Experience = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const ExperienceContent = styled.div`
  width: 100%;
`;

const ExperienceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ExperienceIcons = styled.div`
  display: flex;
  margin-left: 20px;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.5);

  ${Icon} {
    width: 8px;
    margin-right: 4px;
  }
`;

const ExperienceImage = styled.div`
  width: 46px;
  margin-left: 20px;
  text-align: center;

  img {
    width: 100%;

    border-radius: 4px;
  }

  /* Special case for CNRS logo */
  img[alt="CNRS logo"] {
    width: 80%;
  }

  /* Special case for LRE logo */
  img[alt="EPITA Research Laboratory (LRE) logo"] {
    width: 80%;
  }
`;

// Publication Components
const PublicationInfo = styled.div`
  margin-top: 4px;
`;

const PublicationSeparator = styled.span`
  margin: 0 6px;

  color: rgba(0, 0, 0, 0.7);
`;

const PublicationSource = styled.span`
  color: rgba(0, 0, 0, 0.8);
`;

const PublicationAuthors = styled.span`
  color: rgba(0, 0, 0, 0.5);

  font-size: 11px;
`;

// Skills Components
const Passion = styled.div`
  display: inline-block;
  margin: 6px 16px 0 0;
  text-align: center;
  font-size: 10px;
`;

const PassionIcon = styled(Icon)`
  position: relative;
  top: 2px;
  width: 13px;
  margin-right: 6px;
`;

const ResumeHeader = () => (
  <HeaderSection>
    <Name>Theo Lepage</Name>
    <Description>
      <DescriptionEmphasize>Ph.D.</DescriptionEmphasize> in{" "}
      <DescriptionEmphasize>AI</DescriptionEmphasize> ▹{" "}
      <DescriptionEmphasize>Self-Supervised Learning</DescriptionEmphasize> for{" "}
      <DescriptionEmphasize>Speaker Recognition</DescriptionEmphasize>
      <DescriptionSeparator />|<DescriptionSeparator />
      Open to <DescriptionEmphasize>Research Scientist / Engineer</DescriptionEmphasize> Roles
    </Description>
    <Contact>
      <ContactItem>
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href="https://www.google.com/maps/place/Paris/@48.864872,2.2183041,11z/data=!4m5!3m4!1s0x47e66e1f06e2b70f:0x40b82c3688c9460!8m2!3d48.856614!4d2.3522219"
        >
          <Icon src="/images/resume/icons/icon-map_blue.svg" alt="icon-map" />
          Paris, France
        </a>
        {' '}
        <Deemphasize>(open to relocation, EU & US)</Deemphasize>
      </ContactItem>
      <ContactItem>
        <a target="_blank" rel="nofollow noopener noreferrer" href="/">
          <Icon src="/images/resume/icons/icon-website.svg" alt="icon-website" />
          theolepage.com
        </a>
      </ContactItem>
      <ContactItem>
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href="mailto:theo@theolepage.com"
        >
          <Icon src="/images/resume/icons/icon-email.svg" alt="icon-email" />
          theo@theolepage.com
        </a>
      </ContactItem>
      <ContactItem>
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href="https://www.linkedin.com/in/theolepage/"
        >
          <Icon
            src="/images/resume/icons/icon-linkedin.svg"
            alt="icon-linkedin"
          />
          Theo Lepage
        </a>
      </ContactItem>
    </Contact>
  </HeaderSection>
);

const EducationItem = ({ institution, degree, location, date, children }) => (
  <Item>
    <Subtitle>
      <Emphasize>
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href={institution.url}
        >
          {institution.name}
        </a>
      </Emphasize>
      {' '}({degree})
    </Subtitle>
    <EducationIcons>
      <Location>
        <Icon src="/images/resume/icons/icon-map.svg" alt="icon-map" />
        {location}
      </Location>
      <Date>
        <Icon
          src="/images/resume/icons/icon-calendar.svg"
          alt="icon-calendar"
        />
        {date}
      </Date>
    </EducationIcons>
    <Text>
      <ul>{children}</ul>
    </Text>
  </Item>
);

const ExperienceItem = ({
  title,
  company,
  companyUrl,
  location,
  date,
  image,
  children,
}) => (
  <Experience>
    <ExperienceContent>
      <ExperienceHeader>
        <Subtitle>
          <Emphasize>{title}</Emphasize> at{" "}
          <a
            target="_blank"
            rel="nofollow noopener noreferrer"
            href={companyUrl}
          >
            {company}
          </a>
        </Subtitle>
        <ExperienceIcons>
          <Location>
            <Icon src="/images/resume/icons/icon-map.svg" alt="icon-map" />
            {location}
          </Location>
          <Date>
            <Icon
              src="/images/resume/icons/icon-calendar.svg"
              alt="icon-calendar"
            />
            {date}
          </Date>
        </ExperienceIcons>
      </ExperienceHeader>
      <Text>
        <ul>{children}</ul>
      </Text>
    </ExperienceContent>
    <ExperienceImage>
      <img src={image} alt={`${company} logo`} />
    </ExperienceImage>
  </Experience>
);

const PublicationItem = ({ title, url, source, authors }) => (
  <Item>
    <Subtitle>
      <Emphasize>
        <Icon
          src="/images/resume/icons/icon-publication.svg"
          alt="icon-publication"
        />
        <a target="_blank" rel="nofollow noopener noreferrer" href={url}>
          {title}
        </a>
      </Emphasize>
    </Subtitle>
    <PublicationInfo>
      <PublicationSource>{source}</PublicationSource>
      <PublicationSeparator>•</PublicationSeparator>
      <PublicationAuthors dangerouslySetInnerHTML={{ __html: authors }} />
    </PublicationInfo>
  </Item>
);

const ProjectItem = ({ name, url, description }) => (
  <Item>
    <Subtitle>
      <Emphasize>
        <Icon src="/images/resume/icons/icon-project.svg" alt="icon-project" />
        <a target="_blank" rel="nofollow noopener noreferrer" href={url}>
          {name}
        </a>
      </Emphasize>
    </Subtitle>
    <Text>{description}</Text>
  </Item>
);

const SkillsSection = ({ title, items }) => (
  <FloatingItem>
    <SubSubtitle>{title}</SubSubtitle>
    {items.map((item, index) => (
      <Label key={index}>{item}</Label>
    ))}
  </FloatingItem>
);

const PassionItem = ({ icon, text }) => (
  <Passion>
    <PassionIcon src={icon} alt={`icon-${text.toLowerCase()}`} />
    {text}
  </Passion>
);

const ResumePageComponent = () => {
  return (
    <Page title="Resume" layout={false}>
      <Global styles={globalStyles} />
      <ResumeContainer className="resume">
        <ResumePage>
          <ResumeHeader />

          <Section>
            <Title>Experience</Title>

            <ExperienceItem
              title="Ph.D. Researcher"
              company="EPITA Research Laboratory (LRE)"
              companyUrl="https://www.lre.epita.fr/"
              location="Paris, France"
              date="Nov. 2022 - Feb. 2026"
              image="/images/resume/epita_v2.jpg"
            >
              <li>
                Published 8 papers at top peer-reviewed venues
                (IEEE TASLP, Speech Communication, Interspeech)
              </li>
              <li>
                Proposed novel methods for self-supervised speaker recognition → SOTA performance (1.06% EER on VoxCeleb1-O)
              </li>
              <li>
                Introduced a latent-space positive sampling strategy (SSPS) → reducing intra-speaker variability (-58% EER for SimCLR)
              </li>
              <li>
                Developed and maintained "sslsv", an open-source PyTorch toolkit for self-supervised speaker verification
              </li>
              <li>
                Teaching assistant at EPITA for "Intro to Deep Neural Networks"
                and "Python for Data Science" (2023-2025)
              </li>
              {/* <li>
                Supervised an M.Eng. student, leading to a co-authored
                publication (Interspeech 2024)
              </li> */}
            </ExperienceItem>

            <ExperienceItem
              title="Research Scientist Intern"
              company="Siemens Healthineers"
              companyUrl="https://www.siemens-healthineers.com/"
              location="Princeton, USA"
              date="Feb. 2022 - Sep. 2022"
              image="/images/resume/shs.png"
            >
              <li>
                Developed deep learning models for MR image enhancement
                (denoising and super-resolution)
              </li>
              <li>
                Designed a CNN architecture with attention mechanisms, improving reconstruction
                quality over existing solutions
              </li>
            </ExperienceItem>

            <ExperienceItem
              title="Software Developer Intern"
              company="CNRS"
              companyUrl="https://www.cnrs.fr/en"
              location="Paris, France"
              date="Sep. 2020 - Jan. 2021"
              image="/images/resume/cnrs.png"
            >
              <li>
                Contributed to a real-time digital holography software (C++/CUDA) for
                retinal blood flow analysis
              </li>
              <li>
                Achieved a 20× speedup (500 → 10,000 FPS), significantly improving image
                quality and contrast
              </li>
              <li>
                Improved software reliability through refactoring and unit testing,
                enabling open-source release
              </li>
              <li>
                Co-founded the "Digital Holography" association to sustain ongoing development
              </li>
            </ExperienceItem>
          </Section>

          <Section>
            <Title>Education</Title>

            <EducationItem
              institution={{
                name: "Sorbonne Université",
                url: "https://www.sorbonne-universite.fr/en",
              }}
              degree="Ph.D. in Artificial Intelligence"
              location="Paris, France"
              date="Nov. 2022 - Feb. 2026"
            >
              <li>
                Thesis: "Self-Supervised Learning for Speaker Recognition"
                (<a
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  href="https://theolepage.com/phd_thesis/"
                >
                  theolepage.com/phd_thesis
                </a>)
              </li>
              <li>
                Supervised by R. Dehak (LRE-EPITA) and T. Géraud (LRE-EPITA)
              </li>
            </EducationItem>

            <EducationItem
              institution={{
                name: "École Pour l'Informatique et les Techniques Avancées - EPITA",
                url: "https://www.epita.fr/en/",
              }}
              degree="M.Eng. in Computer Science"
              location="Paris, France"
              date="Sep. 2017 - Sep. 2022"
            >
              <li>
                Major: IMAGE (Machine Learning, Deep Learning, Signal
                Processing, Probability & Statistics, Linear Algebra,
                Optimization)
              </li>
              <li>
                Specialization: Research (RDI) on Speaker Recognition
                (supervised by R. Dehak) → publication at Interspeech 2022
              </li>
            </EducationItem>
          </Section>

          <Section>
            <Title>Publications</Title>

            <PublicationItem
              title="Self-Supervised Learning for Speaker Recognition: A study and review"
              url="https://arxiv.org/pdf/2602.10829"
              source="Speech Communication, 2026"
              authors="<b>Theo Lepage</b> and Reda Dehak"
            />

            <PublicationItem
              title="SSPS: Self-Supervised Positive Sampling for Robust Self-Supervised Speaker Verification"
              url="https://www.isca-archive.org/interspeech_2025/lepage25_interspeech.pdf"
              source="Interspeech, 2025"
              authors="<b>Theo Lepage</b> and Reda Dehak"
            />

            <PublicationItem
              title="Self-Supervised Frameworks for Speaker Verification via Bootstrapped Positive Sampling"
              url="https://arxiv.org/pdf/2501.17772"
              source="IEEE TASLP, 2025"
              authors="<b>Theo Lepage</b> and Reda Dehak"
            />

            <PublicationItem
              title="Exploring WavLM Back-ends for Speech Spoofing and Deepfake Detection"
              url="https://www.isca-archive.org/asvspoof_2024/stourbe24_asvspoof.pdf"
              source="ASVspoof Workshop, 2024"
              authors="Theophile Stourbe, Victor Miara, <b>Theo Lepage</b>, and Reda Dehak"
            />
          </Section>
        </ResumePage>

        <ResumePage>
          <Section>
            <PublicationItem
              title="Towards Supervised Performance on Speaker Verification with SSL by Leveraging Large-Scale ASR Models"
              url="https://www.isca-archive.org/interspeech_2024/miara24_interspeech.pdf"
              source="Interspeech, 2024"
              authors="Victor Miara, <b>Theo Lepage</b>, and Reda Dehak"
            />

            <PublicationItem
              title="Additive Margin in Contrastive Self-Supervised Frameworks to Learn Discriminative Speaker Representations"
              url="https://www.isca-archive.org/odyssey_2024/lepage24_odyssey.pdf"
              source="Odyssey Workshop, 2024"
              authors="<b>Theo Lepage</b> and Reda Dehak"
            />

            <PublicationItem
              title="Experimenting with Additive Margins for Contrastive Self-Supervised Speaker Verification"
              url="https://www.isca-archive.org/interspeech_2023/lepage23_interspeech.pdf"
              source="Interspeech, 2023"
              authors="<b>Theo Lepage</b> and Reda Dehak"
            />

            <PublicationItem
              title="Label-Efficient Self-Supervised Speaker Verification With Information Maximization and Contrastive Learning"
              url="https://www.isca-archive.org/interspeech_2022/lepage22_interspeech.pdf"
              source="Interspeech, 2022"
              authors="<b>Theo Lepage</b> and Reda Dehak"
            />
          </Section>

          <Section>
            <Title>Projects</Title>

            <Cols>
              <Col>
                <ProjectItem
                  name="sslsv"
                  url="https://github.com/theolepage/sslsv"
                  description="Deep learning toolkit based on PyTorch for training and evaluating self-supervised models for speaker verification and other speaker-related downstream tasks."
                />
              </Col>
              <Col>
                <ProjectItem
                  name="wavlm_ssl_sv"
                  url="https://github.com/theolepage/wavlm_ssl_sv"
                  description="Self-supervised iterative pseudo-labeling framework to fine-tune a speech foundation model (WavLM) from a DINO-based model for speaker verification, achieving SOTA performance."
                />
              </Col>
            </Cols>
          </Section>

          <Section>
            <Title>Skills & Interests</Title>

            <Cols>
              <Col>
                <SkillsSection
                  title="Programming"
                  items={[
                    "Python",
                    "C",
                    "C++",
                    "JavaScript",
                    "Bash",
                  ]}
                />

                <SkillsSection
                  title="Data Science"
                  items={[
                    "PyTorch",
                    "TensorFlow",
                    "Scikit-learn",
                    "NumPy",
                    "Pandas",
                  ]}
                />

                {/* <SkillsSection
                  title="Certificates"
                  items={["Driving license", "Sailing instructor diploma"]}
                /> */}
              </Col>
              <Col>
                <SkillsSection
                  title="Languages"
                  items={["English (TOEIC 905)", "French (native)"]}
                />

                <Item>
                  <SubSubtitle>Passions and interests</SubSubtitle>
                  <PassionItem
                    icon="/images/resume/icons/icon-science.svg"
                    text="Science and AI"
                  />
                  <PassionItem
                    icon="/images/resume/icons/icon-robotics.svg"
                    text="Robotics"
                  />
                  <PassionItem
                    icon="/images/resume/icons/icon-wave.svg"
                    text="Sailing & windsurfing"
                  />
                </Item>
              </Col>
            </Cols>
          </Section>

          <Footer>
            An up-to-date version of this document is available at{" "}
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href="https://theolepage.com/resume"
            >
              theolepage.com/resume
            </a>
            .
          </Footer>
        </ResumePage>
      </ResumeContainer>
    </Page>
  );
};

export default ResumePageComponent;
