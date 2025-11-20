import axios from "axios";

const http = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 5000,
});

//攔截器
http.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  result => {
    return result.data;
  },
  err => {
    return Promise.reject(err);
  }
);

export default http