import axios, {AxiosError, AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {PaginatedResult} from "../models/pagination";
import {store} from "../stores/store";
import {history} from "../..";
import {sleep} from '../common/util/helpers';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
  const token = store.commonStore.token;
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
})

axios.interceptors.response.use(async response => {
  // if (process.env.NODE_ENV === 'development') await sleep(1000);
  if (process.env.NODE_ENV === 'development') await sleep(1000);
  const pagination = response.headers['pagination'];

  if (pagination) {
    response.data = new PaginatedResult(response.data, JSON.parse(pagination));
    return response as AxiosResponse<PaginatedResult<any>>;
  }
  return response;
}, (error: AxiosError) => {
  const { status, headers } = error.response!;
  switch (status) {
    case 400:
      // if (typeof data === 'string') {
      //     toast.error(data);
      // }
      // if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
      //     history.push('/not-found');
      // }
      // if (data.errors) {
      //     const modelStateErrors = [];
      //     for (const key in data.errors) {
      //         if (data.errors[key]) {
      //             modelStateErrors.push(data.errors[key])
      //         }
      //     }
      //     throw modelStateErrors.flat();
      // }
      break;
    case 401:
      if (status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
        store.userStore.logout();
        toast.error('session expired - please login again');
      }
      break;
    case 404:
      break;
    case 500:
      // store.commonStore.setServerError(data);
      history.push('/server-error');
      break;
  }
  return Promise.reject(error);
})

export const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requester = {
  get: <T>(url: string, params?: any) => axios.get<T>(url, {params}).then(responseBody),
  post: <T>(url: string, body: {}, config?: any) => axios.post<T>(url, body, config).then(responseBody),
  put: <T>(url: string, body: {}, config?: any) => axios.put<T>(url, body, config).then(responseBody),
  del: <T>(url: string, body?: {}, config?: any) => axios.delete<T>(url, {
    data: body,
    ...config,
  }).then(responseBody),
  upload: <T>(url: string, data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return axios.post<T>(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
}

export default requester;
