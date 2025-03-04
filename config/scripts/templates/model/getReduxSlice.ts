import { capitalizeFirstLetter } from "../../capitalizeFirstLetter";

// slice can be like "bookListPage"

export const getReduxSlice = (slice: string) => {
  const typeName = `I${capitalizeFirstLetter(slice)}StateSchema`;

  return `import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ${typeName} } from "../types/${slice}Schema";

const initialState: ${typeName} = {};

export const ${slice}Slice = createSlice({
  name: "${slice}",
  initialState,
  reducers: {
    setSomeState: (state, action: PayloadAction<string>) => {
      // state.someState = action.payload;
    }
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(__thunk_service__.pending, (state) => {
  //       state.error = undefined;
  //       state.isLoading = true;
  //     })
  //     .addCase(__thunk_service__.fulfilled, (state) => {
  //       state.isLoading = false;
  //     })
  //     .addCase(__thunk_service__.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     });
  // }
});

export const {
  actions: ${slice}Actions,
  reducer: ${slice}Reducer
} = ${slice}Slice;
`;
};
