import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Blog } from "../types/content";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getBlogs: builder.query<Blog[], void>({
      query: () => "api/blogs/",
    }),
    getBlogDetail: builder.query<Blog, string>({
      query: (slug) => `api/blogs/${slug}/`,
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogDetailQuery } = blogApi;
