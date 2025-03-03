import path from "path";

export const getRootDir = (...segments: string[]) => path.resolve(__dirname, "..", "..", ...segments);
