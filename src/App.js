import React, { useEffect, useState } from "react";
import gqlClient, { USER_ID } from "./apiClient";
import ErrorAlerter from "./Components/ErrorAlerter";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
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
  const handleError = error =>
    setState(state => ({ ...state, errors: state.errors.concat([error]) }));
  const nextRouterState = path =>
    STATE.routes.map(r => ({ ...r, current: r.path === path }));
  const loadUser = async () => {
    const type = `user`;
    const params = `{ id: "${USER_ID}" }`;
    const fields = `{
      firstName
      lastName
      email
    }`;

    try {
      const { user } = await gqlClient.query({ type, params, fields });

      setState(state => ({ ...state, user }));
    } catch (e) {
      handleError(e);
    }
  };
  const handlers = {
    dismissErrors: e => setState({ errors: [] }),
    navigate: path => e => {
      e.preventDefault();

      window.history.pushState(null, "", path);

      setState(state => ({
        ...state,
        routes: nextRouterState(path)
      }));
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="App">
      <Nav routes={STATE.routes} navigateHandler={handlers.navigate} />
      {STATE.errors.length > 0 && (
        <ErrorAlerter
          errors={STATE.errors}
          dismissHandler={handlers.dismissErrors}
        />
      )}
      <Router {...STATE} />
    </div>
  );
}

const Router = state => {
  const { routes, user } = state;
  const { path, busy } = routes.find(r => r.current);

  switch (path) {
    case ROUTES.HOME.path:
      return <Home user={user} busy={busy} />;
    case ROUTES.COVER_LETTTERS.path:
    case ROUTES.EDUCATION.path:
    case ROUTES.EMPLOYMENT_HISTORY.path:
    case ROUTES.RESUMES.path:
    default:
      return <Four04 />;
  }
};

export default App;
