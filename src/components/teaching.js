import React from "react";
import styled from "@emotion/styled";

import Section from "./section";
import Block from "./block";
import Link from "./link";
import ResourceActions from "./resourceActions";

const BlocksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--element-spacing);

  margin-bottom: var(--element-spacing);

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const CourseItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Teaching = ({ data, listing }) => {
  const teaching = listing ? data.nodes : data.nodes.slice(0, 4);

  const formatDate = (startYear, endYear, semester) => {
    if (startYear === endYear) {
      return `${semester} ${startYear}`;
    } else {
      return `${semester} ${startYear} - ${endYear}`;
    }
  };

  return (
    <Section title="Teaching" icon="teaching">
      <BlocksGrid>
        {teaching.map((course) => {
          const dateString = formatDate(
            course.frontmatter.startYear,
            course.frontmatter.endYear,
            course.frontmatter.semester
          );
          return (
            <Block key={course.id} title={course.frontmatter.name} minimal>
              <CourseItem>
                <div>
                  {dateString} @ {course.frontmatter.location}
                </div>
                <ResourceActions resources={course.frontmatter.resources} />
              </CourseItem>
            </Block>
          );
        })}
      </BlocksGrid>

      {!listing && (
        <Link to="/teaching" variant="secondary">See all teaching →</Link>
      )}
    </Section>
  );
};

export default Teaching;
