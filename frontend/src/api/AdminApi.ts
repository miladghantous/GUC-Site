import axios from "axios";
import { UserResponse } from "../type";

export const addAdmin = async (
  email: string,
  username: string,
  password: string
): Promise<UserResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/admin/addAdmin`,
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
