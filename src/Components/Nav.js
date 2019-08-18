import React, { useState } from "react";

const Nav = ({ routes, navigateHandler }) => {
  const renderNavItem = ({ name, path, current }) => (
    <a
      key={path}
      href={path}
      style={current ? { fontWeight: "bold" } : {}}
      onClick={navigateHandler(path)}
    >
      {name}
    </a>
  );

  return (
    <aside>
      <nav>{routes.map(renderNavItem)}</nav>
    </aside>
  );
};

export default Nav;
