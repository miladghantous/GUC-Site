import { Dayjs } from "dayjs";

export type AnnouncementResponse = {
  _id: string;
  title: string;
  details: string;
  createdAt: Date;
};
// Title, link, desc, deadline
export type FundResponse = {
  _id: string;
  title: string;
  link: string;
  description: string;
  deadline: Dayjs | null;
};

//Title, link
export type ConferenceResponse = {
  _id: string;
  title: string;
  link: string;
  deadline: Dayjs | null;
};

//Subject, Link
export type FileLinkResponse = {
  _id: string;
  subject: string;
  link: string;
};

export type QuestionAnswerResponse = {
  _id: string;
  questionText: string;
  questionType: "Text" | "Rating" | "Multiple Choice" | "Checkbox";
  options: string[];
};

export type UserResponse = {
  _id: string;
  username: string;
  email: string;
  password: string;
};

export type TaResponse = {
  name: string;
};

export type EvaluationFormResponse = {
  _id: string;
  evaluator: UserResponse; // Assuming UserResponse corresponds to the instructor's information
  evaluatedTA: TaResponse; // Assuming UserResponse corresponds to the TA's information
  semester: string;
  course: string;
  questions: QuestionAnswerResponse[]; // Array of QuestionAnswerResponse objects
  answers: {
    questionId: string; // Reference to QuestionAnswer _id
    answer: any; // The answer field, which can be of various types
  }[];
};

export enum Status {
  Pending = "Pending",
  Resolved = "Resolved",
}

export type ComplaintResponse = {
  _id: string;
  title: string;
  details: string;
  createdAt: Date;
  status: Status;
  reply: string;
  // user: string
};
