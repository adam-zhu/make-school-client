import React from "react";

const Home = ({ user, fieldChangeHandler, saveHandler, busy }) => {
  if (busy) {
    return <progress />;
  }

  const { firstName, lastName, email, phone, location } = user;

  return (
    <form onSubmit={saveHandler}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={fieldChangeHandler("firstName")}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={fieldChangeHandler("lastName")}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={fieldChangeHandler("email")}
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={fieldChangeHandler("phone")}
        />
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={fieldChangeHandler("location")}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default Home;
