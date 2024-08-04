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
      headers: {
        "Content-Type": "application/json",
      },
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
    { title, details }
  );
  return response.data;
};

export const deleteComplaint = async (id: string): Promise<void> => {
  await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/complaint/removeComplaint/${id}`
  );
};
