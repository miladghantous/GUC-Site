import axios from "axios";
import { InstructorResponse } from "../type";

export const getAllInstructors = async (): Promise<
  InstructorResponse[]
> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/instructor/viewAllInstructors`
  );
  return response.data;
};