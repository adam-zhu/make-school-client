import React from "react";

const CoverLetter = ({ id, title, subtitle, text }) => {
  return (
    <div key={id}>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p>{text}</p>
    </div>
  );
};

export default CoverLetter;
