import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Block from "./block";

const BlocksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
`;

const Talks = ({ data }) => {
  const talks = data.nodes;

  const formatDate = (talk) => {
    // Check if we have startDate and endDate (for date ranges)
    if (talk.frontmatter.startDate && talk.frontmatter.endDate) {
      const start = new Date(talk.frontmatter.startDate);
      const end = new Date(talk.frontmatter.endDate);

      // Format as "MMM. YYYY"
      const formatSingleDate = (date) => {
        return date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      };

      if (talk.frontmatter.startDate === talk.frontmatter.endDate) {
        // Single date
        return formatSingleDate(start);
      } else {
        // Date range
        const startFormatted = formatSingleDate(start);
        const endFormatted = formatSingleDate(end);

        if (start.getFullYear() === end.getFullYear()) {
          // Same year: "Jan. - Sep. 2021"
          return `${start.toLocaleDateString("en-US", { month: "short" })} - ${end.toLocaleDateString("en-US", { month: "short" })} ${start.getFullYear()}`;
        } else {
          // Different years: "Jan. 2021 - Sep. 2022"
          return `${startFormatted} - ${endFormatted}`;
        }
      }
    } else if (talk.frontmatter.date) {
      // Single date field
      const date = new Date(talk.frontmatter.date);
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
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

  // Sort talks by effective date in descending order (newest first)
  const sortedTalks = talks.sort((a, b) => {
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
            info={formatDate(talk) + " @ " + talk.frontmatter.location}
            url={talk.frontmatter.link}
          />
        ))}
      </BlocksGrid>
    </Section>
  );
};

export default Talks;
