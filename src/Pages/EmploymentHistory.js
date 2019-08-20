import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { shadows, formStyles } from "../styles";

const EmploymentHistory = ({
  employmentHistory,
  busy,
  changeHandlerFactory,
  saveHandlerFactory,
  createHandler,
  deleteHandlerFactory
}) => {
  if (busy) {
    return <progress />;
  }

  return (
    <div>
      <h2>Create New Employment History Item</h2>
      <br />
      <Create saveHandlerFactory={createHandler} />
      <br />
      <hr />
      <br />
      <h2>Employment History</h2>
      <br />
      {employmentHistory.length > 0 ? (
        employmentHistory.map(emp => (
          <>
            <EmploymentHistoryItem
              key={emp.id}
              {...emp}
              changeHandlerFactory={changeHandlerFactory}
              saveHandlerFactory={saveHandlerFactory}
              deleteHandlerFactory={deleteHandlerFactory}
            />
            <br />
          </>
        ))
      ) : (
        <p>none</p>
      )}
    </div>
  );
};

const Create = ({ saveHandlerFactory }) => {
  const initialCreateFormState = {
    employerName: "",
    startDate: "",
    endDate: "",
    label: "",
    description: "",
    busy: false
  };
  const [
    { employerName, startDate, endDate, label, description, busy },
    setCreateFormState
  ] = useState(initialCreateFormState);
  const fieldChangeHandler = e => {
    const { name, value } = e.target;

    setCreateFormState(state => ({
      ...state,
      [name]: value
    }));
  };
  const submitHandler = e => {
    const successCallback = () =>
      setCreateFormState({ ...initialCreateFormState });
    const failureCallback = () =>
      setCreateFormState(state => ({ ...state, busy: false }));

    e.preventDefault();
    setCreateFormState(state => ({ ...state, busy: true }));
    saveHandlerFactory({
      employerName,
      startDate,
      endDate,
      label,
      description
    })(successCallback, failureCallback);
  };

  return (
    <form
      onSubmit={submitHandler}
      disabled={busy}
      css={css`
        ${formStyles}
      `}
    >
      <div>
        <label>Employer Name</label>
        <input
          type="text"
          name="employerName"
          value={employerName}
          onChange={fieldChangeHandler}
          disabled={busy}
        />
      </div>
      <div>
        <label>Start Date</label>
        <input
          type="text"
          name="startDate"
          value={startDate}
          onChange={fieldChangeHandler}
          disabled={busy}
        />
      </div>
      <div>
        <label>End Date</label>
        <input
          type="text"
          name="endDate"
          value={endDate}
          onChange={fieldChangeHandler}
          disabled={busy}
        />
      </div>
      <div>
        <label>Label</label>
        <input
          type="text"
          name="label"
          value={label}
          onChange={fieldChangeHandler}
          disabled={busy}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={description}
          onChange={fieldChangeHandler}
          disabled={busy}
        />
      </div>
      <button type="submit" disabled={busy}>
        Save
      </button>
    </form>
  );
};

const EmploymentHistoryItem = ({
  id,
  employerName,
  startDate,
  endDate,
  label,
  description,
  busy,
  changeHandlerFactory,
  saveHandlerFactory,
  deleteHandlerFactory
}) => {
  const fieldChangeHandler = changeHandlerFactory(id);
  const articleStyles = `
    padding: 1rem;
    box-shadow: ${shadows.dp1};
  `;

  return (
    <article
      css={css`
        ${articleStyles}
      `}
    >
      <form
        onSubmit={saveHandlerFactory(id)}
        disabled={busy}
        css={css`
          ${formStyles}
        `}
      >
        <div>
          <label>Employer Name</label>
          <input
            type="text"
            name="employerName"
            value={employerName}
            onChange={fieldChangeHandler}
            disabled={busy}
          />
        </div>
        <div>
          <label>Start Date</label>
          <input
            type="text"
            name="startDate"
            value={startDate}
            onChange={fieldChangeHandler}
            disabled={busy}
          />
        </div>
        <div>
          <label>End Date</label>
          <input
            type="text"
            name="endDate"
            value={endDate}
            onChange={fieldChangeHandler}
            disabled={busy}
          />
        </div>
        <div>
          <label>Label</label>
          <input
            type="text"
            name="label"
            value={label}
            onChange={fieldChangeHandler}
            disabled={busy}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={fieldChangeHandler}
            disabled={busy}
          />
        </div>
        <button type="submit" disabled={busy}>
          Save
        </button>
        <button
          type="submit"
          disabled={busy}
          onClick={deleteHandlerFactory(id)}
          css={css`
            float: right;
          `}
        >
          Delete
        </button>
      </form>
    </article>
  );
};

export default EmploymentHistory;
