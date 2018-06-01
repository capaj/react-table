import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import autoExternal from 'rollup-plugin-auto-external'

const env = process.env.NODE_ENV

const config = {
  input: 'src/index.js',
  external: ['react'],
  plugins: [
    commonjs({
      include: ['node_modules/classnames/index.js', 'node_modules/prop-types/index.js'],
    }),
    nodeResolve(),
    babel(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),

    autoExternal(),
  ],
  output: [
    {
      format: 'umd',
      file: env === 'production' ? 'react-table.min.js' : 'react-table.js',
      globals: {
        react: 'React',
      },
      name: 'ReactTable',
      exports: 'named',
    },
    { file: 'dist/react-table.es.js', format: 'es' },
  ],
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        dead_code: true,
        warnings: false,
      },
    })
  )
}

export default config
