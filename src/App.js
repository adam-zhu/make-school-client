import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { shadows } from "./styles";
import {
  getUser,
  updateUser,
  createCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
  createEducation,
  updateEducation,
  deleteEducation,
  createEmploymentHistory,
  updateEmploymentHistory,
  deleteEmploymentHistory,
  createResume,
  deleteResume,
  updateResumeName,
  addCoverLetterToResume,
  addEducationToResume,
  addEmploymentHistoryItemToResume,
  removeCoverLetterFromResume,
  removeEducationFromResume,
  removeEmploymentHistoryItemFromResume
} from "./services";
import ErrorAlerter from "./Components/ErrorAlerter";
import Nav from "./Components/Nav";
import MobileNav from "./Components/MobileNav";
import Home from "./Pages/Home";
import CoverLetters from "./Pages/CoverLetters";
import Education from "./Pages/Education";
import EmploymentHistory from "./Pages/EmploymentHistory";
import Resumes from "./Pages/Resumes";
import Four04 from "./Pages/404";

const ROUTES = {
  HOME: {
    name: "Home",
    path: "/",
    current: window.location.pathname === "/",
    busy: false
  },
  COVER_LETTTERS: {
    name: "Cover Letters",
    path: "/cover-letters",
    current: window.location.pathname === "/cover-letters",
    busy: false
  },
  EDUCATION: {
    name: "Education",
    path: "/education",
    current: window.location.pathname === "/education",
    busy: false
  },
  EMPLOYMENT_HISTORY: {
    name: "Employment History",
    path: "/employment-history",
    current: window.location.pathname === "/employment-history",
    busy: false
  },
  RESUMES: {
    name: "Resumes",
    path: "/resumes",
    current: window.location.pathname === "/resumes",
    busy: false
  }
};

const initialState = {
  routes: Object.values(ROUTES),
  user: undefined,
  errors: []
};

function App() {
  const [STATE, setState] = useState(initialState);

  // state utils
  const handleError = error =>
    setState(state => ({ ...state, errors: state.errors.concat([error]) }));
  const nextRouterState = path =>
    STATE.routes.map(r => ({ ...r, current: r.path === path }));
  const setCurrentRouteBusy = busy =>
    setState(state => ({
      ...state,
      routes: state.routes.map(r => (r.current ? { ...r, busy } : r))
    }));
  const setItemBusy = type => id => busy =>
    setState(state => ({
      ...state,
      user: {
        ...state.user,
        [type]: state.user[type].map(_ => (_.id === id ? { ..._, busy } : _))
      }
    }));

  // all handlers
  const handlers = {
    dismissErrors: e => setState(state => ({ ...state, errors: [] })),
    navigate: path => e => {
      e.preventDefault();

      window.history.pushState(null, "", path);

      setState(state => ({
        ...state,
        routes: nextRouterState(path)
      }));
    },

    // HOME PAGE
    userFieldChange: name => e => {
      const { value } = e.target;

      setState(state => ({
        ...state,
        user: {
          ...STATE.user,
          [name]: value
        }
      }));
    },
    userSave: e => {
      e.preventDefault();
      setCurrentRouteBusy(true);

      const successCallback = updatedFields => {
        const user = {
          ...STATE.user,
          ...updatedFields
        };

        setState(state => ({ ...state, user }));
        setCurrentRouteBusy(false);
      };
      const failureCallback = error => {
        setCurrentRouteBusy(false);
        handleError(error);
      };

      updateUser(STATE.user)(successCallback, failureCallback);
    },

    // COVER LETTERS PAGE
    coverLetterFieldChangeFactory: id => name => e => {
      const { coverLetters } = STATE.user;
      const updatedCoverLetters = coverLetters.map(c =>
        c.id === id ? { ...c, [name]: e.target.value } : c
      );

      setState(state => ({
        ...state,
        user: {
          ...state.user,
          coverLetters: updatedCoverLetters
        }
      }));
    },
    coverLetterSaveFactory: coverLetter => e => {
      const updateSuccessCallback = updatedCoverLetterFields => {
        const { user } = STATE;
        const { coverLetters } = user;
        const updatedCoverLetters = coverLetters.map(c =>
          c.id === coverLetter.id
            ? { ...c, ...updatedCoverLetterFields, busy: false }
            : c
        );

        setState(state => ({
          ...state,
          user: {
            ...user,
            coverLetters: updatedCoverLetters
          }
        }));
      };
      const updateFailureCallback = error => {
        setItemBusy("coverLetters")(coverLetter.id)(false);
        handleError(error);
      };

      e.preventDefault();
      setItemBusy("coverLetters")(coverLetter.id)(true);

      return updateCoverLetter(coverLetter)(
        updateSuccessCallback,
        updateFailureCallback
      );
    },
    // our component passes us success/fail functions so it can manage local state
    coverLetterCreate: createData => (success, failure) => {
      const successCallback = created => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            coverLetters: state.user.coverLetters.concat([created])
          }
        }));

        success();
      };
      const failureCallback = error => {
        handleError(error);
        failure(error);
      };

      createCoverLetter(createData)(successCallback, failureCallback);
    },
    coverLetterDelete: id => async e => {
      const success = deletedId => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            coverLetters: state.user.coverLetters.filter(c => c.id !== id)
          }
        }));
      };
      const failure = error => {
        setItemBusy("coverLetters")(id)(false);
        handleError(error);
      };

      e.preventDefault();
      setItemBusy("coverLetters")(id)(true);
      await deleteCoverLetter(id)(success, failure);
    },

    // EDUCATION PAGE
    educationFieldChangeFactory: id => e => {
      const { education } = STATE.user;
      const { name } = e.target;
      const value = name === "graduated" ? e.target.checked : e.target.value;
      const updatedEducation = education.map(edu =>
        edu.id === id
          ? {
              ...edu,
              [name]: value
            }
          : edu
      );

      setState(state => ({
        ...state,
        user: {
          ...state.user,
          education: updatedEducation
        }
      }));
    },
    educationSaveFactory: id => e => {
      const {
        schoolName,
        graduated,
        degree,
        subject,
        lastYearAttended
      } = STATE.user.education.find(edu => edu.id === id);
      const updateSuccessCallback = updatedFields => {
        const { user } = STATE;
        const { education } = user;
        const updatedEducation = education.map(edu =>
          edu.id === id ? { ...edu, ...updatedFields, busy: false } : edu
        );

        setState(state => ({
          ...state,
          user: {
            ...user,
            education: updatedEducation
          }
        }));
      };
      const updateFailureCallback = error => {
        setItemBusy("education")(id)(false);
        handleError(error);
      };

      e.preventDefault();
      setItemBusy("education")(id)(true);

      return updateEducation({
        id,
        schoolName,
        graduated,
        degree,
        subject,
        lastYearAttended
      })(updateSuccessCallback, updateFailureCallback);
    },
    // our component passes us success/fail functions so it can manage local state
    educationCreate: createData => (success, failure) => {
      const successCallback = created => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            education: state.user.education.concat([created])
          }
        }));

        success();
      };
      const failureCallback = error => {
        handleError(error);
        failure(error);
      };

      createEducation(createData)(successCallback, failureCallback);
    },
    educationDelete: id => async e => {
      const success = deletedId => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            education: state.user.education.filter(edu => edu.id !== id)
          }
        }));
      };
      const failure = error => {
        setItemBusy("education")(id)(false);
        handleError(error);
      };

      e.preventDefault();
      setItemBusy("education")(id)(true);
      await deleteEducation(id)(success, failure);
    },

    // EMPLOYMENT HISTORY PAGE
    employmentHistoryFieldChangeFactory: id => e => {
      const { employmentHistory } = STATE.user;
      const { name, value } = e.target;
      const updatedEmploymentHistory = employmentHistory.map(emp =>
        emp.id === id
          ? {
              ...emp,
              [name]: value
            }
          : emp
      );

      setState(state => ({
        ...state,
        user: {
          ...state.user,
          employmentHistory: updatedEmploymentHistory
        }
      }));
    },
    employmentHistorySaveFactory: id => e => {
      const {
        employerName,
        startDate,
        endDate,
        label,
        description
      } = STATE.user.employmentHistory.find(emp => emp.id === id);
      const updateSuccessCallback = updatedFields => {
        const { user } = STATE;
        const { employmentHistory } = user;
        const updatedEmploymentHistory = employmentHistory.map(emp =>
          emp.id === id ? { ...emp, ...updatedFields, busy: false } : emp
        );

        setState(state => ({
          ...state,
          user: {
            ...user,
            employmentHistory: updatedEmploymentHistory
          }
        }));
      };
      const updateFailureCallback = error => {
        setItemBusy("employmentHistory")(id)(false);
        handleError(error);
      };

      e.preventDefault();
      setItemBusy("employmentHistory")(id)(true);

      return updateEmploymentHistory({
        id,
        employerName,
        startDate,
        endDate,
        label,
        description
      })(updateSuccessCallback, updateFailureCallback);
    },
    // our component passes us success/fail functions so it can manage local state
    employmentHistoryCreate: createData => (success, failure) => {
      const successCallback = created => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            employmentHistory: state.user.employmentHistory.concat([created])
          }
        }));

        success();
      };
      const failureCallback = error => {
        handleError(error);
        failure(error);
      };

      createEmploymentHistory(createData)(successCallback, failureCallback);
    },
    employmentHistoryDelete: id => async e => {
      const success = deletedId => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            employmentHistory: state.user.employmentHistory.filter(
              emp => emp.id !== id
            )
          }
        }));
      };
      const failure = error => {
        setItemBusy("employmentHistory")(id)(false);
        handleError(error);
      };

      e.preventDefault();
      setItemBusy("employmentHistory")(id)(true);
      await deleteEmploymentHistory(id)(success, failure);
    },

    // RESUME PAGE
    // our component passes us success/fail functions so it can manage local state
    resumeCreate: createData => (success, failure) => {
      const successCallback = created => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            resumes: state.user.resumes.concat([created])
          }
        }));

        success();
      };
      const failureCallback = error => {
        handleError(error);
        failure(error);
      };

      createResume(createData)(successCallback, failureCallback);
    },
    resumeDelete: id => async e => {
      const success = deletedId => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            resumes: state.user.resumes.filter(r => r.id !== id)
          }
        }));
      };
      const failure = error => {
        setItemBusy("resumes")(id)(false);
        handleError(error);
      };

      e.preventDefault();
      setItemBusy("resumes")(id)(true);
      await deleteResume(id)(success, failure);
    },
    resumeNameChangeFactory: id => e => {
      const { user } = STATE;
      const { resumes } = user;
      const { value } = e.target;
      const updatedResumes = resumes.map(r =>
        r.id === id ? { ...r, name: value } : r
      );
      const updatedUser = {
        ...user,
        resumes: updatedResumes
      };

      setState(state => ({
        ...state,
        user: updatedUser
      }));
    },
    resumeNameSubmitFactory: id => e => {
      const { user } = STATE;
      const { resumes } = user;
      const { name } = resumes.find(r => r.id === id);
      const success = updatedResume => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            resumes: state.user.resumes.map(r =>
              r.id === id ? { ...r, ...updatedResume, busy: false } : r
            )
          }
        }));
      };
      const failure = e => {
        handleError(e);
        setItemBusy("resumes")(id)(false);
      };

      e.preventDefault();
      setItemBusy("resumes")(id)(true);
      updateResumeName({ id, name })(success, failure);
    },
    resumeEditModeToggleFactory: id => e => {
      e.preventDefault();

      setState(state => ({
        ...state,
        user: {
          ...state.user,
          resumes: state.user.resumes.map(r =>
            r.id === id ? { ...r, editing: !r.editing } : r
          )
        }
      }));
    },
    addCoverLetterToResumeFactory: resumeId => coverLetterId => e => {
      const success = updatedResume => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            resumes: state.user.resumes.map(r =>
              r.id === resumeId ? { ...r, ...updatedResume, busy: false } : r
            )
          }
        }));
      };
      const failure = error => {
        setItemBusy("resumes")(resumeId)(false);
        handleError(error);
      };

      addCoverLetterToResume(resumeId)(coverLetterId)(success, failure);
    },
    addEducationToResumeFactory: resumeId => educationId => e => {
      const success = updatedResume => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            resumes: state.user.resumes.map(r =>
              r.id === resumeId ? { ...r, ...updatedResume, busy: false } : r
            )
          }
        }));
      };
      const failure = error => {
        setItemBusy("resumes")(resumeId)(false);
        handleError(error);
      };

      addEducationToResume(resumeId)(educationId)(success, failure);
    },
    addEmploymentHistoryToResumeFactory: resumeId => employmentHistoryItemId => e => {
      const success = updatedResume => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            resumes: state.user.resumes.map(r =>
              r.id === resumeId ? { ...r, ...updatedResume, busy: false } : r
            )
          }
        }));
      };
      const failure = error => {
        setItemBusy("resumes")(resumeId)(false);
        handleError(error);
      };

      addEmploymentHistoryItemToResume(resumeId)(employmentHistoryItemId)(
        success,
        failure
      );
    },
    removeCoverLetter: resumeId => e => {
      const success = updatedResume => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            resumes: state.user.resumes.map(r =>
              r.id === resumeId ? { ...r, ...updatedResume, busy: false } : r
            )
          }
        }));
      };
      const failure = error => {
        setItemBusy("resumes")(resumeId)(false);
        handleError(error);
      };

      setItemBusy("resumes")(resumeId)(true);
      removeCoverLetterFromResume(resumeId)(success, failure);
    },
    removeEducationFactory: resumeId => educationId => e => {
      const success = updatedResume => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            resumes: state.user.resumes.map(r =>
              r.id === resumeId ? { ...r, ...updatedResume, busy: false } : r
            )
          }
        }));
      };
      const failure = error => {
        setItemBusy("resumes")(resumeId)(false);
        handleError(error);
      };

      setItemBusy("resumes")(resumeId)(true);
      removeEducationFromResume(resumeId)(educationId)(success, failure);
    },
    removeEmploymentHistoryFactory: resumeId => employmentHistoryId => e => {
      const success = updatedResume => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            resumes: state.user.resumes.map(r =>
              r.id === resumeId ? { ...r, ...updatedResume, busy: false } : r
            )
          }
        }));
      };
      const failure = error => {
        setItemBusy("resumes")(resumeId)(false);
        handleError(error);
      };

      setItemBusy("resumes")(resumeId)(true);
      removeEmploymentHistoryItemFromResume(resumeId)(employmentHistoryId)(
        success,
        failure
      );
    }
  };

  // initial data fetch
  useEffect(() => {
    getUser(user => setState(state => ({ ...state, user })), handleError);
  }, []);

  const appStyles = `
    font-family: 'Roboto', sans-serif;
    min-height: 100vh;
    display: flex;
    position: relative;

    h1,h2,h3,h4,h5,h6 {
      font-weight: 500;
    }
  `;
  const navStyles = `
    box-shadow: ${shadows.dp2};
  `;
  const mobileNavStyles = `
    display: none;
  `;
  const mainStyles = `
    padding: 2rem 4rem;
  `;
  const errorAlerterStyles = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.666);

    .inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      padding: 2rem;
      background: white;
    }
  `;

  return STATE.user ? (
    <div
      className="App"
      css={css`
        ${appStyles}
      `}
    >
      <aside
        css={css`
          ${navStyles}
        `}
      >
        <Nav routes={STATE.routes} navigateHandler={handlers.navigate} />
      </aside>
      <header
        css={css`
          ${mobileNavStyles}
        `}
      >
        <MobileNav routes={STATE.routes} navigateHandler={handlers.navigate} />
      </header>
      {STATE.errors.length > 0 && (
        <div
          css={css`
            ${errorAlerterStyles}
          `}
        >
          <div className="inner">
            <ErrorAlerter
              errors={STATE.errors}
              dismissHandler={handlers.dismissErrors}
            />
          </div>
        </div>
      )}
      <main
        css={css`
          ${mainStyles}
        `}
      >
        <Router state={STATE} handlers={handlers} />
      </main>
    </div>
  ) : (
    <progress />
  );
}

const Router = ({ state, handlers }) => {
  const { routes, user } = state;
  const { path, busy } = routes.find(r => r.current);

  switch (path) {
    case ROUTES.HOME.path:
      return (
        <Home
          user={user}
          busy={busy}
          fieldChangeHandler={handlers.userFieldChange}
          saveHandler={handlers.userSave}
        />
      );
    case ROUTES.COVER_LETTTERS.path:
      return (
        <CoverLetters
          coverLetters={user.coverLetters}
          busy={busy}
          changeHandlerFactory={handlers.coverLetterFieldChangeFactory}
          saveHandlerFactory={handlers.coverLetterSaveFactory}
          createHandler={handlers.coverLetterCreate}
          deleteHandlerFactory={handlers.coverLetterDelete}
        />
      );
    case ROUTES.EDUCATION.path:
      return (
        <Education
          education={user.education}
          busy={busy}
          changeHandlerFactory={handlers.educationFieldChangeFactory}
          saveHandlerFactory={handlers.educationSaveFactory}
          createHandler={handlers.educationCreate}
          deleteHandlerFactory={handlers.educationDelete}
        />
      );
    case ROUTES.EMPLOYMENT_HISTORY.path:
      return (
        <EmploymentHistory
          employmentHistory={user.employmentHistory}
          busy={busy}
          changeHandlerFactory={handlers.employmentHistoryFieldChangeFactory}
          saveHandlerFactory={handlers.employmentHistorySaveFactory}
          createHandler={handlers.employmentHistoryCreate}
          deleteHandlerFactory={handlers.employmentHistoryDelete}
        />
      );
    case ROUTES.RESUMES.path:
      return (
        <Resumes
          user={user}
          busy={busy}
          nameChangeHandlerFactory={handlers.resumeNameChangeFactory}
          saveHandlerFactory={handlers.resumeNameSubmitFactory}
          createHandler={handlers.resumeCreate}
          deleteHandlerFactory={handlers.resumeDelete}
          editModeToggleFactory={handlers.resumeEditModeToggleFactory}
          addCoverLetterToResumeFactory={handlers.addCoverLetterToResumeFactory}
          addEducationToResumeFactory={handlers.addEducationToResumeFactory}
          addEmploymentHistoryToResumeFactory={
            handlers.addEmploymentHistoryToResumeFactory
          }
          removeCoverLetterHandler={handlers.removeCoverLetter}
          removeEducationFactory={handlers.removeEducationFactory}
          removeEmploymentHistoryFactory={
            handlers.removeEmploymentHistoryFactory
          }
        />
      );
    default:
      return <Four04 />;
  }
};

export default App;
