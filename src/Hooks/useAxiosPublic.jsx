import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://run-me-quick-server.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;