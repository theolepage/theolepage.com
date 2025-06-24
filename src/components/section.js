import React from "react";
import styled from "@emotion/styled";

const SectionElement = styled.div`
  margin-bottom: var(--section-spacing);
`;

const Section = ({ title, children }) => {
  return (
    <SectionElement>
      {title && <h2>{title}</h2>}
      {children}
    </SectionElement>
  );
};

export default Section;
