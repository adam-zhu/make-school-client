import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import CoverLetter from "../Components/CoverLetter";
import Education from "../Components/Education";

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
  removeCoverLetterHandler,
  removeEducationFactory
}) => {
  if (busy) {
    return <progress />;
  }

  const { resumes } = user;

  return (
    <div>
      <h2>Create New Resume</h2>
      <Create saveHandlerFactory={createHandler} />
      <hr />
      <h2>Resumes</h2>
      {resumes.length > 0 ? (
        resumes.map(r => (
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
            removeCoverLetterHandler={removeCoverLetterHandler}
            removeEducationFactory={removeEducationFactory}
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
    <form onSubmit={submitHandler} disabled={state.busy}>
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
  removeCoverLetterHandler,
  removeEducationFactory
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
      removeCoverLetterHandler={removeCoverLetterHandler}
      removeEducationHandler={removeEducationFactory(resume.id)}
    />
  ) : (
    <article>
      <form onSubmit={saveHandlerFactory(resume.id)} disabled={resume.busy}>
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
      </form>
      <form onSubmit={editModeToggleFactory(resume.id)} disabled={resume.busy}>
        <button type="submit" disabled={resume.busy}>
          Edit
        </button>
      </form>
      <form onSubmit={deleteHandlerFactory(resume.id)} disabled={resume.busy}>
        <button type="submit" disabled={resume.busy}>
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
  removeCoverLetterHandler,
  removeEducationHandler
}) => {
  const { coverLetters, education, employmentHistory } = user;

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
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
      </div>
      <ResumeContent
        resume={resume}
        removeCoverLetterHandler={removeCoverLetterHandler}
        removeEducationHandler={removeEducationHandler}
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

const ResumeContent = ({
  resume,
  removeCoverLetterHandler,
  removeEducationHandler,
  removeEmploymentHistoryFactory
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
    </div>
  );
};

export default Resumes;
