const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    const mode = argv.mode || 'production';

    return {
        mode: mode,
        stats: 'minimal',
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },

        devServer: {
            compress: true,
            allowedHosts: 'all',
            static: false,
            client: {
                logging: 'warn',
                overlay: {
                    errors: true,
                    warnings: false,
                },
                progress: true,
            },
            port: 1234,
            host: '0.0.0.0',
        },

        performance: { hints: false },

        devtool: mode === 'development' ? 'eval-source-map' : undefined,

        optimization: {
            minimize: mode === 'production',
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        ecma: 6,
                        compress: { drop_console: true },
                        output: { comments: false, beautify: false },
                    },
                }),
            ],
        },

        module: {
            rules: [
                {
                    test: /\.ts(x)?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },

        plugins: [

            new HtmlWebpackPlugin({
                template: 'index.html',
                hash: true,
                minify: false,
            }),
        ],
    };
};
