import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { Recipe, User } from "../../app/types";

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
      signIn: builder.mutation<{user: User, token: string}, {username: string, password: string}>({
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
        query: (recipe) => ({
          url: `/users/${recipe.userId}/recipes`,
          method: 'POST',
          body: recipe
        })
      }),
      updateRecipe: builder.mutation({
        query: recipe => ({
          url: `/users/${recipe.userId}/recipes/${recipe.recipeId}`,
          method: 'PUT',
          body: recipe
        })
      }),
      deleteRecipe: builder.mutation({
        query: recipe => ({
          url: `/users/${recipe.userId}/recipes/${recipe.recipeId}`,
          method: 'DELETE',
          body: recipe
        })
      }),
      getUser: builder.query<User, {userId: string}>({
        query: userId => `/users/${userId}`
      }),
      getSingleRecipe: builder.query({
        query: recipe => `/users/${recipe.userId}/recipes/${recipe.recipeId}`
      })
    })
});

export const {
  useSignInMutation,
  useRegisterMutation,
  useAddRecipeMutation,
  useGetUserQuery,
  useGetSingleRecipeQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation
} = apiSlice;