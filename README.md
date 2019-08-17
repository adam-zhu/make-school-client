This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# GQL SCHEMA
```
type Query {
  user(id: ID!): User
  resume(id: ID!): Resume
  coverLettersByUserId(id: ID!): [CoverLetter!]!
  educationByUserId(id: ID!): Education
  employmentHistoryItemsByUserId(id: ID!): [EmploymentHistoryItem!]!
  resumesByUserId(id: ID!): [Resume!]!
}

type Mutation {
  createUser(firstName: String!, lastName: String!, email: String!, phone: String, location: String!): User
  createCoverLetter(userId: ID!, title: String, subtitle: String text: String!): CoverLetter
  createEducation(userId: ID!, schoolName: String!, graduated: Boolean!, degree: String, Subject: String!, lastYearAttended: String!): Education
  createEmploymentHistoryItem(userId: ID!, employerName: String!, startDate: String!, endDate: String, label: String!, description: String): EmploymentHistoryItem
  createResume(userId: ID!, name: String!): Resume
  updateUser(id: ID!, firstName: String!, lastName: String!, email: String!, phone: String, location: String!): User
  updateEducation(id: ID!, schoolName: String!, graduated: Boolean!, degree: String, Subject: String!, lastYearAttended: String!): Education
  updateCoverLetter(id: ID!, title: String, subtitle: String text: String!): CoverLetter
  updateEmploymentHistoryItem(id: ID!, employerName: String!, startDate: String!, endDate: String, label: String!, description: String): EmploymentHistoryItem
  updateResumeName(id: ID!, name: String!): Resume
  deleteUser(id: ID!): User
  deleteEducation(id: ID!): Education
  deleteCoverLetter(id: ID!): CoverLetter
  deleteEmploymentHistoryItem(id: ID!): EmploymentHistoryItem
  deleteResume(id: ID!): Resume
  addCoverLetterToResume(resumeId: ID!, coverLetterId: ID!): Resume
  addEducationToResume(resumeId: ID!, educationId: ID!): Resume
  addEmploymentHistoryItemToResume(resumeId: ID!, employmentHistoryItemId: ID!): Resume
  removeCoverLetterFromResume(coverLetterId: ID!, resumeId: ID!): Resume
  removeEducationFromResume(educationId: ID!, resumeId: ID!): Resume
  removeEmploymentHistoryItemFromResume(employmentHistoryItemId: ID!, resumeId: ID!): Resume
}

type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  phone: String
  location: String!
  education: [Education!]
  coverLetters: [CoverLetter!]
  employmentHistory: [EmploymentHistoryItem!]
  resumes: [Resume!]
}

type Education {
  id: ID!
  user: User!
  resumes: [Resume!]
  schoolName: String!
  graduated: Boolean!
  degree: String
  subject: String!
  lastYearAttended: String!
}

type CoverLetter {
  id: ID!
  user: User!
  resumes: [Resume!]
  title: String
  subtitle: String
  text: String!
}

type EmploymentHistoryItem {
  id: ID!
  user: User!
  resumes: [Resume!]
  employerName: String!
  startDate: String!
  endDate: String
  label: String!
  description: String!
}

type Resume {
  id: ID!
  user: User!
  name: String!
  coverLetter: CoverLetter
  education: [Education!]
  employmentHistory: [EmploymentHistoryItem!]
}
```