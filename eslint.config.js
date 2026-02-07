const { defineConfig, globalIgnores } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')
const pluginQuery = require('@tanstack/eslint-plugin-query')
const eslintPluginBetterTailwindcss = require('eslint-plugin-better-tailwindcss')
const {
  getDefaultAttributes
} = require('eslint-plugin-better-tailwindcss/defaults')

module.exports = defineConfig([
  globalIgnores(['dist', 'node_modules', '.expo']),
  expoConfig,
  eslintPluginPrettierRecommended,
  pluginQuery.configs['flat/recommended'],
  eslintPluginBetterTailwindcss.configs['recommended-error'],
  {
    rules: {
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off'
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/global.css',
        attributes: [...getDefaultAttributes(), '.*ClassName']
      }
    }
  }
])
