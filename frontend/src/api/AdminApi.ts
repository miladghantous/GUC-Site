import { UserResponse } from "../type";
import axios from "axios";

export const addAdmin = async (
    email: string,
    username: string,
    password: string
  ): Promise<UserResponse> => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/addAdmin`,
      { email, username, password },
      {
        headers: {
          withCredentials: true,
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          // "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        },
      }
    );
    return response.data;
};