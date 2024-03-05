import axios from "axios";
import httpClientReq from "./httpClientReq";

const fetcher = (url: string) =>
  httpClientReq(url).then((response) => response.data);

export default fetcher;

// //const fetcher = async (url) => {
//   const response = await axios.get(url);
//   return response.data;
// };
