import React from "react";

const Home = ({ user, saveHandler, busy }) => {
  return user ? (
    <p>
      👋 {user.firstName} {user.lastName}
    </p>
  ) : (
    <progress />
  );
};

export default Home;
