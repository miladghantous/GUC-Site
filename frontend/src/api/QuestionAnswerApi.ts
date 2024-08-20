import axios from "axios";
import { QuestionAnswerResponse } from "../type";

export const getAllQuestionAnswers = async (): Promise<
  QuestionAnswerResponse[]
> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/questionanswer/viewAllQuestionAnswers`
  );
  return response.data;
};

export const createQuestionAnswer = async (
  questionText: string,
  questionType: "Text" | "Rating" | "Multiple Choice" | "Checkbox",
  options: string[]
): Promise<QuestionAnswerResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/questionanswer/addQuestionAnswer`,
    { questionText, questionType, options },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
