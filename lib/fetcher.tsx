import axios from "axios";

const fetcher = async (url) => {
  const response = await axios.get(url);
  //console.log(response);
  return response.data;
};

export default fetcher;
