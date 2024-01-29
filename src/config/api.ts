import axios, { AxiosInstance } from "axios";

const createAPI = async (): Promise<AxiosInstance> => {
  const instance = axios.create({
    baseURL: "http://localhost:8080/",
  });

  return instance;
};

export default createAPI;
