import React, { useEffect, useState } from "react";
import gqlClient, { USER_ID } from "./apiClient";
import ErrorAlerter from "./Components/ErrorAlerter";

const initialState = {
  user: undefined,
  errors: []
};

function App() {
  const [STATE, setState] = useState(initialState);
  const handleError = error =>
    setState(state => ({ ...state, errors: state.errors.concat([error]) }));
  const loadUser = async () => {
    const type = `user`;
    const params = `{ id: ${USER_ID} }`;
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
    dismissErrors: e => setState({ errors: [] })
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="App">
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
