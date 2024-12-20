import { IStateSchema } from "app/providers/StoreProvider";

export const getTextFromSendCommentForm = (state: IStateSchema) => state.sendCommentForm?.text || "";
export const getErrorTextFromSendCommentForm = (state: IStateSchema) => state.sendCommentForm?.error;
