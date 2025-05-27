const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const globals = require('globals');
const pluginReactHooks = require('eslint-plugin-react-hooks');
const pluginMdx = require('eslint-plugin-mdx');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    // 'plugin:mdx/recommended',
    'plugin:prettier/recommended'
  ),
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mjs', '**/*.mts', '**/*.mdx', '**/*.md'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'react-hooks': pluginReactHooks,
      mdx: pluginMdx
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          arrowFunctions: true
        }
      }
    },

    settings: {
      react: {
        version: 'detect'
      },
      tailwindcss: {
        rootDir: [__dirname],
        callees: ['cn', 'classnames', 'classNames', 'clsx', 'ctl', 'cva', 'tv']
      },
      'mdx/code-blocks': true
    },

    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/prop-types': 'off',
      'prettier/prettier': [
        'warn',
        {},
        {
          usePrettierrc: true,
          ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/public/**/workbox-*.{js,js.map}']
        }
      ],

      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-console': 'off',

      // js rules
      'no-undef': 'off',
      'no-unused-vars': 'off',

      // ts overrides
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off'

      // mdx
      // 'mdx/code-blocks': 'warn'

      // 'tailwindcss/no-custom-classname': 'off',
      // 'tailwindcss/classnames-order': 'off',
    }
  },
  { ignores: ['node_modules/*', '.next/', '.turbo/', '.out/', '**/build', '**/coverage', '**/*.go'] }
];

module.exports = config;
