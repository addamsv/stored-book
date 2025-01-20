export type Mods = Record<string, string | boolean | undefined>;
/**
 * Function helper for CSS classes
 * @param mainClass
 * @param mods - modificators
 * @param otherClasses array of classes
 * @returns string of CSS classes
 */
export const classes = (
  mainClass: string,
  mods: Mods = {},
  otherClasses: Array<string | undefined> = []
): string =>
  [
    mainClass,
    ...otherClasses.filter(Boolean),
    ...Object.entries(mods)
      .filter(([key, value]) => Boolean(value))
      .map(([key, value]) => key),
  ].join(" ");
