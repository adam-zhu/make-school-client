import React, { useEffect, useState } from "react";
import gqlClient, { USER_ID } from "./apiClient";
import ErrorAlerter from "./Components/ErrorAlerter";
import Nav from "./Components/Nav";

const initialState = {
  routes: [
    {
      name: "Home",
      path: "/",
      current: window.location.pathname === "/"
    },
    {
      name: "Cover Letters",
      path: "/cover-letters",
      current: window.location.pathname === "/cover-letters"
    },
    {
      name: "Education",
      path: "/education",
      current: window.location.pathname === "/education"
    },
    {
      name: "Employment History",
      path: "/employment-history",
      current: window.location.pathname === "/employment-history"
    },
    {
      name: "Resumes",
      path: "/resumes",
      current: window.location.pathname === "/resumes"
    }
  ],
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
      {STATE.user ? (
        <p>
          👋 {STATE.user.firstName} {STATE.user.lastName}
        </p>
      ) : (
        <progress />
      )}
    </div>
  );
}

export default App;
