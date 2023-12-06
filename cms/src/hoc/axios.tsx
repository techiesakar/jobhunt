import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4002",
});

instance.defaults.headers.common["Authorization"] =
  "Brearer " + localStorage.getItem("token");
instance.interceptors.request.use(
  async (config: any) => {
    config.headers = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    };
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
