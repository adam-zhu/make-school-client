import React, { useState } from "react";

const CoverLetters = ({
  coverLetters,
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
      <h2>Create New Cover Letter</h2>
      <Create saveHandlerFactory={createHandler} />
      <hr />
      <h2>Cover Letters</h2>
      {coverLetters.length > 0 ? (
        coverLetters.map(c => (
          <CoverLetter
            {...c}
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
    title: "",
    subtitle: "",
    text: "",
    busy: false
  };
  const [{ title, subtitle, text, busy }, setCreateFormState] = useState(
    initialCreateFormState
  );
  const handlers = {
    title: e => {
      const { value } = e.target;

      setCreateFormState(state => ({ ...state, title: value }));
    },
    subtitle: e => {
      const { value } = e.target;

      setCreateFormState(state => ({ ...state, subtitle: value }));
    },
    text: e => {
      const { value } = e.target;

      setCreateFormState(state => ({ ...state, text: value }));
    },
    save: e => {
      const successCallback = () =>
        setCreateFormState({ ...initialCreateFormState });
      const failureCallback = () =>
        setCreateFormState(state => ({ ...state, busy: false }));

      e.preventDefault();
      setCreateFormState(state => ({ ...state, busy: true }));
      saveHandlerFactory({ title, subtitle, text })(
        successCallback,
        failureCallback
      );
    }
  };

  return (
    <form onSubmit={handlers.save} disabled={busy}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handlers.title}
          disabled={busy}
        />
      </div>
      <div>
        <label>Subtitle</label>
        <input
          type="text"
          name="subtitle"
          value={subtitle}
          onChange={handlers.subtitle}
          disabled={busy}
        />
      </div>
      <div>
        <label>Text</label>
        <textarea
          type="text"
          name="text"
          value={text}
          onChange={handlers.text}
          disabled={busy}
        />
      </div>
      <button type="submit" disabled={busy}>
        Save
      </button>
    </form>
  );
};

const CoverLetter = ({
  id,
  title,
  subtitle,
  text,
  busy,
  changeHandlerFactory,
  saveHandlerFactory,
  deleteHandlerFactory
}) => {
  return (
    <article>
      <form
        onSubmit={saveHandlerFactory({ id, title, subtitle, text })}
        disabled={busy}
      >
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={changeHandlerFactory(id)("title")}
            disbled={busy}
          />
        </div>
        <div>
          <label>Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={subtitle}
            onChange={changeHandlerFactory(id)("subtitle")}
            disbled={busy}
          />
        </div>
        <div>
          <label>Text</label>
          <textarea
            type="text"
            name="text"
            value={text}
            onChange={changeHandlerFactory(id)("text")}
            disbled={busy}
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

export default CoverLetters;
