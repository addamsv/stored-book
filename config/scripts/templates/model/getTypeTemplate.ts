import { capitalizeFirstLetter } from "../../capitalizeFirstLetter";

export const getTypeTemplate = (name: string) => {
  return `export interface I${capitalizeFirstLetter(name)}StateSchema {}
`;
};
