import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'p-basico': '#e9ece7',
        'btR': '#a0a0a0',
        'ct': '#6a6a6a',
        'main': '#9b9b9b',
        'caja': '#6a6a6a',
        'caja2': '#717273',
        'error': '#ff3131'
      },
      boxShadow: {
        'left-right': '-10px 0px .3rem rgba(0, 0, 0, 0.5), 10px 0px .5rem rgba(0, 0, 0, 0.5)',
        'sombra': '0 0 .5rem .3rem rgba(0, 0, 0, 0.2)'
      },
    },
  },
  plugins: [],
} satisfies Config;
