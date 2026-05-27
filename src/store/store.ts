import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "../services/blogApi";
import { careersApi } from "../services/careersApi";
import { contactApi } from "../services/contactApi";

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [careersApi.reducerPath]: careersApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blogApi.middleware,
      careersApi.middleware,
      contactApi.middleware
    ),
});
