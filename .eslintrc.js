module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
    rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        'prettier/prettier': ['error', { tabWidth: 4, semi: true, singleQuote: true }],
        'no-console': 'warn', // Cảnh báo khi dùng console.log
        'semi': ['error', 'always'],
    },
};
