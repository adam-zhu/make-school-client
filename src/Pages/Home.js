import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { formStyles } from "../styles";

const Home = ({ user, fieldChangeHandler, saveHandler, busy }) => {
  const { firstName, lastName, email, phone, location } = user;

  return (
    <form
      onSubmit={saveHandler}
      disabled={busy}
      css={css`
        ${formStyles}
      `}
    >
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={fieldChangeHandler("firstName")}
          disabled={busy}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={fieldChangeHandler("lastName")}
          disabled={busy}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={fieldChangeHandler("email")}
          disabled={busy}
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={fieldChangeHandler("phone")}
          disabled={busy}
        />
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={fieldChangeHandler("location")}
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

export default Home;
