import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { QUIZ_URL } from "../lib/constants";

interface FetchDataResponse<T> {
  data: T | null;
  message: string | null;
  statusCode: number | null;
}

const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async <T,>(
    query: string,
    method: AxiosRequestConfig["method"],
    body: unknown = null,
    json: boolean = false
  ): Promise<FetchDataResponse<T>> => {
    const BASE_URL = QUIZ_URL;
    let data: T | null = null;
    let message: string | null = null;
    let statusCode: number | null = null;

    try {
      setLoading(true);

      const headers: Record<string, string> = {};

      if (json) {
        headers["Content-Type"] = "application/json";
      }

      const response: AxiosResponse<T> = await axios({
        method,
        url: `${BASE_URL}${query}`,
        data: body,
        headers,
      });

      data = response.data;
      statusCode = response.status;
      message = "Request successful";
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        statusCode = err.response?.status || 500;
        message =
          err.response?.data?.message ||
          "Something went wrong. Please try again.";
      } else {
        message = "An unknown error occurred.";
      }
    } finally {
      setLoading(false);
    }

    return { data, message, statusCode };
  };

  return { loading, fetchData };
};

export default useFetch;
