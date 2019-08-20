import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const CoverLetter = ({ id, title, subtitle, text }) => {
  const styles = `
    h1 {
      font-family: 'Roboto Mono', monospace;
      font-size: 1.2em;
      background-color: red;
      color: white;
      padding: 0.25em 0.5em;
      margin-bottom: 0.25em;
    }
    h2 {
      font-family: 'Roboto Mono', monospace;
      font-size: 1em;
      margin-bottom: 0.25em;
    }
    p {
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
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p>{text}</p>
    </div>
  );
};

export default CoverLetter;
