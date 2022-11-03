/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    prefix: 'tw-',
    theme: {
        extend: {
            gridTemplateColumns: {
                product: 'repeat(auto-fit, minmax(10rem, 13rem))',
            },
            colors: {
                soberred: 'rgb(230, 89, 89)',
                soberslate: 'rgba(51, 65, 85, 0.5)',
            },
        },
    },
    plugins: [],
    important: true,
};
