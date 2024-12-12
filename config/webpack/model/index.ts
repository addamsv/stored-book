/**
 *
 *    WebPack Config Builder
 *
 */
import webpack from "webpack";
import path from "path";
import { IEnv, IOptions, IPaths } from "../types";
import { plugins } from "./plugins";
import { loaders } from "./loaders";
import { resolvers } from "./resolvers";
import { devServer } from "./devServer";
import { API_ENDPOINT_HOST, API_ENDPOINT_HOST_PORT } from "../../../src/resources/application";

export const build = (env: IEnv): webpack.Configuration => {
  const paths: IPaths = {
    entry: path.resolve(__dirname, "..", "..", "..", "src", "index.tsx"),
    build: path.resolve(__dirname, "..", "..", "..", "build"),
    html: path.resolve(__dirname, "..", "..", "..", "public", "index.html"),
    src: path.resolve(__dirname, "..", "..", "..", "src"),
  };

  const mode = env.mode || "development";
  const isDev = mode === "development";
  const port = env.port || 3000;
  const restBaseUrl = env.restBaseUrl || `${API_ENDPOINT_HOST}:${API_ENDPOINT_HOST_PORT}`;
  const projectType = "frontend";
  const options: IOptions = { paths, mode, isDev, port, restBaseUrl, projectType };

  // const config: webpack.Configuration = build(options);

  return {
    mode,

    entry: paths.entry,

    output: {
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true,
      publicPath: "/"
    },

    plugins: plugins(options),

    module: { rules: loaders(options) },

    resolve: resolvers(options),

    devtool: isDev ? "inline-source-map" : undefined,

    devServer: isDev ? devServer(options) : undefined,
  };
};
