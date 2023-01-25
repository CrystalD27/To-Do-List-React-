/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            animation: {
                spin: 'spin 2s linear infinite',
            },
        },
    },
    plugins: [],
};
