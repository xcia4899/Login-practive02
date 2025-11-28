import axios from "axios";
import Cookies from 'js-cookie'
const http = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 5000,
});

//發送攔截器
http.interceptors.request.use(
  config => {
    let token = Cookies.get('token');
    if(token){
      config.headers = config.headers || {};
      config.headers.Authorization =token
    }
    return config   ;
  },
  err => {
    return Promise.reject(err);
  }
);
//回應攔截器
http.interceptors.response.use(
  result => {
    return result.data;
  },
  err => {
    return Promise.reject(err);
  }
);

export default http