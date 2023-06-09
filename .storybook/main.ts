import path from 'node:path';

import type {Configuration} from 'webpack';
import type {StorybookConfig} from '@storybook/react-webpack5';
import {cwd, isProduction} from '../webpack/config';

const styleLoader = {
    loader: 'style-loader',
    options: {attributes: {class: 'my-css-module'}},
};

const config: StorybookConfig = {
    'stories': ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
    'addons': ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
    'framework': {
        'name': '@storybook/react-webpack5',
        'options': {},
    },
    'core': {
        'builder': '@storybook/builder-webpack5',
    },
    'docs': {
        'autodocs': 'tag',
    },
    webpackFinal: async (config: Configuration): Promise<Configuration> => {
        config.module?.rules?.push(
            {
                test: /\.scss$/,
                use: [
                    styleLoader,
                    'css-modules-typescript-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                localIdentName: '[local]----[hash:6]',
                            },
                        },
                    },
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ],
            },
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: isProduction
                                ? path.join(cwd, 'tsconfig.json')
                                : path.join(cwd, 'tsconfig.dev.json'),
                            // disable type checker for building
                            // transpileOnly: true,
                        },
                    },
                ],
            }
        );

        return config;
    },
};

export default config;
