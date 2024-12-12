import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkConf } from "app/providers/StoreProvider";
import { getCredentials } from "shared/lib/auth/getCredentials";
import { IArticle } from "../../types";

interface IFetchArticleByIdProps {
  articleId: number;
}

interface ICustomReturnedData {
  isSuccess: boolean;
  message: string;
  data: IArticle;
}

export const fetchArticleById = createAsyncThunk<
  IArticle, IFetchArticleByIdProps, IThunkConf<string>
>(
  "articleDetails/fetchArticleById",
  async ({ articleId }, thunkAPI) => {
    const { extra, dispatch, rejectWithValue, } = thunkAPI;

    try {
      const response = await extra.axios.get<ICustomReturnedData>(
        `/articles/${articleId}`,
        { headers: { Authorization: `Bearer ${getCredentials()?.token || ""}` } }
      );

      if (!response.data) {
        return rejectWithValue("ошибка");
      }

      if (response.data.isSuccess === false) {
        return rejectWithValue(`${response.data.message}`);
      }

      // dispatch(profileActions.setProfileData(response.data.data));

      // extra.navigate("/");

      return response.data.data;
    } catch (e) {
      return rejectWithValue("ошибка");
    }
  }
);
