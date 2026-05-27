// src/services/contactApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL, 
    prepareHeaders: (headers) => {
      // ✅ Remove any leftover authentication headers
      headers.delete("Authorization");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    submitContact: builder.mutation({
      query: (formData) => ({
        url: "/api/contact/submit/",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useSubmitContactMutation } = contactApi;
