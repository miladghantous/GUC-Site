import axios from "axios";
import { FileLinkResponse } from "../type";


export const getAllFileLinks = async (): Promise<
  FileLinkResponse[]
> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/filelink/viewAllFileLinks`
  );
  return response.data;
};

export const createFileLink = async (
  subject: string,
  link: string
): Promise<FileLinkResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/filelink/addFileLink`,
    { subject, link },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const editFileLink = async (
  id: string,
  subject: string,
  link: string
): Promise<FileLinkResponse> => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/filelink/updateFileLink/${id}`,
    { subject, link }
  );
  return response.data;
};

export const deleteFileLink = async (id: string): Promise<void> => {
  await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/filelink/removeFileLink/${id}`
  );
};
