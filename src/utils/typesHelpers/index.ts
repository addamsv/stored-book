import { ECollectionName } from "../../types";

export function isType<T>(t: any, val: ECollectionName): t is T {
  return t.type === val; // if ("type" in t) { t }
}

// export function isArrType<T>(t: any, val: ECollectionName): t is T {
//   return t[0].type === val;
// }

export function isArrTypeProper<T>(t: any, props: string[]): t is T {
  return !props.some((prop) => !(prop in t[0]));
}

export type TOptional<T> = {
  readonly [K in keyof T]?: T[K] | null;
}

export type TEdit<T> = {
  -readonly [K in keyof T]-?: T[K] | null;
}

export type TValueOf<T> = T[keyof T];

export type TIsArray<T> = T extends [] ? true : false;
