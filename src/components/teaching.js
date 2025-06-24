import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Block from "./block";

const BlocksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--element-spacing);

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Teaching = ({ data }) => {
  const teaching = data.nodes;

  const formatDate = (startYear, endYear, semester) => {
    if (startYear === endYear) {
      return `${semester} ${startYear}`;
    } else {
      return `${semester} ${startYear} - ${endYear}`;
    }
  };

  return (
    <Section title="Teaching">
      <BlocksGrid>
        {teaching.map((course) => {
          const dateString = formatDate(
            course.frontmatter.startYear,
            course.frontmatter.endYear,
            course.frontmatter.semester
          );
          return (
            <Block key={course.id} title={course.frontmatter.name}>
              {dateString} @ {course.frontmatter.location}
            </Block>
          );
        })}
      </BlocksGrid>
    </Section>
  );
};

export default Teaching;
