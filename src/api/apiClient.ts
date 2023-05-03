import qs from 'querystring';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import { removeCookie, removeCookieCandidate } from '../utils/removeCookie';
import { routerConstant } from '../constants/routerConstant';
import { TOKEN, U_CANDIDATE } from 'src/constants/settingConstant';

const baseURLApp = process.env.NEXT_PUBLIC_API;

const apiClient = axios.create({
  baseURL: baseURLApp,
  headers: {
    'content-type': 'application/json',
  },

  paramsSerializer: (params) => {
    return qs.stringify(params);
  },
});

const cookies = new Cookies();

apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    let jwt = '';
    if (window.location.pathname.includes("/candidate")) {
      jwt = cookies.get(U_CANDIDATE)
    } else {
      jwt = cookies.get(TOKEN)
    }


    if (jwt && config.headers) {
      config.headers['Authorization'] = 'Bearer ' + jwt;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (typeof window === 'undefined') {
      throw error;
    } else {

      const response = error?.response?.data;
      const statusCode = error.response.status;

      if (statusCode === 401) {
        if(window.location.pathname.includes('/hr')){
          removeCookie();
          window.location.href = routerConstant.hr.login;
        }else{
          removeCookieCandidate();
          window.history.back();
        }
       
      }
      if (statusCode === 500) {

        // window.location.href = routerConstant.page500;
        // if (response?.code === 0) {
        //   removeCookie();
        // }
      }
    }
    return Promise.reject(error);
  },
);
export default apiClient;
