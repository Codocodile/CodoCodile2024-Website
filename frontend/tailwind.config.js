/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import {sky, stone, neutral, gray, slate} from 'tailwindcss/colors';

export default withMT({
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                sky,
                stone,
                neutral,
                gray,
                slate,
            }
        },
    },
    plugins: [],
});
