/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px', // Tambahkan ini
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '8': '8px',
      },
      colors: {
        // neutral
        "neutral-white": "#FFFFFF",
        "neutral-50": "#FAFAFA",
        "neutral-100": "#F3F3F2",
        "neutral-200": "#E4E4E2",
        "neutral-300": "#BEBEBB",
        "neutral-400": "#AFB0AB",
        "neutral-500": "#93938F",
        "neutral-600": "#7D7D78",
        "neutral-700": "#60605C",
        "neutral-800": "#464643",
        "neutral-900": "#1C1C17",

        // primary
        "primary-50": "#f1f8fd",
        "primary-100": "#e0eef9",
        "primary-200": "#c7e2f6",
        "primary-300": "#a1d0ef",
        "primary-400": "#74b6e6",
        "primary-500": "#539bde",
        "primary-600": "#3e81d2",
        "primary-700": "#3871c8",
        "primary": "#31589c",
        "primary-900": "#2c4c7c",

        // secondary
        "secondary-50": "#FEFAF6",
        "secondary-100": "#FCF0E3",
        "secondary-200": "#F8E0C4",
        "secondary-300": "#F2C791",
        "secondary-400": "#EDAF64",
        "secondary-500": "#E79633",
        "secondary-base": "#E17C00",
        "secondary-700": "#B86500",
        "secondary-800": "#7A4300",
        "secondary-900": "#3D2200",

        // semantic/success
        "semantic/success-50": "#F3FCF5",
        "semantic/success-100": "#E7F9EB",
        "semantic/success-200": "#C6F0D1",
        "semantic/success-300": "#9EE6B0",
        "semantic/success-400": "#75DC8E",
        "semantic/success-base": "#48D06A",
        "semantic/success-600": "#2EB34F",
        "semantic/success-700": "#22863B",
        "semantic/success-800": "#185D29",
        "semantic/success-900": "#0C3115",

        // semantic/warning
        "semantic/warning-50": "#FFFEF0",
        "semantic/warning-100": "#FFFEE0",
        "semantic/warning-200": "#FFFDBD",
        "semantic/warning-300": "#FFFB85",
        "semantic/warning-400": "#FDF863",
        "semantic/warning-base": "#FFF605",
        "semantic/warning-600": "#DED603",
        "semantic/warning-700": "#BDB600",
        "semantic/warning-900": "#757100",
        "semantic/warning-900": "#424000",

        // semantic/error
        "semantic/error-50": "#FFF5F5",
        "semantic/error-100": "#FFE1E0",
        "semantic/error-200": "#FFB5B2",
        "semantic/error-300": "#FE807C",
        "semantic/error-400": "#FD544E",
        "semantic/error-base": "#FD3730",
        "semantic/error-600": "#F10A04",
        "semantic/error-700": "#BA0803",
        "semantic/error-800": "#880602",
        "semantic/error-900": "#540401",

        // semantic/info
        "semantic/info-50": "#F0F7FF",
        "semantic/info-100": "#E5F1FF",
        "semantic/info-200": "#B2D5FF",
        "semantic/info-300": "#85BCFF",
        "semantic/info-400": "#529FFF",
        "semantic/info-base": "#2486FF",
        "semantic/info-600": "#006EF5",
        "semantic/info-700": "#0055BD",
        "semantic/info-800": "#003E8A",
        "semantic/info-900": "#001B3D",
      },
    },
    fontFamily: {
      Inter: ["Inter, sans-serif"],
    },
    container: {
      // padding: "2rem",
      center: true,
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
