import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { buttonStyles } from "../styles";

const ErrorAlerter = ({ errors, dismissHandler }) => {
  return (
    <>
      <h4>ERROR</h4>
      <br />
      <div>
        {errors.map(e => (
          <details>
            {e.stack ? (
              <>
                <summary>{e.message}</summary>
                {e.stack}
              </>
            ) : (
              e.message
            )}
          </details>
        ))}
      </div>
      <br />
      <button
        onClick={dismissHandler}
        css={css`
          ${buttonStyles}
        `}
      >
        DISMISS
      </button>
    </>
  );
};

export default ErrorAlerter;
