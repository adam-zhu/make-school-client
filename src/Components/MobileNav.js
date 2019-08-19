import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const MobileNav = ({ routes, navigateHandler }) => {
  const { drawerIsOpen, setDrawerIsOpen } = useState(false);
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
    <div>
      <button type="button" onClick={e => setDrawerIsOpen(true)}>
        <i className="material-icons">menu</i>
      </button>
    </div>
  );
};

export default MobileNav;
