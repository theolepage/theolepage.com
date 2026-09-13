import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Icon from "./icon";
import Link from "./link";

const FullWidthRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--element-spacing) * 1.2);
`;

const Columns = styled.div`
  display: flex;
  gap: calc(var(--element-spacing) * 2);
  margin-top: calc(var(--element-spacing) * 1.2);

  @media (max-width: 800px) {
    flex-direction: column;
    gap: calc(var(--element-spacing) * 1.2);
  }
`;

const Column = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: calc(var(--element-spacing) * 1.2);
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px var(--element-spacing);

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 4px;
  }
`;

const RowLabel = styled.div`
  flex-shrink: 0;
  width: 150px;

  font-weight: 600;
  color: var(--color-title);

  @media (max-width: 600px) {
    width: auto;
  }
`;

const RowContent = styled.div`
  flex: 1;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 24px;

  font-size: var(--size-small);
  color: var(--color-muted-1);
`;

const SkillsContent = styled.div`
  flex: 1;

  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;

  font-size: var(--size-small);
  color: var(--color-muted-1);
`;

const SkillGroupLabel = styled.span`
  flex-shrink: 0;
  margin-left: 16px;

  font-size: var(--size-tiny);
  font-weight: 600;
  color: var(--color-muted-2);

  &:first-of-type {
    margin-left: 0;
  }
`;

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Pill = styled.span`
  padding: 3px 8px;

  font-size: var(--size-tiny);
  color: var(--color-muted-1);

  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
`;

const Separator = styled.span`
  margin: 0 8px;

  color: var(--color-muted-2);
`;

const Interests = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Interest = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

// Same colors as the resume's interest icons (icon-science.svg, icon-robotics.svg, icon-wave.svg)
const INTEREST_ICON_COLORS = {
  science: "#70ba59",
  robotics: "#f0655b",
  sailing: "#377dff",
};

const formatTeachingDate = ({ semester, startYear, endYear }) => {
  if (startYear === endYear) {
    return `${semester} ${startYear}`;
  }
  return `${semester} ${startYear} - ${endYear}`;
};

const formatTalkDate = (date) => {
  const parsed = new Date(date);
  return `${parsed.toLocaleDateString("en-US", { month: "short" })}. ${parsed.getFullYear()}`;
};

const Misc = ({ data, teaching, talks }) => {
  const {
    skills,
    languages,
    interests,
    academicService,
    awards,
  } = data.frontmatter;

  const allTeaching = teaching.nodes;
  const recentTalks = [...talks.nodes]
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
    .slice(0, 3);

  return (
    <Section title="Miscellaneous">
      <FullWidthRows>
      <Row>
        <RowLabel>Skills</RowLabel>
        <SkillsContent>
          {skills.map((group) => (
            <React.Fragment key={group.category}>
              <SkillGroupLabel>{group.category}:</SkillGroupLabel>
              {group.items.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </React.Fragment>
          ))}
        </SkillsContent>
      </Row>

      <Row>
        <RowLabel>Teaching</RowLabel>
        <RowContent>
          <div>
            {allTeaching.map((course, i) => {
              const { name, location } = course.frontmatter;
              const label = `${name} (${formatTeachingDate(course.frontmatter)} @ ${location})`;
              return (
                <React.Fragment key={course.id}>
                  {i > 0 && <Separator>•</Separator>}
                  {label}
                </React.Fragment>
              );
            })}
          </div>
        </RowContent>
      </Row>

      <Row>
        <RowLabel>Talks</RowLabel>
        <RowContent>
          <div>
            {recentTalks.map((talk, i) => {
              const { event, date } = talk.frontmatter;
              const label = `${event} (${formatTalkDate(date)})`;
              return (
                <React.Fragment key={talk.id}>
                  {i > 0 && <Separator>•</Separator>}
                  {label}
                </React.Fragment>
              );
            })}
            <Separator>•</Separator>
            <Link to="/talks">See all talks →</Link>
          </div>
        </RowContent>
      </Row>
      </FullWidthRows>

      <Columns>
        <Column>
          <Row>
            <RowLabel>Academic Service</RowLabel>
            <RowContent>{academicService}</RowContent>
          </Row>

          <Row>
            <RowLabel>Awards</RowLabel>
            <RowContent>{awards}</RowContent>
          </Row>
        </Column>

        <Column>
          <Row>
            <RowLabel>Languages</RowLabel>
            <RowContent>
              <Pills>
                {languages.map((language) => (
                  <Pill key={language}>{language}</Pill>
                ))}
              </Pills>
            </RowContent>
          </Row>

          <Row>
            <RowLabel>Interests</RowLabel>
            <RowContent>
              <Interests>
                {interests.map((interest) => (
                  <Interest key={interest.text}>
                    <Icon
                      name={interest.icon}
                      width={16}
                      height={16}
                      color={INTEREST_ICON_COLORS[interest.icon]}
                      strokeWidth={2.25}
                    />
                    {interest.text}
                  </Interest>
                ))}
              </Interests>
            </RowContent>
          </Row>
        </Column>
      </Columns>
    </Section>
  );
};

export default Misc;
