import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const EmploymentHistory = ({
  id,
  employerName,
  startDate,
  endDate,
  label,
  description
}) => {
  const styles = `
    h1 {
      font-family: 'Roboto Mono', monospace;
      font-size: 1em;
      margin-bottom: 0.25em;
    }
    h2 {
      font-family: 'Roboto Mono', monospace;
      font-size: 0.875em;
      margin-bottom: 0.25em;
    }
    h3 {
      font-family: 'Roboto Mono', monospace;
      font-size: 0.8125em;
      font-weight: normal;
      color: gray;
    }
    p {
      font-family: 'Hind Madurai', sans-serif;
      font-size: 0.75em;
      margin-top: 0.25em;
      line-height: 1.3;
    }
  `;

  return (
    <div
      key={id}
      css={css`
        ${styles}
      `}
    >
      <h1>{employerName}</h1>
      <h2>{label}</h2>
      <h3>
        {startDate} - {endDate}
      </h3>
      <p>{description}</p>
    </div>
  );
};

export default EmploymentHistory;
