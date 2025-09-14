import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default [
    {
        input: 'index.js',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**',
                extensions: ['.js', '.jsx'],
                presets: ['@babel/preset-react'],
            }),
            resolve({
                browser: true,
                preferBuiltins: false,
            }),
            commonjs(),
            postcss({
                extract: 'styles.css',
                minimize: true,
            }),
            terser(),
        ],
        external: (id) => {
            return ['react', 'react-dom', '@hebcal/core', 'react-icons/io5', 'react-icons/fa'].some(dep =>
                id === dep || id.startsWith(dep + '/')
            );
        },
    },
    {
        input: 'index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts()],
    },
];
