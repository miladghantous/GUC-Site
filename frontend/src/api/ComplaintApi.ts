import axios from "axios";
import { ComplaintResponse } from "../type";

export const getAllComplaints = async (): Promise<ComplaintResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/complaint/viewAllComplaints`
  );
  return response.data;
};

export const createComplaint = async (
  title: string,
  details: string
): Promise<ComplaintResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/complaint/addComplaint`,
    { title, details },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const editComplaint = async (
  id: string,
  title: string,
  details: string
): Promise<ComplaintResponse> => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/complaint/updateComplaint/${id}`,
    { title, details },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const deleteComplaint = async (id: string): Promise<void> => {
  await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/complaint/removeComplaint/${id}`
  );
};

export const changeStatus = async (
  id: string,
  status: string
): Promise<ComplaintResponse> => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/complaint/changeStatus/${id}`,
    { status },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const editReply = async (
  id: string,
  reply: string
): Promise<ComplaintResponse> => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/complaint/editReply/${id}`,
    { reply },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const getUserComplaints = async (): Promise<ComplaintResponse[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/complaint/getUserComplaints`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch complaints");
    }
  } catch (error) {
    console.log("complaint API error: "+ error);
    
    console.error("Error fetching complaints:", error);
    throw error;
  }
};
