import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { environment } from '../environments';

const http = axios.create({
  baseURL: '',
});

http.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && request.headers) {
    request.headers.Authorization = 'Bearer ' + token;
  }
  return request;
});

// http.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       localStorage.clear();
//       window.location.href = '/';
//     }
//     return Promise.reject(error);
//   }
// );

export const fetchGetRequest = (endpoint: string, extraConfig: Partial<AxiosRequestConfig> = {}): Promise<any> => {
  return http.get(endpoint, { ...extraConfig }).catch((error: any) => {
    return Promise.reject(error.response);
  });
};

export const fetchPostRequest = (
  endpoint: string,
  payload: Record<string, any> = {},
  extraConfig: Partial<AxiosRequestConfig> = {}
): Promise<any> => {
  return http.post(endpoint, payload, { ...extraConfig }).catch((error: any) => {
    return Promise.reject(error.response);
  });
};

export const fetchMultipartPostRequest = (
  endpoint: string,
  payload: Record<string, any> = {},
  extraConfig: Partial<AxiosRequestConfig> = {}
): Promise<any> => {
  return http
    .post(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...extraConfig,
    })
    .catch((error: any) => {
      return Promise.reject(error.response);
    });
};

export const fetchPutRequest = (
  endpoint: string,
  payload: Record<string, any> = {},
  extraConfig: Partial<AxiosRequestConfig> = {}
): Promise<any> => {
  return http.put(endpoint, payload, { ...extraConfig }).catch((error: any) => {
    return Promise.reject(error.response);
  });
};

export const fetchMultipartPutRequest = async (
  endpoint: string,
  payload: Record<string, any> = {},
  extraConfig: Partial<AxiosRequestConfig> = {}
): Promise<any> => {
  try {
    return await http.put(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...extraConfig,
    });
  } catch (error: any) {
    return error.response;
  }
};

export const fetchPatchRequest = (
  endpoint: string,
  payload: Record<string, any> = {},
  extraConfig: Partial<AxiosRequestConfig> = {}
): Promise<any> => {
  return http.patch(endpoint, payload, { ...extraConfig }).catch((error: any) => {
    return Promise.reject(error.response);
  });
};

export const fetchMultipartPatchRequest = async (
  endpoint: string,
  payload: Record<string, any> = {},
  extraConfig: Partial<AxiosRequestConfig> = {}
): Promise<any> => {
  try {
    return await http.patch(endpoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...extraConfig,
    });
  } catch (error: any) {
    return error.response;
  }
};

export const fetchDeleteRequest = (endpoint: string, extraConfig: Partial<AxiosRequestConfig> = {}): Promise<any> => {
  return http.delete(endpoint, { ...extraConfig }).catch((error: any) => {
    return Promise.reject(error.response);
  });
};
