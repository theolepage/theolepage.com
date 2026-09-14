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

const MoreRow = styled(Row)`
  margin-top: calc(var(--element-spacing) * 1.2);
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

const EntryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  /* Above this width, flow entries inline with a separator instead of
     stacking them one per line (which is reserved for smaller screens). */
  @media (min-width: 801px) {
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 4px;
    column-gap: 0;

    /* Attached to the end of the preceding entry (not the start of the
       next) so a wrapped line never begins with an orphaned separator. */
    > *:not(:last-of-type)::after {
      content: "•";
      margin: 0 8px;
      color: var(--color-muted-2);
    }
  }
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

const formatList = (items) => {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return items.join(" and ");
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
};

// Same colors as the resume's interest icons (icon-science.svg, icon-robotics.svg, icon-wave.svg)
const INTEREST_ICON_COLORS = {
  science: "#70ba59",
  robotics: "#f0655b",
  sailing: "#377dff",
};

const formatTeachingDate = ({ semester, startYear, endYear }) => {
  if (startYear === endYear) {
    return `${startYear}`;
  }
  return `${startYear} - ${endYear}`;
};

const formatTalkDate = (date) => {
  const parsed = new Date(date);
  return `${parsed.toLocaleDateString("en-US", { month: "short" })}. ${parsed.getFullYear()}`;
};

const Misc = ({ data, teaching, talks, posts }) => {
  const {
    skills,
    languages,
    interests,
    academicService,
    awards,
    showSkills,
    showAcademicService,
    showAwards,
    showLanguages,
    showInterests,
  } = data.frontmatter;

  const displaySkills = showSkills !== false;
  const displayAcademicService = showAcademicService !== false;
  const displayAwards = showAwards !== false;
  const displayLanguages = showLanguages !== false;
  const displayInterests = showInterests !== false;

  const showLeftColumn = displayAcademicService || displayAwards;
  const showRightColumn = displayLanguages || displayInterests;

  const hiddenSections = [
    !displaySkills && "Skills",
    !displayAcademicService && "Academic Service",
    !displayAwards && "Awards",
    !displayLanguages && "Languages",
    !displayInterests && "Interests",
  ].filter(Boolean);

  const allTeaching = teaching.nodes;
  const recentTalks = [...talks.nodes]
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
    .slice(0, 3);
  const recentPosts = posts.nodes.slice(0, 3);

  return (
    <Section title="Miscellaneous">
      <FullWidthRows>
      {displaySkills && (
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
      )}

      <Row>
        <RowLabel>Teaching</RowLabel>
        <RowContent>
          <EntryList>
            {allTeaching.map((course) => {
              const { name, location } = course.frontmatter;
              const label = `${name} (${formatTeachingDate(course.frontmatter)} @ ${location})`;
              return <div key={course.id}>{label}</div>;
            })}
          </EntryList>
        </RowContent>
      </Row>

      <Row>
        <RowLabel>Talks</RowLabel>
        <RowContent>
          <EntryList>
            {recentTalks.map((talk) => {
              const { event, date } = talk.frontmatter;
              const label = `${event} (${formatTalkDate(date)})`;
              return <div key={talk.id}>{label}</div>;
            })}
            <div>
              <Link to="/talks">See all talks →</Link>
            </div>
          </EntryList>
        </RowContent>
      </Row>

      <Row>
        <RowLabel>Posts</RowLabel>
        <RowContent>
          <EntryList>
            {recentPosts.map((post) => (
              <div key={post.id}>{post.frontmatter.title}</div>
            ))}
            <div>
              <Link to="/posts">See all posts →</Link>
            </div>
          </EntryList>
        </RowContent>
      </Row>
      </FullWidthRows>

      {(showLeftColumn || showRightColumn) && (
      <Columns>
        {showLeftColumn && (
        <Column>
          {displayAcademicService && (
          <Row>
            <RowLabel>Academic Service</RowLabel>
            <RowContent>{academicService}</RowContent>
          </Row>
          )}

          {displayAwards && (
          <Row>
            <RowLabel>Awards</RowLabel>
            <RowContent>{awards}</RowContent>
          </Row>
          )}
        </Column>
        )}

        {showRightColumn && (
        <Column>
          {displayLanguages && (
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
          )}

          {displayInterests && (
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
          )}
        </Column>
        )}
      </Columns>
      )}

      {hiddenSections.length > 0 && (
        <MoreRow>
          <RowLabel>More</RowLabel>
          <RowContent>
            <span>
              {formatList(
                hiddenSections.map((label, i) =>
                  i === 0 ? label : label.toLowerCase()
                )
              )}{" "}
              {hiddenSections.length === 1 ? "is" : "are"} listed in my{" "}
              <Link to="/resume">resume</Link>.
            </span>
          </RowContent>
        </MoreRow>
      )}
    </Section>
  );
};

export default Misc;
