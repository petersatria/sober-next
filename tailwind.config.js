/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    prefix: 'tw-',
    theme: {
        extend: {
            gridTemplateColumns: {
                product: 'repeat(auto-fit, minmax(10rem, 13rem))',
            },
        },
    },
    plugins: [],
    important: true,
};
