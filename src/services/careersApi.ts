import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Career } from "../types/content";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const careersApi = createApi({
  reducerPath: "careersApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCareers: builder.query<Career[], void>({
      query: () => `api/careers/`,
    }),

    getCareerById: builder.query<Career, string | number>({
      query: (id) => `api/careers/${id}/`,
    }),

    applyForCareer: builder.mutation<unknown, { id: string | number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `api/careers/${id}/apply/`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetCareersQuery, useGetCareerByIdQuery, useApplyForCareerMutation } = careersApi;
