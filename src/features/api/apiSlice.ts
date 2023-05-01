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
      }),
      register: builder.mutation({
        query: user => ({
          url: '/register',
          method: 'POST',
          body: user
        })
      }),
      addRecipe: builder.mutation({
        query: (userId, recipe) => ({
          url: `/users/${userId}/recipes`,
          method: 'POST',
          body: recipe
        })
      }),
      getUser: builder.query({
        query: userId => `/users/${userId}`
      }),
      getUserRecipes: builder.query({
        query: userId => `/users/${userId}/recipes`
      })
    })
});

export const {
  useLogInMutation,
  useRegisterMutation,
  useAddRecipeMutation,
  useGetUserQuery,
  useGetUserRecipesQuery
} = apiSlice;