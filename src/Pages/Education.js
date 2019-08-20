import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { shadows, formStyles } from "../styles";

const Education = ({
  education,
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
      <h2>Create New Education</h2>
      <br />
      <Create saveHandlerFactory={createHandler} />
      <br />
      <hr />
      <br />
      <h2>Education</h2>
      <br />
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {education.length > 0 ? (
          education.map(ed => (
            <div
              key={ed.id}
              css={css`
                margin: 0 1rem 1rem 0;
              `}
            >
              <EducationItems
                {...ed}
                changeHandlerFactory={changeHandlerFactory}
                saveHandlerFactory={saveHandlerFactory}
                deleteHandlerFactory={deleteHandlerFactory}
              />
            </div>
          ))
        ) : (
          <p>none</p>
        )}
      </div>
    </div>
  );
};

const Create = ({ saveHandlerFactory }) => {
  const initialCreateFormState = {
    schoolName: "",
    graduated: false,
    degree: "",
    subject: "",
    lastYearAttended: "",
    busy: false
  };
  const [
    { schoolName, graduated, degree, subject, lastYearAttended, busy },
    setCreateFormState
  ] = useState(initialCreateFormState);
  const fieldChangeHandler = e => {
    const { name } = e.target;
    const value = name === "graduated" ? e.target.checked : e.target.value;

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
      schoolName,
      graduated,
      degree,
      subject,
      lastYearAttended
    })(successCallback, failureCallback);
  };

  return (
    <form
      onSubmit={submitHandler}
      disabled={busy}
      css={css`
        ${formStyles}
        max-width: 14rem;
      `}
    >
      <div>
        <label>School Name</label>
        <input
          type="text"
          name="schoolName"
          value={schoolName}
          onChange={fieldChangeHandler}
          disabled={busy}
        />
      </div>
      <div>
        <label>Graduated</label>
        <input
          type="checkbox"
          name="graduated"
          checked={graduated}
          onChange={fieldChangeHandler}
          disabled={busy}
        />
      </div>
      <div>
        <label>Degree</label>
        <input
          type="text"
          name="degree"
          value={degree}
          onChange={fieldChangeHandler}
          disabled={busy}
        />
      </div>
      <div>
        <label>Subject</label>
        <input
          type="text"
          name="subject"
          value={subject}
          onChange={fieldChangeHandler}
          disabled={busy}
        />
      </div>
      <div>
        <label>Last Year Attended</label>
        <input
          type="text"
          name="lastYearAttended"
          value={lastYearAttended}
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

const EducationItems = ({
  id,
  schoolName,
  graduated,
  degree,
  subject,
  lastYearAttended,
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
          <label>School Name</label>
          <input
            type="text"
            name="schoolName"
            value={schoolName}
            onChange={fieldChangeHandler}
            disabled={busy}
          />
        </div>
        <div>
          <label>Graduated</label>
          <input
            type="checkbox"
            name="graduated"
            checked={graduated}
            onChange={fieldChangeHandler}
            disabled={busy}
          />
        </div>
        <div>
          <label>Degree</label>
          <input
            type="text"
            name="degree"
            value={degree}
            onChange={fieldChangeHandler}
            disabled={busy}
          />
        </div>
        <div>
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={fieldChangeHandler}
            disabled={busy}
          />
        </div>
        <div>
          <label>Last Year Attended</label>
          <input
            type="text"
            name="lastYearAttended"
            value={lastYearAttended}
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
          disabled={busy}
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

export default Education;
