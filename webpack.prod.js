import { commonConfig } from "./webpack.common.js";

import { merge } from "webpack-merge";

const webpackConfig = merge(commonConfig, {

    mode: "production"

});

export { webpackConfig };
export default webpackConfig;
