/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx, vue}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#0284c7",
          "primary-content": "#f3f4f6",
          "secondary": "#00a8e0",
          "secondary-content": "#f3f4f6",
          "accent": "#5cd3e0",
          "accent-content": "#f3f4f6",
          "neutral": "#0891b2",
          "neutral-content": "#f3f4f6",
          "base-100": "#f5f5f4",
          "base-200": "#efefee",
          "base-300": "#b6b6b5",
          "base-content": "#000",
          "info": "#1d4ed8",
          "info-content": "#0369a1",
          "success": "#22c55e",
          "success-content": "#f3f4f6",
          "warning": "#f59e0b",
          "warning-content": "#f3f4f6",
          "error": "#ef4444",
          "error-content": "#f3f4f6",
        }
      },
    ],
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('daisyui'),],
}