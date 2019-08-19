import React from "react";

const EmploymentHistory = ({
  id,
  employerName,
  startDate,
  endDate,
  label,
  description
}) => {
  return (
    <div key={id}>
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
