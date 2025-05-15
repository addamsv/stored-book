import { RTK } from "resources/lib/restApi/RTK";

const api = RTK.injectEndpoints({
  endpoints: (build) => ({
    getBooksRecommendationsList: build.query({
      query: (limit) => ({
        url: "/books",
        params: {
          _limit: limit,
        }
      })
    }),
    createBooksRecommendation: build.mutation({
      query: (limit) => ({
        url: "/books",
        params: {
          _limit: limit,
        },
        method: "POST",
        body: {
          f: ""
        }
      })
    })
  })
});

export const useBooksRecommendationsList = api.useGetBooksRecommendationsListQuery;
export const useCreateBooksRecommendation = api.useCreateBooksRecommendationMutation;
