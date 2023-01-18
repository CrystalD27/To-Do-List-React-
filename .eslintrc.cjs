module.exports = {
    env: {
        browser: true,
        node: true,
    },
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
    },
    overrides: [],
    plugins: ['react'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {},
};
