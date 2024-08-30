import axios from "axios";
import { UserResponse } from "../type";

// Function to get all instructors
export const getAllInstructors = async (): Promise<UserResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/instructor/viewAllInstructors`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// Function to add a new instructor
export const addInstructor = async (
  email: string,
  username: string,
  password: string
): Promise<UserResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/instructor/addInstructor`,
    {
      email,
      username,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Ensures cookies are sent along with the request
    }
  );

  return response.data;
};
