/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        resaletheme: {
          primary: "#0088cc",
          secondary: "#006699",
          accent: "#555",
          navHead: "#f6f7f9",
          productBg: "#f8f8f8",
          fontColorMain: "#222529",
          fontColorSecondary: "#777",
          "neutral": "#3D4451",
          "base-100": "#FFFFFF",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
