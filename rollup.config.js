import nodeResolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default [
  // CommonJS
  {
    input: 'src/index.ts',
    output: { file: 'lib/quill-source-code-button.js', format: 'cjs', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [typescript()],
  },

  // ES
  {
    input: 'src/index.ts',
    output: { file: 'es/quill-source-code-button.js', format: 'es', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [typescript()],
  },

  // ES for Browsers
  {
    input: 'src/index.ts',
    output: { file: 'es/quill-source-code-button.mjs', format: 'es', indent: false },
    plugins: [
      typescript(),
      nodeResolve({
        jsnext: true,
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },

  // UMD Development
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/quill-source-code-button.js',
      format: 'umd',
      name: 'PleaseLib',
      indent: false,
    },
    plugins: [
      typescript(),
      nodeResolve({
        jsnext: true,
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
  },

  // UMD Production
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/quill-source-code-button.min.js',
      format: 'umd',
      name: 'PleaseLib',
      indent: false,
    },
    plugins: [
      typescript(),
      nodeResolve({
        jsnext: true,
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },
];
