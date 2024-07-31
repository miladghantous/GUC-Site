import axios from "axios";
import { AnnouncementResponse } from "../type";

export const getAllAnnouncements = async (): Promise<
  AnnouncementResponse[]
> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/announcement/viewAllAnnouncements`
  );
  return response.data;
};

export const createAnnouncement = async (
  title: string,
  details: string
): Promise<AnnouncementResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/announcement/addAnnouncement`,
    { title, details },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const editAnnouncement = async (
  id: string,
  title: string,
  details: string
): Promise<AnnouncementResponse> => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/announcement/updateAnnouncement/${id}`,
    { title, details }
  );
  return response.data;
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
  await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/announcement/removeAnnouncement/${id}`
  );
};
