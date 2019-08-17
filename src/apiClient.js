const ENDPOINT = `https://us1.prisma.sh/adam-zhu-016cd2/make-school-api/development`;
export const USER_ID = `cjzfuzlnncel90b55lhlw86xd`; // bootstrapped the data w/ a user (parent of all data types)

const gqlQuery = async ({ type, params, fields }) => {
  const query = formatQuery({ type, params, fields });
  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });
  const { data } = await resp.json();

  if (data === null) {
    throw new Error(`No ${type} found  matching ${params}.`);
  }

  return data;
};

const formatQuery = ({ type, params, fields }) => {
  const query = `
    query {
      ${type}(where: ${params})
        ${fields}
    }`;

  return query;
};

export default {
  query: gqlQuery
};
