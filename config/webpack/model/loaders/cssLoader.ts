import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function cssLoader(isDev: boolean) {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            // localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
            localIdentName: isDev
              ? "[path][name]__[local]--[hash:base64:5]"
              : "[hash:base64:8]",
          },
        },
      },
      {
        loader: "sass-loader",
        options: {
          api: "modern", // legacy | modern,
          // sassOptions: {
          //   // Your sass options
          // },
        },
      },
      // "sass-loader",
    ],
  };
}
