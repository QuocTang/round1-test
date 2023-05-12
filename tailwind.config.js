/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'],
    theme: {
        extend: {
            colors: {
                primary: '#009ef7',
                secondary: '#282f53',
                tbase: '#677788',
                hover: '#f5f8fa',
            },
            screens: {
                tablet: { max: '991px' },
            },
        },
    },
    plugins: [],
};
