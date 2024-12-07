import webpack, { DefinePlugin, RuleSetRule } from "webpack";
import path from "path";
import { IPaths, cssLoader, svgLoader } from "../webpack";

export default ({ config }: {config: webpack.Configuration}): webpack.Configuration => {
  if (!config.resolve?.modules || !config.resolve?.extensions || !config.module?.rules) {
    return config;
  }

  const paths: IPaths = {
    build: "",
    html: "",
    entry: "",
    src: path.resolve(__dirname, "..", "..", "src"),
  };

  config!.resolve!.modules!.push(paths.src);
  config!.resolve!.extensions!.push(".ts", ".tsx");

  // eslint-disable-next-line no-param-reassign
  // @ts-ignore
  config!.module!.rules = config!.module!.rules!.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }

    return rule;
  });

  config!.module!.rules!.push(svgLoader());

  config!.module!.rules!.push(cssLoader(true));

  config!.plugins!.push(
    new DefinePlugin({
      __IS_DEV__: true,
      __REST_API__BASE_URL__: JSON.stringify(""),
      __PROJECT_TYPE__: JSON.stringify("storybook"),
    })
  );

  return config;
};
