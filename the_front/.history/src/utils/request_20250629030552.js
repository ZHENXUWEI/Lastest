import axios from "axios";
import { getCookie,getTokenFromCookie } from "./cookie";
const service = axios.create({
  baseURL: "http://172.19.14.40:8091",
  timeout: 5000, // request timeout
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // const info = getCookie();
    // if (info) {
    //   console.log(info);
    //   config.headers.Authorization = "Bearer " + info.token;
    // }
    const token = getTokenFromCookie();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    // console.log(1111)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
