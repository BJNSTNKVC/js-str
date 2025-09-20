import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/main.ts',
    output: [
        {
            file: 'lib/main.esm.js',
            format: 'esm',
            sourcemap: true,
        },
        {
            file: 'lib/main.umd.js',
            format: 'umd',
            name: 'Str',
            sourcemap: true,
        },
        {
            file: 'lib/main.min.js',
            format: 'umd',
            name: 'Str',
            plugins: [
                terser()
            ],
            sourcemap: true,
        },
    ],
    plugins: [
        typescript(),
        nodeResolve(),
        commonjs(),
    ],
};