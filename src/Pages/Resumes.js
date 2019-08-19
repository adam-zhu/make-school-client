import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { shadows, formStyles } from "../styles";
import CoverLetter from "../Components/CoverLetter";
import Education from "../Components/Education";
import EmploymentHistory from "../Components/EmploymentHistory";

const Resumes = ({
  user,
  busy,
  nameChangeHandlerFactory,
  saveHandlerFactory,
  createHandler,
  deleteHandlerFactory,
  editModeToggleFactory,
  addCoverLetterToResumeFactory,
  addEducationToResumeFactory,
  addEmploymentHistoryToResumeFactory,
  removeCoverLetterHandler,
  removeEducationFactory,
  removeEmploymentHistoryFactory
}) => {
  if (busy) {
    return <progress />;
  }

  const { resumes } = user;

  return (
    <div>
      <h2>Create New Resume</h2>
      <br />
      <Create saveHandlerFactory={createHandler} />
      <br />
      <hr />
      <br />
      <h2>Resumes</h2>
      <br />
      {resumes.length > 0 ? (
        resumes.map(r => (
          <>
            <Resume
              key={r.id}
              resume={r}
              user={user}
              nameChangeHandlerFactory={nameChangeHandlerFactory}
              saveHandlerFactory={saveHandlerFactory}
              deleteHandlerFactory={deleteHandlerFactory}
              editModeToggleFactory={editModeToggleFactory}
              addCoverLetterToResumeFactory={addCoverLetterToResumeFactory}
              addEducationToResumeFactory={addEducationToResumeFactory}
              addEmploymentHistoryToResumeFactory={
                addEmploymentHistoryToResumeFactory
              }
              removeCoverLetterHandler={removeCoverLetterHandler}
              removeEducationFactory={removeEducationFactory}
              removeEmploymentHistoryFactory={removeEmploymentHistoryFactory}
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
    name: "",
    busy: false
  };
  const [state, setCreateFormState] = useState(initialCreateFormState);
  const nameChangeHandler = e => {
    const { value } = e.target;

    setCreateFormState(state => ({
      ...state,
      name: value
    }));
  };
  const submitHandler = e => {
    const successCallback = () =>
      setCreateFormState({ ...initialCreateFormState });
    const failureCallback = () =>
      setCreateFormState(state => ({ ...state, busy: false }));

    e.preventDefault();
    setCreateFormState(state => ({ ...state, busy: true }));
    saveHandlerFactory({ name: state.name })(successCallback, failureCallback);
  };

  return (
    <form
      onSubmit={submitHandler}
      disabled={state.busy}
      css={css`
        ${formStyles}
      `}
    >
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={nameChangeHandler}
          disabled={state.busy}
        />
      </div>
      <button type="submit" disabled={state.busy}>
        Save
      </button>
    </form>
  );
};

const Resume = ({
  resume,
  user,
  nameChangeHandlerFactory,
  saveHandlerFactory,
  deleteHandlerFactory,
  editModeToggleFactory,
  addCoverLetterToResumeFactory,
  addEducationToResumeFactory,
  addEmploymentHistoryToResumeFactory,
  removeCoverLetterHandler,
  removeEducationFactory,
  removeEmploymentHistoryFactory
}) => {
  // const { id, name, coverLetter, education, employmentHistory, busy } = resume;
  const nameChangeHandler = nameChangeHandlerFactory(resume.id);

  return resume.editing ? (
    <ResumeEdit
      resume={resume}
      user={user}
      editModeToggle={editModeToggleFactory(resume.id)}
      addCoverLetterFactory={addCoverLetterToResumeFactory(resume.id)}
      addEducationFactory={addEducationToResumeFactory(resume.id)}
      addEmploymentHistoryFactory={addEmploymentHistoryToResumeFactory(
        resume.id
      )}
      removeCoverLetterHandler={removeCoverLetterHandler}
      removeEducationHandler={removeEducationFactory(resume.id)}
      removeEmploymentHistoryHandler={removeEmploymentHistoryFactory(resume.id)}
    />
  ) : (
    <article>
      <form
        onSubmit={saveHandlerFactory(resume.id)}
        disabled={resume.busy}
        css={css`
          ${formStyles}
        `}
      >
        <div>
          <label>Name</label>
          <input
            type="text"
            value={resume.name}
            onChange={nameChangeHandler}
            disabled={resume.busy}
          />
        </div>
        <button type="submit" disabled={resume.busy}>
          Save
        </button>
        <button
          type="button"
          onClick={editModeToggleFactory(resume.id)}
          disabled={resume.busy}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={deleteHandlerFactory(resume.id)}
          disabled={resume.busy}
        >
          Delete
        </button>
      </form>
    </article>
  );
};

const ResumeEdit = ({
  resume,
  user,
  addCoverLetterFactory,
  addEducationFactory,
  addEmploymentHistoryFactory,
  removeCoverLetterHandler,
  removeEducationHandler,
  removeEmploymentHistoryHandler
}) => {
  const { coverLetters, education, employmentHistory } = user;
  const styles = css`
    display: flex;
    justify-content: space-between;
  `;

  return (
    <div css={styles}>
      <div>
        <CoverLetterChoices
          coverLetters={coverLetters}
          addCoverLetterFactory={addCoverLetterFactory}
          busy={resume.busy}
        />
        <EducationChoices
          education={education}
          addEducationFactory={addEducationFactory}
          busy={resume.busy}
        />
        <EmploymentHistoryChoices
          employmentHistory={employmentHistory}
          addEmploymentHistoryFactory={addEmploymentHistoryFactory}
          busy={resume.busy}
        />
      </div>
      <ResumeContent
        resume={resume}
        removeCoverLetterHandler={removeCoverLetterHandler}
        removeEducationHandler={removeEducationHandler}
        removeEmploymentHistoryHandler={removeEmploymentHistoryHandler}
      />
    </div>
  );
};

const CoverLetterChoices = ({ coverLetters, addCoverLetterFactory, busy }) => {
  return busy ? (
    <progress />
  ) : (
    coverLetters.map(c => (
      <div onClick={busy ? null : addCoverLetterFactory(c.id)} key={c.id}>
        <CoverLetter {...c} />
      </div>
    ))
  );
};

const EducationChoices = ({ education, addEducationFactory, busy }) => {
  return busy ? (
    <progress />
  ) : (
    education.map(edu => (
      <div onClick={busy ? null : addEducationFactory(edu.id)} key={edu.id}>
        <Education {...edu} />
      </div>
    ))
  );
};

const EmploymentHistoryChoices = ({
  employmentHistory,
  addEmploymentHistoryFactory,
  busy
}) => {
  return busy ? (
    <progress />
  ) : (
    employmentHistory.map(emp => (
      <div
        onClick={busy ? null : addEmploymentHistoryFactory(emp.id)}
        key={emp.id}
      >
        <EmploymentHistory {...emp} />
      </div>
    ))
  );
};

const ResumeContent = ({
  resume,
  removeCoverLetterHandler,
  removeEducationHandler,
  removeEmploymentHistoryHandler
}) => {
  const { id, user, name, coverLetter, education, employmentHistory } = resume;

  return resume.busy ? (
    <progress />
  ) : (
    <div>
      Content{" "}
      {coverLetter ? (
        <div onClick={resume.busy ? null : removeCoverLetterHandler(resume.id)}>
          <CoverLetter {...coverLetter} />
        </div>
      ) : (
        <p>No cover letter</p>
      )}
      {education.length > 0 ? (
        education.map(edu => (
          <div onClick={resume.busy ? null : removeEducationHandler(edu.id)}>
            <Education {...edu} />
          </div>
        ))
      ) : (
        <p>No education</p>
      )}
      {employmentHistory.length > 0 ? (
        employmentHistory.map(emp => (
          <div
            onClick={
              resume.busy ? null : removeEmploymentHistoryHandler(emp.id)
            }
          >
            <EmploymentHistory {...emp} />
          </div>
        ))
      ) : (
        <p>No employment history</p>
      )}
    </div>
  );
};

export default Resumes;
