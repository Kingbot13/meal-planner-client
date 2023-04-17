import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "https://mealplanner.onrender.com/api",
    prepareHeaders: (headers) => {
        const storage = localStorage;
        const token = storage.getItem("token");
  
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },}),
    
    endpoints: builder => ({
      logIn: builder.mutation({
        query: user => ({
          url: '/login',
          method: 'POST',
          body: user
        })
      })
    })
});

export const {
  useLogInMutation,
} = apiSlice;