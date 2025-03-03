export const getSelectors = () => {
  return `import { IStateSchema } from "resources/store/StoreProvider";

export const getTemplate = (state: IStateSchema) => state.template;
`;
};
