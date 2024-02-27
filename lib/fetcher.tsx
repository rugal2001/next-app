import axios from "axios";

const fetcher = async (url) => {
  const response = await axios.get(url);
  //console.log(response);
  return response.data;
};

import { NextApiRequest, NextApiResponse } from "next";

const fetcher2 = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get("http://localhost:3001/lib/fetcher"); // Adjust URL as needed
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};
export default fetcher2;