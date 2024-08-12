import axios from "axios";
import { UserResponse } from "../type";

export const getAllInstructors = async (): Promise<UserResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/instructor/viewAllInstructors`
  );
  return response.data;
};

export const addInstructor = async (
  email: string,
  username: string,
  password: string
): Promise<UserResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/instructor/addInstructor`,
    { email, username, password },
    {
      headers: {
        withCredentials: true,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
