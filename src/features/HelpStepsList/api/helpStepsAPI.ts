import { RTK } from "resources/lib/restApi/RTK";

const api = RTK.injectEndpoints({
  endpoints: (build) => ({
    getHelpStepsList: build.query({
      query: (helpSteps) => ({
        url: "/helpSteps"
      })
    })
  })
});

export const useHelpStepsList = api.useGetHelpStepsListQuery;
