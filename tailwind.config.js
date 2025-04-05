// tailwind.config.js
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}"
];
export const theme = {
  extend: {
    colors: {
      primary: {
        50: '#e6f7ff',
        100: '#b3e0ff',
        200: '#80caff',
        300: '#4db3ff',
        400: '#1a9dff',
        500: '#0087e6',
        600: '#0069b3',
        700: '#004b80',
        800: '#002d4d',
        900: '#000f1a',
      },
      secondary: {
        50: '#f5f5f5',
        100: '#e1e1e1',
        200: '#c8c8c8',
        300: '#afafaf',
        400: '#969696',
        500: '#7d7d7d',
        600: '#646464',
        700: '#4b4b4b',
        800: '#323232',
        900: '#191919',
      },
    },
  },
};
export const darkMode = "class";
export const plugins = [heroui()];