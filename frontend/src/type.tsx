import { Dayjs } from 'dayjs';

export type AnnouncementResponse = {
  _id: string;
  title: string;
  details: string;
  createdAt: Date;
}
// Title, link, desc, deadline
export type FundResponse = {
  _id: string;
  title: string;
  link: string;
  description: string;
  deadline: Dayjs |null;
}

//Title, link
export type ConferenceResponse = {
  _id: string;
  title: string;
  link: string;
  deadline: Dayjs | null;
}

//Subject, Link
export type FileLinkResponse = {
  _id: string;
  subject: string;
  link: string;
}
enum Answer{
Strongly_Agree,
 Agree,
 Neutral,
 Disagree,
 Strongly_Disagree,
}

// Question, Answer
export type QuestionAnswerResponse ={
  _id: string;
  question: string;
  answer: Answer ;
}

export type UserResponse ={
  _id: string;
  username: string;
  email: string;
  password: string;
}


export type EvaluationFormResponse = {
  title: string;
  questions?: [QuestionAnswerResponse];
  instructor: InstructorResponse;
  _id: string;

}

export type ComplaintResponse = {
  _id: string;
  title: string;
  details: string;
  createdAt: Date;
}

export type TaResponse ={
  name: string;
}