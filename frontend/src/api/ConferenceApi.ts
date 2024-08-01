import axios from "axios";
import { ConferenceResponse } from "../type";
var port = "http://localhost:4000/api/conference";


export const getAllConferences = async (): Promise<
  ConferenceResponse[]
> => {
  const response = await axios.get(
    `${port}/viewAllConferences`
  );
  return response.data;
};

export const createConference = async (
  title: string,
  link: string
): Promise<ConferenceResponse> => {
  const response = await axios.post(
    `${port}/addConference`,
    { title, link },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const editConference = async (
  id: string,
  title: string,
  link: string
): Promise<ConferenceResponse> => {
  const response = await axios.patch(
    `${port}/updateConference/${id}`,
    { title, link }
  );
  return response.data;
};

export const deleteConference = async (id: string): Promise<void> => {
  await axios.delete(
    `${port}/removeConference/${id}`
  );
};
