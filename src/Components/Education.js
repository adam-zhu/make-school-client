import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Education = ({
  id,
  schoolName,
  graduated,
  degree,
  subject,
  lastYearAttended
}) => {
  const styles = `
    h1 {
      font-family: 'Roboto Mono', monospace;
      font-size: 1em;
      margin-bottom: 0.25em;
    }
    h2 {
      font-family: 'Hind Madurai', sans-serif;
      font-size: 0.925em;
      margin-bottom: 0.25em;
    }
    h3 {
      font-family: 'Roboto Mono', monospace;
      font-size: 0.875em;
      font-weight: normal;
    }
    h4 {
      font-family: 'Hind Madurai', sans-serif;
      font-size: 0.8125em;
      margin-bottom: 0.25em;
    }
  `;

  return (
    <div
      key={id}
      css={css`
        ${styles}
      `}
    >
      <h1>{schoolName}</h1>
      <h4>{lastYearAttended}</h4>
      <h2>{degree}</h2>
      <h3>{subject}</h3>
    </div>
  );
};

export default Education;
