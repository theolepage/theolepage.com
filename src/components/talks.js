import React from "react";
import styled from "@emotion/styled";
import { Presentation } from "lucide-react";

import Section from "./section";
import Block from "./block";
import Button from "./button";

const BlocksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--spacing);
  margin-bottom: var(--spacing);
`;

const TalksIcon = styled(Presentation)`
  display: inline-block;
  position: relative;
  top: 2px;
  margin: 0 8px 0 0px;
  width: var(--icon-size);
  height: var(--icon-size);
  color: var(--color-default);
`;

const Talks = ({ data, listing }) => {
  const talks = data.nodes;

  const formatDate = (talk) => {
    // Format as "MMM. YYYY"
    const formatSingleDate = (date) => {
      return `${date.toLocaleDateString("en-US", { month: "short" })}. ${date.getFullYear()}`;
    };

    // Check if we have startDate and endDate (for date ranges)
    if (talk.frontmatter.startDate && talk.frontmatter.endDate) {
      const start = new Date(talk.frontmatter.startDate);
      const end = new Date(talk.frontmatter.endDate);

      if (talk.frontmatter.startDate === talk.frontmatter.endDate) {
        // Single date
        return formatSingleDate(start);
      } else {
        // Date range
        const startFormatted = formatSingleDate(start);
        const endFormatted = formatSingleDate(end);

        if (start.getFullYear() === end.getFullYear()) {
          // Same year: "Jan. - Sep. 2021"
          return `${start.toLocaleDateString("en-US", { month: "short" })}. - ${end.toLocaleDateString("en-US", { month: "short" })}. ${start.getFullYear()}`;
        } else {
          // Different years: "Jan. 2021 - Sep. 2022"
          return `${startFormatted} - ${endFormatted}`;
        }
      }
    } else if (talk.frontmatter.date) {
      // Single date field
      const date = new Date(talk.frontmatter.date);
      return formatSingleDate(date);
    }

    return "Date not specified";
  };

  const getEffectiveDate = (talk) => {
    // Get the effective date for sorting (either date or startDate)
    if (talk.frontmatter.date) {
      return new Date(talk.frontmatter.date);
    } else if (talk.frontmatter.startDate) {
      return new Date(talk.frontmatter.startDate);
    }
    return new Date(0); // Fallback for talks without dates
  };

  const isCurrentOrPastYear = (talk) => {
    const effectiveDate = getEffectiveDate(talk);
    const currentYear = new Date().getFullYear();
    const pastYear = currentYear - 1;
    return (
      effectiveDate.getFullYear() >= pastYear &&
      effectiveDate.getFullYear() <= currentYear
    );
  };

  // Filter talks based on listing mode
  let filteredTalks = talks;
  if (!listing) {
    // Only show talks from current and past year
    filteredTalks = talks.filter(isCurrentOrPastYear);
  }

  // Sort talks by effective date in descending order (newest first)
  const sortedTalks = filteredTalks.sort((a, b) => {
    const dateA = getEffectiveDate(a);
    const dateB = getEffectiveDate(b);
    return dateB - dateA;
  });

  return (
    <Section title="Talks">
      <BlocksGrid>
        {sortedTalks.map((talk) => (
          <Block
            key={talk.id}
            title={talk.frontmatter.name}
            info={formatDate(talk)}
            url={talk.frontmatter.link}
          >
            {talk.frontmatter.location}
          </Block>
        ))}
      </BlocksGrid>

      {!listing && (
        <Button to={"/talks"}>
          <TalksIcon />
          See all talks
        </Button>
      )}
    </Section>
  );
};

export default Talks;
