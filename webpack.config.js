const path = require('path');

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, './files'),
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            // All files with a '.ts' extension will be handled by 'ts-loader'.
            { test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" },
        ],
    },
}
