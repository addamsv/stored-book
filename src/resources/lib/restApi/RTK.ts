import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT_BASE_URL } from "resources/application";
import { getCredentials } from "../auth/getCredentials";

const baseUrl = `${__REST_API__BASE_URL__}${API_ENDPOINT_BASE_URL}`;

export const RTK = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl,

    prepareHeaders: (headers) => {
      const token = getCredentials()?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    }
  }),

  endpoints: () => ({})
});
