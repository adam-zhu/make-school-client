import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { shadows, buttonStyles, formStyles } from "../styles";
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
  const [viewingResume, setViewingResume] = useState(null);
  const { resumes } = user;
  const editingResume = resumes.find(r => r.editing);

  return viewingResume ? (
    <ViewResume
      resume={viewingResume}
      doneHandler={e => setViewingResume(null)}
    />
  ) : editingResume ? (
    <ResumeEdit
      resume={editingResume}
      user={user}
      editModeToggle={editModeToggleFactory(editingResume.id)}
      addCoverLetterFactory={addCoverLetterToResumeFactory(editingResume.id)}
      addEducationFactory={addEducationToResumeFactory(editingResume.id)}
      addEmploymentHistoryFactory={addEmploymentHistoryToResumeFactory(
        editingResume.id
      )}
      removeCoverLetterHandler={removeCoverLetterHandler}
      removeEducationHandler={removeEducationFactory(editingResume.id)}
      removeEmploymentHistoryHandler={removeEmploymentHistoryFactory(
        editingResume.id
      )}
    />
  ) : (
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
              viewHandler={e => setViewingResume(r)}
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
  removeEmploymentHistoryFactory,
  viewHandler
}) => {
  const nameChangeHandler = nameChangeHandlerFactory(resume.id);

  return (
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
        &nbsp;&nbsp;
        <button
          type="button"
          onClick={editModeToggleFactory(resume.id)}
          disabled={resume.busy}
        >
          Edit
        </button>
        &nbsp;&nbsp;
        <button type="button" onClick={viewHandler} disabled={resume.busy}>
          View
        </button>
        &nbsp;&nbsp;
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
  editModeToggle,
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
    position: relative;

    .choices,
    .content {
      width: 50%;
      padding: 1rem;
    }

    button.done {
      ${buttonStyles};
      position: absolute;
      top: 0;
      right: 0;
    }
  `;

  return (
    <div>
      <div css={styles}>
        <button className="done" type="button" onClick={editModeToggle}>
          DONE
        </button>
        <div className="choices">
          <CoverLetterChoices
            coverLetters={coverLetters}
            addCoverLetterFactory={addCoverLetterFactory}
            selected={resume.coverLetter}
            busy={resume.busy}
          />
          <br />
          <hr />
          <br />
          <EducationChoices
            education={education}
            addEducationFactory={addEducationFactory}
            selected={resume.education}
            busy={resume.busy}
          />
          <br />
          <hr />
          <br />
          <EmploymentHistoryChoices
            employmentHistory={employmentHistory}
            addEmploymentHistoryFactory={addEmploymentHistoryFactory}
            selected={resume.employmentHistory}
            busy={resume.busy}
          />
        </div>
        <div className="content">
          <ResumeContent
            resume={resume}
            removeCoverLetterHandler={removeCoverLetterHandler}
            removeEducationHandler={removeEducationHandler}
            removeEmploymentHistoryHandler={removeEmploymentHistoryHandler}
          />
        </div>
      </div>
    </div>
  );
};

const CoverLetterChoices = ({
  coverLetters,
  addCoverLetterFactory,
  selected,
  busy
}) => {
  const containerStyles = `
    display: flex;
    justify-content: space-between;
  `;
  const tileStyles = `
    padding: 0.5rem;
    margin: 0.25rem;
    box-shadow: ${shadows.dp1};
    cursor: pointer;
    font-size: 0.666rem;
    border: none;
    outline: none;
    background: none;
    text-align: left;
    line-height: 1;

    &:hover {
      box-shadow: ${shadows.dp4};
    }

    &:active {
      box-shadow: none;
      opacity: 0.5;
    }

    &:disabled {
      box-shadow: none;
      background: gainsboro;
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;

  return (
    <>
      <h2>Cover Letter Options</h2>
      <br />
      <div
        css={css`
          ${containerStyles}
        `}
      >
        {coverLetters.length > 0 ? (
          coverLetters.map(c => {
            const isDisabled =
              busy || c.busy || (selected && selected.id === c.id);

            return (
              <button
                onClick={isDisabled ? null : addCoverLetterFactory(c.id)}
                key={c.id}
                css={css`
                  ${tileStyles}
                `}
                disabled={isDisabled}
              >
                <CoverLetter {...c} />
              </button>
            );
          })
        ) : (
          <p>none</p>
        )}
      </div>
    </>
  );
};

const EducationChoices = ({
  education,
  selected,
  addEducationFactory,
  busy
}) => {
  const containerStyles = `
    display: flex;
    justify-content: space-between;
  `;
  const tileStyles = `
    padding: 0.5rem;
    margin: 0.25rem;
    box-shadow: ${shadows.dp1};
    cursor: pointer;
    font-size: 0.666rem;
    border: none;
    outline: none;
    background: none;
    text-align: left;
    line-height: 1;

    &:hover {
      box-shadow: ${shadows.dp4};
    }

    &:active {
      box-shadow: none;
      opacity: 0.5;
    }

    &:disabled {
      box-shadow: none;
      background: gainsboro;
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;

  return (
    <>
      <h2>Education Options</h2>
      <br />
      <div
        css={css`
          ${containerStyles}
        `}
      >
        {education.length > 0 ? (
          education.map(edu => {
            const isDisabled =
              busy || edu.busy || selected.find(ed => ed.id === edu.id);

            return (
              <button
                onClick={isDisabled ? null : addEducationFactory(edu.id)}
                key={edu.id}
                css={css`
                  ${tileStyles}
                `}
                disabled={isDisabled}
              >
                <Education {...edu} />
              </button>
            );
          })
        ) : (
          <p>none</p>
        )}
      </div>
    </>
  );
};

const EmploymentHistoryChoices = ({
  employmentHistory,
  selected,
  addEmploymentHistoryFactory,
  busy
}) => {
  const containerStyles = `
  `;
  const tileStyles = `
    padding: 0.5rem;
    margin: 0.25rem;
    box-shadow: ${shadows.dp1};
    cursor: pointer;
    font-size: 0.666rem;
    border: none;
    outline: none;
    background: none;
    text-align: left;
    line-height: 1;

    &:hover {
      box-shadow: ${shadows.dp4};
    }

    &:active {
      box-shadow: none;
      opacity: 0.5;
    }

    &:disabled {
      box-shadow: none;
      background: gainsboro;
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;

  return (
    <>
      <h2>Employment History Options</h2>
      <br />
      <div
        css={css`
          ${containerStyles}
        `}
      >
        {employmentHistory.length > 0 ? (
          employmentHistory.map(emp => {
            const isDisabled =
              busy || emp.busy || selected.find(em => em.id === emp.id);

            return (
              <button
                onClick={
                  isDisabled ? null : addEmploymentHistoryFactory(emp.id)
                }
                key={emp.id}
                css={css`
                  ${tileStyles}
                `}
                disabled={isDisabled}
              >
                <EmploymentHistory {...emp} />
              </button>
            );
          })
        ) : (
          <p>none</p>
        )}
      </div>
    </>
  );
};

const ResumeContent = ({
  resume,
  removeCoverLetterHandler,
  removeEducationHandler,
  removeEmploymentHistoryHandler
}) => {
  const { id, user, name, coverLetter, education, employmentHistory } = resume;
  const containerStyles = `
    font-size: 0.75rem;
    padding: 1em;
    box-shadow: ${shadows.dp1};

    h2.section-title {
      padding: 0.25em 0.5em;
      color: white;
      margin-bottom: 0.5em;
      font-size: 1.2em;

      &.education {
        background: gold;
      }

      &.employment-history {
        background: dodgerblue;
      }

      &.contact {
        background: teal;
      }
    }
  `;
  const itemStyles = `
    position: relative;

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,.666);
      opacity: 0;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }

      .text {
        color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  `;

  return (
    <>
      <h1 className="resume-name" style={{ fontSize: `1.4em` }}>
        {resume.name}
      </h1>
      <br />
      {resume.busy ? (
        <progress />
      ) : (
        <div
          css={css`
            ${containerStyles}
          `}
        >
          <br />
          {coverLetter ? (
            <div
              onClick={resume.busy ? null : removeCoverLetterHandler(resume.id)}
              css={css`
                ${itemStyles}
              `}
            >
              <div className="overlay">
                <span className="text">DELETE</span>
              </div>
              <CoverLetter {...coverLetter} />
            </div>
          ) : (
            <p className="empty-state">No cover letter</p>
          )}
          <br />
          {education.length > 0 ? (
            <div>
              <h2 className="section-title education">EDUCATION</h2>
              {education.map(edu => (
                <div
                  onClick={resume.busy ? null : removeEducationHandler(edu.id)}
                  css={css`
                    ${itemStyles}
                  `}
                >
                  <div className="overlay">
                    <span className="text">DELETE</span>
                  </div>
                  <Education {...edu} />
                  <br />
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No education</p>
          )}
          <br />
          {employmentHistory.length > 0 ? (
            <div>
              <h2 className="section-title employment-history">
                EMPLOYMENT HISTORY
              </h2>
              {employmentHistory.map(emp => (
                <div
                  onClick={
                    resume.busy ? null : removeEmploymentHistoryHandler(emp.id)
                  }
                  css={css`
                    ${itemStyles}
                  `}
                >
                  <div className="overlay">
                    <span className="text">DELETE</span>
                  </div>
                  <EmploymentHistory {...emp} />
                  <br />
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No employment history</p>
          )}
          <br />
          <h2 className="section-title contact">CONTACT</h2>
          <p>{user.email}</p>
          {user.phone && <p>{user.phone}</p>}
          <p>{user.location}</p>
        </div>
      )}
    </>
  );
};

const ViewResume = ({ resume, doneHandler }) => {
  const { id, user, name, coverLetter, education, employmentHistory } = resume;
  const containerStyles = `
    font-size: 1rem;
    padding: 1em;
    box-shadow: ${shadows.dp1};

    h2.section-title {
      padding: 0.25em 0.5em;
      color: white;
      margin-bottom: 0.5em;
      font-size: 1.2em;

      &.education {
        background: gold;
      }

      &.employment-history {
        background: dodgerblue;
      }

      &.contact {
        background: teal;
      }
    }

    @media print {
      box-shadow: none;
      padding: 0;
    }
  `;

  return (
    <>
      <button
        className="done"
        type="button"
        onClick={doneHandler}
        css={css`
          ${buttonStyles}
          @media print {
            display: none;
          }
        `}
      >
        DONE
      </button>
      <br />
      <br />
      <div
        css={css`
          ${containerStyles}
        `}
      >
        <br />
        {coverLetter ? (
          <CoverLetter {...coverLetter} />
        ) : (
          <p className="empty-state">No cover letter</p>
        )}
        <br />
        {education.length > 0 ? (
          <div>
            <h2 className="section-title education">EDUCATION</h2>
            {education.map(edu => (
              <>
                <Education {...edu} />
                <br />
              </>
            ))}
          </div>
        ) : (
          <p className="empty-state">No education</p>
        )}
        <br />
        {employmentHistory.length > 0 ? (
          <div>
            <h2 className="section-title employment-history">
              EMPLOYMENT HISTORY
            </h2>
            {employmentHistory.map(emp => (
              <>
                <EmploymentHistory {...emp} />
                <br />
              </>
            ))}
          </div>
        ) : (
          <p className="empty-state">No employment history</p>
        )}
        <br />
        <h2 className="section-title contact">CONTACT</h2>
        <p>{user.email}</p>
        {user.phone && <p>{user.phone}</p>}
        <p>{user.location}</p>
      </div>
    </>
  );
};

export default Resumes;
