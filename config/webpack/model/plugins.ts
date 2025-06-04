import HTMLWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CopyPlugin from "copy-webpack-plugin";
import { IOptions } from "../types";

export function plugins({
  paths,
  isDev,
  restBaseUrl,
  projectType,
  contactUsEmail
}: IOptions): webpack.WebpackPluginInstance[] {
  const plugins = [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),

    new webpack.ProgressPlugin(),

    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),

    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __REST_API__BASE_URL__: JSON.stringify(restBaseUrl),
      __CONTACT_US_EMAIL__: JSON.stringify(contactUsEmail),
      __PROJECT_TYPE__: JSON.stringify(projectType),
    }),

    new CopyPlugin({
      patterns: [
        { from: paths.i18localesFrom, to: paths.i18localesTo },
        { from: paths.imagesFrom, to: paths.imagesTo },
        { from: paths.faviconFrom, to: paths.faviconTo },
        { from: paths.robotTxtFrom, to: paths.robotTxtTo },
        { from: paths.sitemapFrom, to: paths.sitemapTo },
        // { from: "other", to: "public" },
      ],
    }),
  ];

  if (isDev) {
    // plugins.push(new ReactRefreshWebpackPlugin());

    // plugins.push(new webpack.HotModuleReplacementPlugin());

    plugins.push(new BundleAnalyzerPlugin({
      openAnalyzer: false
    }));

    /**
    * @link https://developers.google.com/speed/pagespeed/insights/
    * @link https://jigsaw.w3.org/css-validator/
    * @link https://validator.w3.org
    */
  }

  return plugins;
}
