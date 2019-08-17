import React from "react";

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
    <sidebar>
      <nav>{routes.map(renderNavItem)}</nav>
    </sidebar>
  );
};

export default Nav;
