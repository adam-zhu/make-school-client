import gqlClient, { USER_ID } from "./apiClient";

export const getUser = async (resolve, reject) => {
  const type = `user`;
  const params = `id: "${USER_ID}"`;
  const fields = `{
      id
      firstName
      lastName
      email
      phone
      location
      education {
        id
        schoolName
        graduated
        degree
        subject
        lastYearAttended
        resumes {
          id
          name
        }
      }
      coverLetters {
        id
        title
        subtitle
        text
        resumes {
          id
          name
        }
      }
      employmentHistory {
        id
        employerName
        startDate
        endDate
        label
        description
        resumes {
          id
          name
        }
      }
      resumes {
        id
        name
        coverLetter {
          id
        }
        education {
          id
        }
        employmentHistory {
          id
        }
      }
    }`;

  try {
    const { user } = await gqlClient.query({ type, params, fields });

    resolve(user);
  } catch (e) {
    reject(e);
  }
};

export const updateUser = user => async (resolve, reject) => {
  const type = `updateUser`;
  const params = `id: "${USER_ID}" `;
  const fields = `{
    firstName
    lastName
    email
    phone
    location
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      params,
      data: user,
      fields
    });

    resolve(respData.user);
  } catch (e) {
    reject(e);
  }
};

export const createCoverLetter = coverLetter => async (resolve, reject) => {
  const type = `createCoverLetter`;
  const userId = USER_ID;
  const fields = `{
    id
    title
    subtitle
    text
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: { ...coverLetter, userId },
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const updateCoverLetter = coverLetter => async (resolve, reject) => {
  const type = `updateCoverLetter`;
  const fields = `{
    title
    subtitle
    text
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: coverLetter,
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const deleteCoverLetter = id => async (resolve, reject) => {
  const type = `deleteCoverLetter`;
  const fields = `{
    id
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: { id },
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const createEducation = education => async (resolve, reject) => {
  const type = `createEducation`;
  const userId = USER_ID;
  const fields = `{
    id
    schoolName
    graduated
    degree
    subject
    lastYearAttended
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: { ...education, userId },
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const updateEducation = education => async (resolve, reject) => {
  const type = `updateEducation`;
  const fields = `{
    schoolName
    graduated
    degree
    subject
    lastYearAttended
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: education,
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const deleteEducation = id => async (resolve, reject) => {
  const type = `deleteEducation`;
  const fields = `{
    id
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: { id },
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const createEmploymentHistory = employmentHistory => async (
  resolve,
  reject
) => {
  const type = `createEmploymentHistoryItem`;
  const userId = USER_ID;
  const fields = `{
    id
    employerName
    startDate
    endDate
    label
    description
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: { ...employmentHistory, userId },
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const updateEmploymentHistory = employmentHistory => async (
  resolve,
  reject
) => {
  const type = `updateEmploymentHistoryItem`;
  const fields = `{
    employerName
    startDate
    endDate
    label
    description
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: employmentHistory,
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const deleteEmploymentHistory = id => async (resolve, reject) => {
  const type = `deleteEmploymentHistoryItem`;
  const fields = `{
    id
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: { id },
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};
