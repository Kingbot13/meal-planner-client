import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { Recipe } from "../../app/types";

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
      getUser: builder.query({
        query: userId => `/users/${userId}`
      }),
      getUserRecipes: builder.query<Recipe[], string>({
        query: userId => `/users/${userId}/recipes`
      }),
      getSingleRecipe: builder.query({
        query: recipe => `/users/${recipe.userId}/recipes/${recipe.recipeId}`
      })
    })
});

export const {
  useLogInMutation,
  useRegisterMutation,
  useAddRecipeMutation,
  useGetUserQuery,
  useGetUserRecipesQuery,
  useGetSingleRecipeQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation
} = apiSlice;