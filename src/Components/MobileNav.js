import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { shadows } from "../styles";

const MobileNav = ({ routes, navigateHandler }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const overlayStyles = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.666);
    z-index: 8;
  `;
  const navStyles = `
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: white;
    box-shadow: ${shadows.dp4};
  `;

  return !drawerIsOpen ? (
    <div>
      <button type="button" onClick={e => setDrawerIsOpen(true)}>
        <i className="material-icons">menu</i>
      </button>
    </div>
  ) : (
    <div
      css={css`
        ${overlayStyles}
      `}
      onClick={e => setDrawerIsOpen(false)}
    >
      <div
        css={css`
          ${navStyles}
        `}
        onClick={e => e.stopPropagation()}
      >
        {routes.map(({ name, path, current }) => {
          const itemStyles = `
            display: block;
            padding: 1rem 2rem;
            color: black;
            text-decoration: ${current ? "underline" : "none"};
            :hover {
              opacity: 0.5;
            }
          `;

          return (
            <a
              key={path}
              href={path}
              onClick={e => {
                navigateHandler(path)(e);
                setDrawerIsOpen(false);
              }}
              css={css`
                ${itemStyles}
              `}
            >
              {name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
