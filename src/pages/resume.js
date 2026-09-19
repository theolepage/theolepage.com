import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { graphql } from "gatsby";

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

  p {
    margin: 0;
  }

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

// Renders **bold** parts of a description segment as emphasized text.
const renderEmphasis = (text) =>
  text
    .split(/\*\*(.+?)\*\*/)
    .map((part, i) =>
      i % 2 === 1 ? (
        <DescriptionEmphasize key={i}>{part}</DescriptionEmphasize>
      ) : (
        part
      )
    );

const ResumeHeader = ({ name, description = "", contact = [] }) => (
  <HeaderSection>
    <Name>{name}</Name>
    <Description>
      {description.split(" • ").map((segment, i) => (
        <React.Fragment key={segment}>
          {i > 0 && <DescriptionSeparator>•</DescriptionSeparator>}
          {renderEmphasis(segment)}
        </React.Fragment>
      ))}
    </Description>
    <Contact>
      {contact.map(({ icon, image, text, url, note }) => (
        <ContactItem key={url}>
          <a target="_blank" rel="nofollow noopener noreferrer" href={url}>
            {icon && (
              <ContactIcon name={icon} width={10} height={10} color="#377dff" />
            )}
            {image && <Icon src={image} alt="" />}
            {text}
          </a>
          {note && (
            <>
              {" "}
              <Deemphasize>{note}</Deemphasize>
            </>
          )}
        </ContactItem>
      ))}
    </Contact>
  </HeaderSection>
);

const EducationItem = ({
  institution,
  institutionUrl,
  degree,
  location,
  date,
  grade,
  html,
}) => (
  <Item>
    <Subtitle>
      <Emphasize>
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href={institutionUrl}
        >
          {institution}
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
    <Text dangerouslySetInnerHTML={{ __html: html }} />
  </Item>
);

const ExperienceItem = ({
  title,
  company,
  companyUrl,
  location,
  date,
  internship,
  html,
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
      <Text dangerouslySetInnerHTML={{ __html: html }} />
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

const getId = (node) =>
  node.fileAbsolutePath.split("/").pop().replace(".md", "");

// Picks nodes by file name, in the order given (unknown ids are skipped).
const pickByIds = (nodes, ids, label) => {
  const byId = Object.fromEntries(nodes.map((node) => [getId(node), node]));
  return (ids || [])
    .map((id) => {
      if (!byId[id]) console.warn(`resume.md: unknown ${label} "${id}"`);
      return byId[id];
    })
    .filter(Boolean);
};

const formatTeachingDate = ({ startYear, endYear }) =>
  startYear === endYear ? `${startYear}` : `${startYear} - ${endYear}`;

// Same colors as the home page's interest icons.
const INTEREST_ICON_COLORS = {
  science: "#70ba59",
  robotics: "#f0655b",
  sailing: "#377dff",
};

const MiscAttribute = ({ name, entries }) => {
  const hasIcons = entries.some((entry) => entry.icon);

  return (
    <MiscRow>
      <SubSubtitle>{name}</SubSubtitle>
      <MiscContent>
        {hasIcons
          ? entries.map((entry) => (
              <MiscInterest key={entry.text}>
                {entry.icon && (
                  <LucideIcon
                    name={entry.icon}
                    width={11}
                    height={11}
                    color={INTEREST_ICON_COLORS[entry.icon]}
                    strokeWidth={2.25}
                  />
                )}
                {entry.text}
              </MiscInterest>
            ))
          : entries.map((entry) => entry.text).join(" • ")}
      </MiscContent>
    </MiscRow>
  );
};

const ResumePageComponent = ({ data }) => {
  const viewportRef = useRef(null);
  const pagesRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [disableFit, setDisableFit] = useState(false);

  const config = data.resume.frontmatter;
  const experience = pickByIds(data.experience.nodes, config.experience, "experience");
  const education = pickByIds(data.education.nodes, config.education, "education");
  const projects = pickByIds(data.projects.nodes, config.projects, "project");
  const publications = pickByIds(data.publications.nodes, config.publications, "publication");

  const misc = config.misc || {};
  const skills = misc.skills ? data.misc.frontmatter.skills : [];
  const teaching = pickByIds(data.teaching.nodes, misc.teaching, "teaching");
  const attributes = (misc.attributes || [])
    .map((name) => {
      const attribute = data.misc.frontmatter.attributes.find((a) => a.name === name);
      if (!attribute) console.warn(`resume.md: unknown misc attribute "${name}"`);
      return attribute;
    })
    .filter(Boolean);
  const hasMiscOtherRows = teaching.length > 0 || attributes.length > 0;

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
            <ResumeHeader {...config} />

            {experience.length > 0 && (
              <Section>
                <Title>Experience</Title>

                {experience.map((node) => (
                  <ExperienceItem
                    key={node.fileAbsolutePath}
                    {...node.frontmatter}
                    html={node.html}
                  />
                ))}
              </Section>
            )}

            {education.length > 0 && (
              <Section>
                <Title>Education</Title>

                {education.map((node) => (
                  <EducationItem
                    key={node.fileAbsolutePath}
                    {...node.frontmatter}
                    html={node.html}
                  />
                ))}
              </Section>
            )}

            {publications.length > 0 && (
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

                {publications.map((node) => (
                  <PublicationItem
                    key={node.fileAbsolutePath}
                    title={node.frontmatter.title}
                    url={
                      node.frontmatter.resources.find(
                        (resource) => resource.name === "Document"
                      )?.url
                    }
                    source={node.frontmatter.shortSource || node.frontmatter.source}
                    year={node.frontmatter.year}
                  />
                ))}
              </Section>
            )}

            {projects.length > 0 && (
              <Section>
                <Title>Projects</Title>

                <Cols>
                  {projects.map((node) => (
                    <Col key={node.fileAbsolutePath}>
                      <ProjectItem
                        name={node.frontmatter.name}
                        url={node.frontmatter.url}
                        icon={
                          node.frontmatter.url?.includes("github.com")
                            ? "package"
                            : "app"
                        }
                        description={node.frontmatter.description}
                      />
                    </Col>
                  ))}
                </Cols>
              </Section>
            )}

            {(skills.length > 0 || hasMiscOtherRows) && (
              <Section>
                <Title>Miscellaneous</Title>

                <Cols>
                  {skills.length > 0 && (
                    <Col>
                      <MiscRow>
                        <SkillsLabel>Skills</SkillsLabel>
                        <SkillGroups>
                          {skills.map((group) => (
                            <SkillGroup key={group.category}>
                              <SkillGroupLabel>{group.category}:</SkillGroupLabel>
                              {group.items.map((item) => (
                                <Label key={item}>{item}</Label>
                              ))}
                            </SkillGroup>
                          ))}
                        </SkillGroups>
                      </MiscRow>
                    </Col>
                  )}

                  {hasMiscOtherRows && (
                    <Col>
                      {teaching.length > 0 && (
                        <MiscRow>
                          <SubSubtitle>Teaching</SubSubtitle>
                          <MiscContent>
                            <div>
                              {teaching.map((node, i) => (
                                <React.Fragment key={node.fileAbsolutePath}>
                                  {i > 0 && " • "}
                                  {node.frontmatter.name}{" "}
                                  <Deemphasize style={{ whiteSpace: "nowrap" }}>
                                    ({formatTeachingDate(node.frontmatter)} @{" "}
                                    {node.frontmatter.location})
                                  </Deemphasize>
                                </React.Fragment>
                              ))}
                            </div>
                          </MiscContent>
                        </MiscRow>
                      )}

                      {attributes.map((attribute) => (
                        <MiscAttribute key={attribute.name} {...attribute} />
                      ))}
                    </Col>
                  )}
                </Cols>
              </Section>
            )}

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

export const query = graphql`
  {
    resume: markdownRemark(fileAbsolutePath: { regex: "/content/resume.md/" }) {
      frontmatter {
        name
        description
        contact {
          icon
          image
          text
          url
          note
        }
        experience
        education
        publications
        projects
        misc {
          skills
          teaching
          attributes
        }
      }
    }
    experience: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/experience/" } }
    ) {
      nodes {
        fileAbsolutePath
        html
        frontmatter {
          title
          company
          companyUrl
          location
          date
          internship
        }
      }
    }
    education: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/education/" } }
    ) {
      nodes {
        fileAbsolutePath
        html
        frontmatter {
          institution
          institutionUrl
          degree
          location
          date
          grade
        }
      }
    }
    publications: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/publications/" } }
    ) {
      nodes {
        fileAbsolutePath
        frontmatter {
          title
          source
          shortSource
          year
          resources {
            name
            url
          }
        }
      }
    }
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
    ) {
      nodes {
        fileAbsolutePath
        frontmatter {
          name
          description
          url
        }
      }
    }
    teaching: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/teaching/" } }
    ) {
      nodes {
        fileAbsolutePath
        frontmatter {
          name
          location
          startYear
          endYear
        }
      }
    }
    misc: markdownRemark(fileAbsolutePath: { regex: "/content/misc.md/" }) {
      frontmatter {
        skills {
          category
          items
        }
        attributes {
          name
          entries {
            icon
            text
          }
        }
      }
    }
  }
`;
