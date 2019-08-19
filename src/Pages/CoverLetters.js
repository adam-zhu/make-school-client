import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { shadows, formStyles } from "../styles";

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
      <br />
      <Create saveHandlerFactory={createHandler} />
      <br />
      <hr />
      <br />
      <h2>Cover Letters</h2>
      <br />
      <div>
        {coverLetters.length > 0 ? (
          coverLetters.map(c => (
            <>
              <CoverLetter
                key={c.id}
                {...c}
                changeHandlerFactory={changeHandlerFactory}
                saveHandlerFactory={saveHandlerFactory}
                deleteHandlerFactory={deleteHandlerFactory}
              />
              <br />
            </>
          ))
        ) : (
          <p>none</p>
        )}
      </div>
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
    <form
      onSubmit={handlers.save}
      disabled={busy}
      css={css`
        ${formStyles}
      `}
    >
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
      <br />
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
  const articleStyles = `
    padding: 1rem;
    box-shadow: ${shadows.dp1};
  `;

  return (
    <article
      css={css`
        ${articleStyles}
      `}
    >
      <form
        onSubmit={saveHandlerFactory({ id, title, subtitle, text })}
        disabled={busy}
        css={css`
          ${formStyles}
        `}
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
        <button
          type="submit"
          disabled={busy}
          onClick={deleteHandlerFactory(id)}
          css={css`
            float: right;
          `}
        >
          Delete
        </button>
      </form>
    </article>
  );
};

export default CoverLetters;
