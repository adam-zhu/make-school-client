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
        user {
          firstName
          lastName
          email
          phone
          location
        }
        coverLetter {
          id
          title
          subtitle
          text
        }
        education {
          id
          schoolName
          graduated
          degree
          subject
          lastYearAttended
        }
        employmentHistory {
          id
          employerName
          startDate
          endDate
          label
          description
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

export const updateUser = ({
  id,
  firstName,
  lastName,
  email,
  phone,
  location
}) => async (resolve, reject) => {
  const type = `updateUser`;
  const fields = `{
    id
    firstName
    lastName
    email
    phone
    location
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: { id, firstName, lastName, email, phone, location },
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

export const createResume = resume => async (resolve, reject) => {
  const type = `createResume`;
  const userId = USER_ID;
  const fields = `{
    id
    name
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: { ...resume, userId },
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const deleteResume = id => async (resolve, reject) => {
  const type = `deleteResume`;
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

export const updateResumeName = data => async (resolve, reject) => {
  const type = `updateResumeName`;
  const fields = `{
    id
    name
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data,
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const addCoverLetterToResume = resumeId => coverLetterId => async (
  resolve,
  reject
) => {
  const type = `addCoverLetterToResume`;
  const fields = `{
    id
    name
    coverLetter {
      id
      title
      subtitle
      text
    }
    education {
      id
      schoolName
      graduated
      degree
      subject
      lastYearAttended
    }
    employmentHistory {
      id
      employerName
      startDate
      endDate
      label
      description
    }
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: { resumeId, coverLetterId },
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const addEducationToResume = resumeId => educationId => async (
  resolve,
  reject
) => {
  const type = `addEducationToResume`;
  const fields = `{
    id
    name
    coverLetter {
      id
      title
      subtitle
      text
    }
    education {
      id
      schoolName
      graduated
      degree
      subject
      lastYearAttended
    }
    employmentHistory {
      id
      employerName
      startDate
      endDate
      label
      description
    }
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: { resumeId, educationId },
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const addEmploymentHistoryItemToResume = resumeId => employmentHistoryItemId => async (
  resolve,
  reject
) => {
  const type = `addEmploymentHistoryItemToResume`;
  const fields = `{
    id
    name
    coverLetter {
      id
      title
      subtitle
      text
    }
    education {
      id
      schoolName
      graduated
      degree
      subject
      lastYearAttended
    }
    employmentHistory {
      id
      employerName
      startDate
      endDate
      label
      description
    }
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: { resumeId, employmentHistoryItemId },
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const removeCoverLetterFromResume = resumeId => async (
  resolve,
  reject
) => {
  const type = `removeCoverLetterFromResume`;
  const fields = `{
    id
    name
    coverLetter {
      id
      title
      subtitle
      text
    }
    education {
      id
      schoolName
      graduated
      degree
      subject
      lastYearAttended
    }
    employmentHistory {
      id
      employerName
      startDate
      endDate
      label
      description
    }
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: { resumeId },
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const removeEducationFromResume = resumeId => educationId => async (
  resolve,
  reject
) => {
  const type = `removeEducationFromResume`;
  const fields = `{
    id
    name
    coverLetter {
      id
      title
      subtitle
      text
    }
    education {
      id
      schoolName
      graduated
      degree
      subject
      lastYearAttended
    }
    employmentHistory {
      id
      employerName
      startDate
      endDate
      label
      description
    }
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: { resumeId, educationId },
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};

export const removeEmploymentHistoryItemFromResume = resumeId => employmentHistoryItemId => async (
  resolve,
  reject
) => {
  const type = `removeEmploymentHistoryItemFromResume`;
  const fields = `{
    id
    name
    coverLetter {
      id
      title
      subtitle
      text
    }
    education {
      id
      schoolName
      graduated
      degree
      subject
      lastYearAttended
    }
    employmentHistory {
      id
      employerName
      startDate
      endDate
      label
      description
    }
  }`;

  try {
    const respData = await gqlClient.mutation({
      type,
      data: { resumeId, employmentHistoryItemId },
      fields
    });

    resolve(respData[type]);
  } catch (e) {
    reject(e);
  }
};
