import axios from "axios";
import httpClientReq from "./http-client-req";

const fetcher = async (url: string) => {
  try {
    const response = await httpClientReq(url);
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

export default fetcher;


// //const fetcher = async (url) => {
//   const response = await axios.get(url);
//   return response.data;
// };
