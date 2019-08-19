import React from "react";

const Education = ({
  id,
  schoolName,
  graduated,
  startDate,
  endDate,
  degree,
  subject
}) => {
  return (
    <div key={id}>
      <h1>{schoolName}</h1>
      <h2>{degree}</h2>
      <h3>{subject}</h3>
      <p>
        {startDate} - {endDate}
      </p>
    </div>
  );
};

export default Education;
