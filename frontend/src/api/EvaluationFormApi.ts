import axios from "axios";
import {
  EvaluationFormResponse,
  InstructorResponse,
  QuestionAnswerResponse,
} from "../type";

export const getAllEvaluationForms = async (): Promise<
  EvaluationFormResponse[]
> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/evaluationform/viewAllEvaluationForms`
  );
  return response.data;
};

export const createEvaluationForm = async (
  title: string,
  questions: [QuestionAnswerResponse],
  instructor: InstructorResponse
): Promise<EvaluationFormResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/evaluationform/addEvaluationForm`,
    {
      title,
      questions,
      instructor,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const editEvaluationForm = async (
  id: string,
  title: string,
  instructor: InstructorResponse
): Promise<EvaluationFormResponse> => {
  const response = await axios.patch(
    `${
      import.meta.env.VITE_API_URL
    }/api/evaluationform/updateEvaluationForm/${id}`,
    { title, instructor }
  );
  return response.data;
};

export const deleteEvaluationForm = async (id: string): Promise<void> => {
  await axios.delete(
    `${
      import.meta.env.VITE_API_URL
    }/api/evaluationform/removeEvaluationForm/${id}`
  );
};

export const addQuestionAnswer = async (
  evaluationFormId: string,
  question: string,
  answer: string
): Promise<QuestionAnswerResponse> => {
  const response = await axios.post(
    `${
      import.meta.env.VITE_API_URL
    }/api/evaluationform/addQuestionAnswer/${evaluationFormId}`,
    { question, answer },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const updateQuestionAnswer = async (
  id: string,
  question: string,
  answer: string
): Promise<QuestionAnswerResponse> => {
  const response = await axios.patch(
    `${
      import.meta.env.VITE_API_URL
    }/api/evaluationform/updateQuestionAnswer/${id}`,
    { question, answer }
  );
  return response.data;
};

export const deleteQuestionAnswer = async (id: string): Promise<void> => {
  await axios.delete(
    `${
      import.meta.env.VITE_API_URL
    }/api/evaluationform/removeQuestionAnswer/${id}`
  );
};
