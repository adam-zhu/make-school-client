import React, { useState } from "react";

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
      <Create saveHandlerFactory={createHandler} />
      <hr />
      <h2>Education</h2>
      {education.length > 0 ? (
        education.map(ed => (
          <EducationItems
            key={ed.id}
            {...ed}
            changeHandlerFactory={changeHandlerFactory}
            saveHandlerFactory={saveHandlerFactory}
            deleteHandlerFactory={deleteHandlerFactory}
          />
        ))
      ) : (
        <p>none</p>
      )}
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
    <form onSubmit={submitHandler} disabled={busy}>
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

  return (
    <article>
      <form onSubmit={saveHandlerFactory(id)} disabled={busy}>
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
      <form onSubmit={deleteHandlerFactory(id)} disabled={busy}>
        <button type="submit" disabled={busy}>
          Delete
        </button>
      </form>
    </article>
  );
};

export default Education;
