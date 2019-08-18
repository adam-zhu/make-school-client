const ENDPOINT = `https://lit-gorge-10355.herokuapp.com/`;
export const USER_ID = `cjzfuzlnncel90b55lhlw86xd`; // bootstrapped the data w/ a user (root node of all data types)

const gqlQuery = async ({ type, params, fields }) => {
  const query = formatQuery({ type, params, fields });
  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });
  const { data, errors } = await resp.json();

  if (errors) {
    const message = errors.reduce((acc, e) => `${acc}${e.message}\n\n`, "");

    throw new Error(message);
  }

  return data;
};

const gqlMutation = async ({ type, data, fields }) => {
  const query = formatMutation({ type, data, fields });
  console.log(query);
  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });
  const respJson = await resp.json();

  if (respJson.errors) {
    const { errors } = respJson;
    const message = errors.reduce((acc, e) => `${acc}${e.message}\n\n`, "");

    throw new Error(message);
  }

  return respJson.data;
};

const formatQuery = ({ type, params, fields }) => {
  const query = `
    query {
      ${type}(${params})
        ${fields}
    }`;

  return query;
};

const formatMutation = ({ type, data, fields }) => {
  const nameValuePairs = obj =>
    Object.entries(obj).map(([key, value]) => `${key}: "${value}"`);
  const mutation = `
    mutation {
      ${type}(${nameValuePairs(data).join(", ")})
      ${fields}
    }
  `;

  return mutation;
};

export default {
  query: gqlQuery,
  mutation: gqlMutation
};
