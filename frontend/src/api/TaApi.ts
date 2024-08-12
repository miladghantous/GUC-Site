import axios from "axios";
import { TaResponse } from "../type";

export const addTa = async (name: string): Promise<TaResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/ta/addTa`,
    {
      method: "POST", 
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name }), // Corrected JSON structure
    }
  );
  if (!response.ok) {
    throw new Error("Failed to add TA");
  }

  return await response.json();
};

export const getAllTas = async (): Promise<TaResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/ta/viewAllTas`
  );
  return response.data;
};

export const editTa = async (id: string, name: string): Promise<TaResponse> => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/ta/updateTa/${id}`,
    { name }
  );
  return response.data;
};

export const deleteTa = async (id: string): Promise<void> => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/api/ta/removeTa/${id}`);
};

export const checkIfExists = async (name: string): Promise<TaResponse | null> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/ta/checkIfExists`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to check if TA exists");
    }

    return await response.json();
  } catch (error) {
    console.log("ana 3nd error bta3 front");
    console.error("Error occurred while checking if TA exists:", error);
    throw new Error("An error occurred while checking if TA exists.");
  }
};
