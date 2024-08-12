import { UserResponse } from "../type";

export const addAdmin = async (
  email: string,
  username: string,
  password: string
): Promise<UserResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/admin/addAdmin`,
    {
      method: "POST", 
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }), // Corrected JSON structure
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add admin");
  }

  return await response.json();
};
