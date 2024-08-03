import axios from "axios";
import { FundResponse } from "../type";
import { Dayjs } from 'dayjs';

export const getAllFunds = async (): Promise<
  FundResponse[]
> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/fund/viewAllFunds`
  );
  return response.data;
};

export const createFund = async (
    //title,link,desc,deadline
  title: string,
  link: string,
  description: string,
  deadline: Dayjs | null

): Promise<FundResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/fund/addFund`,
    { title, link, description, deadline },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const editFund = async (
  title: string,
  link: string,
  description: string,
  deadline: Dayjs | null,
  id: string,
): Promise<FundResponse> => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/fund/updateFund/${id}`,
    { title, link, description, deadline }
  );
  return response.data;
};

export const deleteFund = async (id: string): Promise<void> => {
  await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/fund/removeFund/${id}`
  );
};
