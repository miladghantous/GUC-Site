import axios from "axios";
import { UserResponse } from "../type";

// Function to get all instructors
export const getAllInstructors = async (): Promise<UserResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/instructor/viewAllInstructors`,{
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
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/instructor/addInstructor`,
    {
      method: "POST", // Moved `method` out of `headers`
      credentials: "include", // Ensures cookies are sent along with the request
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }), // Corrected JSON structure
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add instructor");
  }

  return await response.json();
};
