import React from "react";

const ErrorAlerter = ({ errors, dismissHandler }) => {
  return (
    <div className="global-errors-alerter">
      <div className="header">
        <span>ERROR</span>
        <button onClick={dismissHandler}>DISMISS</button>
      </div>
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
  );
};

export default ErrorAlerter;
