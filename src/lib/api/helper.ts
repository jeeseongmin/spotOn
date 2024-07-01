import axios from "axios";

export enum METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`;
axios.defaults.timeout = 5000;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["x-api-key"] = "";
axios.defaults.headers.common["Authorization"] = "";

export const doFetch = async (
  method: METHOD,
  path: string,
  params:
    | Record<string, unknown>
    | FormData
    | Record<string, unknown>[]
    | string
    | null,
  // options?: {
  //   headers?: Record<string, string>;
  //   isLoading?: boolean;
  //   cancelToken?: CancelToken;
  // },
  // timeout?: number,
  // noCache?: boolean,
) => {
  axios({
    method,
    url: path,
    data: params,
  }).then(res => {
    console.log("res : ", method, res);
  });
};
