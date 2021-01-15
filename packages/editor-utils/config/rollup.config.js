const path = require('path');
const babel = require('rollup-plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const pkg = require('../package.json');

const { version } = pkg;
const extensions = ['.js', '.ts'];

const banner =
`/*!
* ${pkg.name} v${version}
* (c) ${new Date().getFullYear()} ${pkg.author.name}
* @license MIT
*/`;

const resolve = p => path.resolve(process.cwd(), p);

const config = {
  input: {
    input: resolve('./index.ts'),
    plugins: [
      nodeResolve({
        extensions,
        modulesOnly: true,
      }),
      babel({
        exclude: 'node_modules/**',
        extensions,
      }),
    ]
  },
  output: {
    file: resolve('./dist/index.js'),
    format: 'umd',
    banner: banner,
    name: pkg.name
  }
}

module.exports = config;
