module.exports = {
    entry: "./src/DataPeps.ts",
    output: {
        library: "DataPeps",
        filename: "datapeps-sdk.js",
        path: __dirname + "/lib"
    },
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["*", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.js$/, loader: "source-map-loader", enforce: "pre" }
        ]
    }
}
