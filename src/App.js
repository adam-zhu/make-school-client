import React, { useEffect, useState } from "react";
import {
  getUser,
  updateUser,
  createCoverLetter,
  updateCoverLetter,
  deleteCoverLetter
} from "./services";
import ErrorAlerter from "./Components/ErrorAlerter";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import CoverLetters from "./Pages/CoverLetters";
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
      const setCoverLetterBusy = busy =>
        setState(state => {
          const { user } = state;
          const { coverLetters } = user;
          const updatedCoverLetters = coverLetters.map(c =>
            c.id === coverLetter.id ? { ...c, busy } : c
          );

          return {
            ...state,
            user: {
              ...user,
              coverLetters: updatedCoverLetters
            }
          };
        });
      const updateSuccessCallback = updatedCoverLetterFields => {
        const { user } = STATE;
        const { coverLetters } = user;
        const updatedCoverLetters = coverLetters.map(c =>
          c.id === coverLetter.id ? { ...c, ...updatedCoverLetterFields } : c
        );

        setState(state => ({
          ...state,
          user: {
            ...user,
            coverLetters: updatedCoverLetters
          }
        }));

        setCoverLetterBusy(false);
      };
      const updateFailureCallback = error => {
        setCoverLetterBusy(false);
        handleError(error);
      };

      e.preventDefault();
      setCoverLetterBusy(true);

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
      const setCoverLetterBusy = busy =>
        setState(state => {
          const { user } = state;
          const { coverLetters } = user;
          const updatedCoverLetters = coverLetters.map(c =>
            c.id === id ? { ...c, busy } : c
          );

          return {
            ...state,
            user: {
              ...user,
              coverLetters: updatedCoverLetters
            }
          };
        });

      const success = deletedId => {
        setState(state => ({
          ...state,
          user: {
            ...state.user,
            coverLetters: state.user.coverLetters.filter(c => c.id !== id)
          }
        }));
        setCoverLetterBusy(false);
      };
      const failure = error => {
        setCoverLetterBusy(false);
        handleError(error);
      };

      e.preventDefault();
      setCoverLetterBusy(true);
      await deleteCoverLetter(id)(success, failure);
    }
  };

  // initial data fetch
  useEffect(() => {
    getUser(user => setState(state => ({ ...state, user })), handleError);
  }, []);

  return STATE.user ? (
    <div className="App">
      <Nav routes={STATE.routes} navigateHandler={handlers.navigate} />
      {STATE.errors.length > 0 && (
        <ErrorAlerter
          errors={STATE.errors}
          dismissHandler={handlers.dismissErrors}
        />
      )}
      <Router state={STATE} handlers={handlers} />
    </div>
  ) : (
    <progress />
  );
}

const Router = ({ state, handlers }) => {
  const { routes, user } = state;
  const { path, busy } = routes.find(r => r.current);

  return (
    <main>
      {(() => {
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
          case ROUTES.EMPLOYMENT_HISTORY.path:
          case ROUTES.RESUMES.path:
          default:
            return <Four04 />;
        }
      })()}
    </main>
  );
};

export default App;
