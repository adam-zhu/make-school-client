import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Nav = ({ routes, navigateHandler }) => {
  const renderNavItem = ({ name, path, current }) => {
    const itemStyles = `
      display: block;
      padding: 1rem 2rem;
      color: black;
      text-decoration: ${current ? "underline" : "none"};
      :hover {
        background: ghostwhite;
      }
    `;
    return (
      <a
        key={path}
        href={path}
        css={css`
          ${itemStyles}
        `}
        onClick={navigateHandler(path)}
      >
        {name}
      </a>
    );
  };

  return <nav>{routes.map(renderNavItem)}</nav>;
};

export default Nav;
