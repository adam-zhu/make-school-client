export const shadows = {
  dp1: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`,
  dp2: `0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)`,
  dp4: `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)`,
  dp6: `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)`,
  dp8: `0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)`
};

export const labelStyles = `
  display: block;
  margin-bottom: 0.25rem;
  color: dimgray;
  font-size: 0.666em;
`;

export const inputStyles = `
  background: transparent;
  padding: 0.25rem;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid silver;
  width: calc(100% - 0.5rem);

  &:active {
    border-bottom: 1px solid gray;
  }

  &[disabled] {
    background: whitesmoke;
    color: gray;
    cursor: not-allowed;
    border-color: transparent;
  }
`;

export const textareaStyles = `
  background: transparent;
  padding: 0.5rem;
  font-size: 0.75rem;
  line-height: 1.4;
  border: 1px solid silver;
  width: calc(100% - 1rem);
  min-height: 8rem;

  &:active {
    border-color: gray;
  }

  &[disabled] {
    background: whitesmoke;
    color: gray;
    cursor: not-allowed;
    border-color: transparent;
  }
`;

export const buttonStyles = `
  padding: 0.5rem 1rem;
  border: none;
  box-shadow: ${shadows.dp1};
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    box-shadow: ${shadows.dp4};
  }

  &:active {
    opacity: 0.5;
    box-shadow: none;
  }

  &[disabled] {
    background: gainsboro;
    color: gray;
    cursor: not-allowed;
    box-shadow: none;

    &:hover {
      box-shadow: none;
    }
  }
`;

export const formFieldStyles = `
  margin-bottom: 1rem;
  label { ${labelStyles} }
  input { ${inputStyles} }
  textarea { ${textareaStyles} }
`;

export const formStyles = `
  width: 100%;
  div { ${formFieldStyles} }
  button { ${buttonStyles} }
`;
