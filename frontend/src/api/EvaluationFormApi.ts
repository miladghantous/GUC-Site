import axios from "axios";
import {
  EvaluationFormResponse,
  UserResponse,
  TaResponse,
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
  evaluator: UserResponse, // Assuming UserResponse corresponds to the instructor's information
  evaluatedTA: TaResponse, // Assuming UserResponse corresponds to the TA's information
  semester: string,
  course: string,
  questions: QuestionAnswerResponse[], // Array of QuestionAnswerResponse objects
  answers: {
    questionId: string; // Reference to QuestionAnswer _id
    answer: any; // The answer field, which can be of various types
  }[]
): Promise<EvaluationFormResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/evaluationform/addEvaluationForm`,
    {
      evaluator,
      evaluatedTA,
      semester,
      course,
      questions,
      answers,
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
  evaluationFormId: string,
  questionAnswerId: string,
  answer: any, // The answer field, which can be of various types
  questionType: string
): Promise<EvaluationFormResponse> => {
  const response = await axios.patch(
    `${
      import.meta.env.VITE_API_URL
    }/api/evaluationform/updateEvaluationForm/${evaluationFormId}/answers/${questionAnswerId}`,
    { answer, questionType }
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
