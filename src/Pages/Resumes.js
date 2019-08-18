import React, { useState } from "react";

const Resumes = ({
  user,
  busy,
  nameChangeHandlerFactory,
  saveHandlerFactory,
  createHandler,
  deleteHandlerFactory
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
            {...r}
            nameChangeHandlerFactory={nameChangeHandlerFactory}
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
  id,
  name,
  coverLetter,
  education,
  employmentHistory,
  busy,
  nameChangeHandlerFactory,
  saveHandlerFactory,
  deleteHandlerFactory
}) => {
  const nameChangeHandler = nameChangeHandlerFactory(id);

  return (
    <article>
      <form onSubmit={saveHandlerFactory(id)} disabled={busy}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={nameChangeHandler}
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

export default Resumes;
