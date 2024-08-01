import axios from "axios";
import { FileLinkResponse } from "../type";
var port = "http://localhost:4000/api/filelink";


export const getAllFileLinks = async (): Promise<
  FileLinkResponse[]
> => {
  const response = await axios.get(
    `${port}/viewAllFileLinks`
  );
  return response.data;
};

export const createFileLink = async (
  subject: string,
  link: string
): Promise<FileLinkResponse> => {
  const response = await axios.post(
    `${port}/addFileLink`,
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
    `${port}/updateFileLink/${id}`,
    { subject, link }
  );
  return response.data;
};

export const deleteFileLink = async (id: string): Promise<void> => {
  await axios.delete(
    `${port}/removeFileLink/${id}`
  );
};
