import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

import Page from "../components/page";
import LucideIcon from "../components/icon";

const RESUME_FILENAME = "Theo_Lepage_Resume.pdf";

// Global styles
const globalStyles = css`
  body {
    margin: 0;
    background-color: rgb(252, 252, 252);
  }

  * {
    font-variant-ligatures: none;
    font-feature-settings: "liga" 0, "clig" 0;

    box-sizing: border-box;
  }

  .resume img {
    margin-bottom: 0;
  }

  @page {
    margin: 0;
    size: A4;
  }
`;

// General Components
const HEADER_HEIGHT = "52px";

const Header = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: ${HEADER_HEIGHT};

  padding: 0 24px;

  // background: #fff;
  // border-bottom: 1px solid var(--border-color);
  // box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.07);

  font-family: "Open Sans", sans-serif;
  font-size: 13px;
  color: var(--color-default);

  @media print {
    display: none;
  }
`;

const HeaderTitle = styled.h1`
  margin: 0;

  font-size: 16px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const DevFitToggle = styled.label`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: inline-flex;
  align-items: center;
  gap: 6px;

  cursor: pointer;
`;

const downloadBarActionStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  border: 0;
  background: none;
  padding: 0;
  font: inherit;
  cursor: pointer;

  color: var(--color-default);
  text-decoration: none;

  transition: var(--transition-duration) color;

  &:hover {
    color: var(--color-title);
    text-decoration: none;
  }
`;

const DownloadLink = styled.a`
  ${downloadBarActionStyle}
`;

const PrintButton = styled.button`
  ${downloadBarActionStyle}
`;

const ResumeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;

  font-family: "Open Sans", sans-serif;

  @media print {
    display: block;
    margin-top: 0;
    overflow-x: visible;
  }
`;

const ResumeViewport = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT});
  overflow: hidden;

  ${(props) =>
    props.disableFit &&
    css`
      height: auto;
      overflow: visible;
    `}

  @media print {
    height: auto;
    overflow: visible;
  }
`;

const ResumePagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10mm;
  padding: 4mm 0 16mm 0;

  /*
   * A scroll container drops its own end-side (right/bottom) padding from
   * the scrollable area, so the padding lives on this overflowing child
   * instead (width: max-content keeps its box exactly content-sized).
   */
  width: max-content;

  transform-origin: top center;

  @media print {
    display: block;
    padding: 0;
    transform: none !important;
  }
`;

const ResumePage = styled.div`
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 8mm;

  position: relative;
  width: 210mm;
  height: 296mm;
  padding: 12mm 12mm;
  font-size: 12px;
  line-height: 1.45;
  background: #fff;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.07);

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
  margin-top: 12px;
`;

const Subtitle = styled.div`
  font-size: 13px;
`;

const SubSubtitle = styled.div`
  flex-shrink: 0;
  width: 100px;

  font-size: 10px;
  font-weight: 600;
`;

/* Narrower than SubSubtitle: "Skills" is alone in its column (no other
   label to align with there), so it doesn't need the 100px reserved for
   longer labels like "Academic Service" in the other column. */
const SkillsLabel = styled(SubSubtitle)`
  width: 40px;
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

const TitleIcon = styled(LucideIcon)`
  position: relative;
  top: 1px;
  margin-right: 4px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleNote = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.5);

  ${Icon} {
    position: relative;
    top: 1px;
  }
`;

const Label = styled.div`
  display: inline-block;
  margin: 0;
  padding: 4px;
  font-size: 8px;
  line-height: 1;
  border: 1px solid var(--border-color);
  border-radius: 4px;
`;

const MiscRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 10px;
  min-height: 18px;
`;

const MiscContent = styled.div`
  flex: 1;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 3px 8px;

  font-family: "Open Sans", sans-serif;
  font-size: 11px;
`;

const MiscInterest = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const SkillGroups = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SkillGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 3px 6px;
`;

const SkillGroupLabel = styled.span`
  font-size: 9px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
`;

const Cols = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 42px;
`;

const Col = styled.div`
  flex: 1;
`;

const Footer = styled.div`
  display: none;

  @media print {
    display: block;
  }

  position: absolute;
  bottom: 5mm;
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
  margin-top: 4px;
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

  width: 17px;

  text-align: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
`;

const Contact = styled.div`
  display: flex;
  margin-top: 2px;
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

const ContactIcon = styled(LucideIcon)`
  position: relative;
  top: 1px;
  margin-right: 4px;
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

const Grade = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const MetaIcon = styled(LucideIcon)`
  margin-right: 4px;
`;

// Experience Components
const Experience = styled.div`
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

// Publication Components
const PublicationHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

const PublicationInfo = styled.div`
  flex-shrink: 0;
  white-space: nowrap;
`;

const PublicationSeparator = styled.span`
  margin: 0 4px;

  color: rgba(0, 0, 0, 0.5);
  font-size: 10px;
`;

const PublicationSource = styled.span`
  color: rgba(0, 0, 0, 0.8);
  font-size: 11px;
`;

const PublicationYear = styled.span`
  color: rgba(0, 0, 0, 0.8);
  font-size: 11px;
`;

const ResumeHeader = () => (
  <HeaderSection>
    <Name>Theo Lepage</Name>
    <Description>
      <DescriptionEmphasize>???</DescriptionEmphasize> <DescriptionEmphasize>(???)</DescriptionEmphasize> @ <DescriptionEmphasize>???</DescriptionEmphasize>
      <DescriptionSeparator>•</DescriptionSeparator>
      <DescriptionEmphasize>Speech</DescriptionEmphasize> & <DescriptionEmphasize>Speaker Recognition</DescriptionEmphasize>
      <DescriptionSeparator>•</DescriptionSeparator>
      <DescriptionEmphasize>Ph.D.</DescriptionEmphasize> in{" "}
      <DescriptionEmphasize>AI</DescriptionEmphasize>
    </Description>
    <Contact>
      <ContactItem>
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href="https://www.google.com/maps/place/Paris/@48.864872,2.2183041,11z/data=!4m5!3m4!1s0x47e66e1f06e2b70f:0x40b82c3688c9460!8m2!3d48.856614!4d2.3522219"
        >
          <ContactIcon name="location" width={10} height={10} color="#377dff" />
          Paris, France
        </a>
        {' '}
        <Deemphasize>(open to relocation EU/US)</Deemphasize>
      </ContactItem>
      <ContactItem>
        <a target="_blank" rel="nofollow noopener noreferrer" href="/">
          <ContactIcon name="website" width={10} height={10} color="#377dff" />
          theolepage.com
        </a>
      </ContactItem>
      <ContactItem>
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href="mailto:contact@theolepage.com"
        >
          <ContactIcon name="email" width={10} height={10} color="#377dff" />
          contact@theolepage.com
        </a>
      </ContactItem>
      <ContactItem>
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href="https://www.linkedin.com/in/theolepage/"
        >
          <Icon src="/images/socials/icon-linkedin_blue.svg" alt="icon-linkedin" />
          Theo Lepage
        </a>
      </ContactItem>
      <ContactItem>
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href="https://github.com/theolepage/"
        >
          <Icon src="/images/socials/icon-github_blue.svg" alt="icon-github" />
          theolepage
        </a>
      </ContactItem>
    </Contact>
  </HeaderSection>
);

const EducationItem = ({
  institution,
  degree,
  location,
  date,
  grade,
  children,
}) => (
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
        <MetaIcon
          name="location"
          width={8}
          height={8}
          color="rgba(0, 0, 0, 0.5)"
        />
        {location}
      </Location>
      <Date>
        <MetaIcon
          name="calendar"
          width={8}
          height={8}
          color="rgba(0, 0, 0, 0.5)"
        />
        {date}
      </Date>
      {grade && (
        <Grade>
          <MetaIcon
            name="award"
            width={8}
            height={8}
            color="rgba(0, 0, 0, 0.5)"
          />
          {grade}
        </Grade>
      )}
    </EducationIcons>
    <Text>
      {children}
    </Text>
  </Item>
);

const ExperienceItem = ({
  title,
  company,
  companyUrl,
  location,
  date,
  internship,
  children,
}) => (
  <Experience>
    <ExperienceContent>
      <ExperienceHeader>
        <Subtitle>
          <Emphasize>{title}</Emphasize> {internship && '(Internship)'} at{" "}
          <Emphasize>
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href={companyUrl}
            >
              {company}
            </a>
          </Emphasize>
        </Subtitle>
        <ExperienceIcons>
          <Location>
            <MetaIcon
              name="location"
              width={8}
              height={8}
              color="rgba(0, 0, 0, 0.5)"
            />
            {location}
          </Location>
          <Date>
            <MetaIcon
              name="calendar"
              width={8}
              height={8}
              color="rgba(0, 0, 0, 0.5)"
            />
            {date}
          </Date>
        </ExperienceIcons>
      </ExperienceHeader>
      <Text>
        {children}
      </Text>
    </ExperienceContent>
  </Experience>
);

const PublicationItem = ({ title, url, source, year }) => (
  <Item>
    <PublicationHeader>
      <Subtitle>
        <Emphasize>
          <TitleIcon name="publication" width={10} height={10} color="#4e4e4e" />
          <a target="_blank" rel="nofollow noopener noreferrer" href={url}>
            {title}
          </a>
        </Emphasize>
      </Subtitle>
      <PublicationInfo>
        <PublicationSource>{source}</PublicationSource>
        <PublicationSeparator>•</PublicationSeparator>
        <PublicationYear>{year}</PublicationYear>
      </PublicationInfo>
    </PublicationHeader>
  </Item>
);

const ProjectItem = ({ name, url, description, icon }) => (
  <Item>
    <Subtitle>
      <Emphasize>
        <TitleIcon name={icon} width={10} height={10} color="#4e4e4e" />
        <a target="_blank" rel="nofollow noopener noreferrer" href={url}>
          {name}
        </a>
      </Emphasize>
    </Subtitle>
    <Text>{description}</Text>
  </Item>
);

// Keeps a visual gutter around the shrunk resume on narrow viewports, since
// a transform-scaled child doesn't respect its parent's padding on its own.
const VIEWPORT_HORIZONTAL_MARGIN = 24;

const isDev = process.env.NODE_ENV === "development";

const ResumePageComponent = () => {
  const viewportRef = useRef(null);
  const pagesRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [disableFit, setDisableFit] = useState(false);

  useLayoutEffect(() => {
    if (disableFit) {
      setScale(1);
      return;
    }

    const updateScale = () => {
      const viewport = viewportRef.current;
      const pages = pagesRef.current;
      if (!viewport || !pages) return;

      const nextScale = Math.min(
        (viewport.clientWidth - VIEWPORT_HORIZONTAL_MARGIN * 2) / pages.offsetWidth,
        viewport.clientHeight / pages.offsetHeight,
        1
      );

      setScale(nextScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [disableFit]);

  return (
    <Page title="Resume" layout={false}>
      <Global styles={globalStyles} />
      <Header>
        <HeaderTitle>
          Resume
        </HeaderTitle>
        {isDev && (
          <DevFitToggle>
            <input
              type="checkbox"
              checked={disableFit}
              onChange={(e) => setDisableFit(e.target.checked)}
            />
            Disable fit to screen
          </DevFitToggle>
        )}
        <HeaderActions>
          <DownloadLink href="/resume.pdf" download={RESUME_FILENAME}>
            <LucideIcon name="download" width={14} height={14} />
            Download (.pdf)
          </DownloadLink>
          {/* <PrintButton onClick={() => window.print()}>
            <LucideIcon name="print" width={14} height={14} />
            Print
          </PrintButton> */}
        </HeaderActions>
      </Header>
      <ResumeContainer className="resume">
        <ResumeViewport ref={viewportRef} disableFit={disableFit}>
        <ResumePagesWrapper ref={pagesRef} style={{ transform: `scale(${scale})` }}>
          <ResumePage>
            <ResumeHeader />

            <Section>
              <Title>Experience</Title>

              <ExperienceItem
                title="???"
                company="???"
                companyUrl="https://theolepage.com"
                location="Paris, France"
                date="Oct. 2026 - Present"
              >
                ...
              </ExperienceItem>

              <ExperienceItem
                title="Research Scientist"
                company="Siemens Healthineers"
                companyUrl="https://www.siemens-healthineers.com/"
                location="Princeton, USA"
                date="Feb. 2022 - Sep. 2022"
                internship
              >
                Developed deep learning models (CNN with self-attention) for end-to-end MR image enhancement (denoising & super-resolution)
              </ExperienceItem>

              <ExperienceItem
                title="Software Engineer"
                company="CNRS"
                companyUrl="https://www.cnrs.fr/en"
                location="Paris, France"
                date="Sep. 2020 - Jan. 2021"
                internship
              >
                Contributed to Holovibes, real-time digital holography software for retinal blood flow analysis → 20× input throughput (10,000 FPS)
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
                Thesis: <a target="_blank" rel="nofollow noopener noreferrer" href="https://theolepage.com/phd_thesis/">Self-Supervised Learning for Speaker Recognition</a> • Supervised by Reda Dehak @ LRE-EPITA • Proposed self-supervised methods for speaker verification • Published 8 papers at top venues (Interspeech, IEEE TASLP, Speech Communication)
              </EducationItem>

              <EducationItem
                institution={{
                  name: "École Pour l'Informatique et les Techniques Avancées - EPITA",
                  url: "https://www.epita.fr/en/",
                }}
                degree="M.Eng. in Computer Science"
                location="Paris, France"
                date="Sep. 2017 - Sep. 2022"
                grade="GPA: 3.9/4.0"
              >
                Major: AI/ML for Computer Vision • Research student • Teaching assistant (C & Unix) • Exchange semester at CSUMB
              </EducationItem>
            </Section>

            <Section>
              <TitleRow>
                <Title>Publications</Title>
                <TitleNote>
                  Selected first-author articles •
                  Full list on{" "}
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href="https://scholar.google.com/citations?user=q1MqhVgAAAAJ"
                  >
                    <Icon
                      src="/images/socials/icon-scholar.png"
                      alt="icon-scholar"
                      style={{marginLeft: 2}}
                    />
                    Google Scholar
                  </a>
                </TitleNote>
              </TitleRow>

              <PublicationItem
                title="Self-Supervised Learning for Speaker Recognition: A study and review"
                url="https://arxiv.org/pdf/2602.10829"
                source="Speech Comm."
                year="2026"
              />

              <PublicationItem
                title="SSPS: Self-Supervised Positive Sampling for Robust Self-Supervised Speaker Verification"
                url="https://www.isca-archive.org/interspeech_2025/lepage25_interspeech.pdf"
                source="Interspeech"
                year="2025"
              />

              <PublicationItem
                title="Self-Supervised Frameworks for Speaker Verification via Bootstrapped Positive Sampling"
                url="https://arxiv.org/pdf/2501.17772"
                source="IEEE TASLP"
                year="2025"
              />
            </Section>

            <Section>
              <Title>Projects</Title>

              <Cols>
                <Col>
                  <ProjectItem
                    name="speakerscope.ai"
                    url="https://speakerscope.ai/"
                    icon="app"
                    description="Speaker diarization with identity and language insights, via browser or API, powered by SOTA AI speech models."
                  />
                </Col>
                <Col>
                  <ProjectItem
                    name="sslsv"
                    url="https://github.com/theolepage/sslsv"
                    icon="package"
                    description="Deep learning toolkit based on PyTorch for training & evaluating self-supervised models for speaker verification."
                  />
                </Col>
                <Col>
                  <ProjectItem
                    name="wavlm_ssl_sv"
                    url="https://github.com/theolepage/wavlm_ssl_sv"
                    icon="package"
                    description="Self-supervised framework to fine-tune WavLM for speaker verification, without labels, achieving SOTA on VoxCeleb."
                  />
                </Col>
              </Cols>
            </Section>

            <Section>
              <Title>Miscellaneous</Title>

              <Cols>
                <Col>
                  <MiscRow>
                    <SkillsLabel>Skills</SkillsLabel>
                    <SkillGroups>
                      <SkillGroup>
                        <SkillGroupLabel>AI/ML:</SkillGroupLabel>
                        <Label>PyTorch</Label>
                        <Label>TensorFlow</Label>
                        <Label>Scikit-learn</Label>
                        <Label>NumPy</Label>
                        <Label>Pandas</Label>
                      </SkillGroup>

                      <SkillGroup>
                        <SkillGroupLabel>Programming:</SkillGroupLabel>
                        <Label>Python</Label>
                        <Label>C</Label>
                        <Label>C++</Label>
                        <Label>CUDA</Label>
                        <Label>JavaScript</Label>
                        <Label>Bash</Label>
                      </SkillGroup>

                      <SkillGroup>
                        <SkillGroupLabel>Tools:</SkillGroupLabel>
                        <Label>Git</Label>
                        <Label>LaTex</Label>
                        <Label>Docker</Label>
                        <Label>Slurm</Label>
                        <Label>SQL</Label>
                      </SkillGroup>

                      <SkillGroup>
                        <SkillGroupLabel>Languages:</SkillGroupLabel>
                        <Label>English (fluent)</Label>
                        <Label>French (native)</Label>
                      </SkillGroup>
                    </SkillGroups>
                  </MiscRow>
                </Col>

                <Col>
                  <MiscRow>
                    <SubSubtitle>Teaching</SubSubtitle>
                    <MiscContent>
                      Introduction to Deep Neural Networks<br />
                      Python for Data Science
                      <Deemphasize>(2023 - 2025 @ EPITA)</Deemphasize>
                    </MiscContent>
                  </MiscRow>

                  <MiscRow>
                    <SubSubtitle>Awards</SubSubtitle>
                    <MiscContent>3rd place @ ASVspoof 5 (Track 1)</MiscContent>
                  </MiscRow>

                  <MiscRow>
                    <SubSubtitle>Academic Service</SubSubtitle>
                    <MiscContent>Reviewer for Interspeech</MiscContent>
                  </MiscRow>
                </Col>
              </Cols>

              {/*
              <MiscRow>
                <SubSubtitle>Interests</SubSubtitle>
                <MiscContent>
                  <MiscInterest>
                    <LucideIcon
                      name="science"
                      width={12}
                      height={12}
                      color="#70ba59"
                    />
                    Science
                  </MiscInterest>
                  <MiscInterest>
                    <LucideIcon
                      name="robotics"
                      width={12}
                      height={12}
                      color="#f0655b"
                    />
                    Robotics
                  </MiscInterest>
                  <MiscInterest>
                    <LucideIcon
                      name="sailing"
                      width={12}
                      height={12}
                      color="#377dff"
                    />
                    Sailing
                  </MiscInterest>
                </MiscContent>
              </MiscRow>
              */}
            </Section>

            <Footer>
              Up-to-date document at{" "}
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
        </ResumePagesWrapper>
        </ResumeViewport>
      </ResumeContainer>
    </Page>
  );
};

export default ResumePageComponent;
