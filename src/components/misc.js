import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Icon from "./icon";
import Link from "./link";
import { RESOURCE_ICONS } from "./resourceActions";

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

const EntryResourceIcons = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 8px;
  vertical-align: middle;
`;

const EntryResources = ({ resources }) => {
  if (!resources || resources.length === 0) return null;

  return (
    <EntryResourceIcons>
      {resources.map((resource) => (
        <Link
          key={resource.name}
          to={resource.url}
          external
          variant="secondary"
          title={resource.name}
        >
          <Icon name={RESOURCE_ICONS[resource.name]} width={12} height={12} />
        </Link>
      ))}
    </EntryResourceIcons>
  );
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

// A generic misc attribute: entries with an icon render like Interests
// (icon + label), entries without one render as a plain bullet-separated
// list (e.g. Academic Service, Awards).
const Attribute = ({ name, entries }) => {
  const hasIcons = entries.some((entry) => entry.icon);

  return (
    <Row>
      <RowLabel>{name}</RowLabel>
      <RowContent>
        {hasIcons ? (
          <Interests>
            {entries.map((entry) => (
              <Interest key={entry.text}>
                {entry.icon && (
                  <Icon
                    name={entry.icon}
                    width={16}
                    height={16}
                    color={INTEREST_ICON_COLORS[entry.icon]}
                    strokeWidth={2.25}
                  />
                )}
                {entry.text}
              </Interest>
            ))}
          </Interests>
        ) : (
          <EntryList>
            {entries.map((entry) => (
              <div key={entry.text}>{entry.text}</div>
            ))}
          </EntryList>
        )}
      </RowContent>
    </Row>
  );
};

const Misc = ({ data, skillsData, teaching, talks }) => {
  const { attributes = [], showTeaching, showTalks } = data.frontmatter;
  const { show: displaySkills, skills } = skillsData.frontmatter;

  const visibleAttributes = attributes.filter(
    (attribute) => attribute.show !== false
  );

  // Alternate attributes between the two columns so any number of them
  // (Academic Service, Awards, Interests, or whatever gets added later)
  // stays balanced without hardcoding which ones go where.
  const leftAttributes = visibleAttributes.filter((_, i) => i % 2 === 0);
  const rightAttributes = visibleAttributes.filter((_, i) => i % 2 === 1);

  const allTeaching = teaching.nodes;
  const recentTalks = [...talks.nodes]
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
    .slice(0, 3);

  return (
    <Section title="Miscellaneous" icon="misc">
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

      {showTeaching && (
      <Row>
        <RowLabel>Teaching</RowLabel>
        <RowContent>
          <EntryList>
            {allTeaching.map((course) => {
              const { name, location, resources } = course.frontmatter;
              const label = `${name} (${formatTeachingDate(course.frontmatter)} @ ${location})`;
              return (
                <div key={course.id}>
                  {label}
                  <EntryResources resources={resources} />
                </div>
              );
            })}
            <div>
              <Link to="/teaching" variant="secondary">See all teaching →</Link>
            </div>
          </EntryList>
        </RowContent>
      </Row>
      )}

      {showTalks && (
      <Row>
        <RowLabel>Talks</RowLabel>
        <RowContent>
          <EntryList>
            {recentTalks.map((talk) => {
              const { event, date, resources } = talk.frontmatter;
              const label = `${event} (${formatTalkDate(date)})`;
              return (
                <div key={talk.id}>
                  {label}
                  <EntryResources resources={resources} />
                </div>
              );
            })}
            <div>
              <Link to="/talks" variant="secondary">See all talks →</Link>
            </div>
          </EntryList>
        </RowContent>
      </Row>
      )}
      </FullWidthRows>

      {visibleAttributes.length > 0 && (
      <Columns>
        {leftAttributes.length > 0 && (
        <Column>
          {leftAttributes.map((attribute) => (
            <Attribute key={attribute.name} {...attribute} />
          ))}
        </Column>
        )}

        {rightAttributes.length > 0 && (
        <Column>
          {rightAttributes.map((attribute) => (
            <Attribute key={attribute.name} {...attribute} />
          ))}
        </Column>
        )}
      </Columns>
      )}
    </Section>
  );
};

export default Misc;
