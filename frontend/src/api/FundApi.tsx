import axios from "axios";
import { FundResponse } from "../type";

var port = "http://localhost:4000/api/fund";

export const getAllFunds = async (): Promise<
  FundResponse[]
> => {
  const response = await axios.get(
    `${port}/viewAllFunds`
  );
  return response.data;
};

export const createFund = async (
    //title,link,desc,deadline
  title: string,
  link: string,
  description: string,
  deadline: Date | null

): Promise<FundResponse> => {
  const response = await axios.post(
    `${port}/addFund`,
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
  id: string,
  title: string,
  link: string,
  description: string,
  deadline: Date | null
): Promise<FundResponse> => {
  const response = await axios.patch(
    `${port}/updateFund/${id}`,
    { title, link, description, deadline }
  );
  return response.data;
};

export const deleteFund = async (id: string): Promise<void> => {
  await axios.delete(
    `${port}/removeFund/${id}`
  );
};
