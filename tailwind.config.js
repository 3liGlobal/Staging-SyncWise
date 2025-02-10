/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./libs/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      gilroy: ["Gilroy", "sans-serif"],
    },
    extend: {
      animation: {
        "progress-spin": "spin 3s linear infinite",
      },
      screens: {
        "3xl": "1680px",
      },
      colors: {
        primary: {
          normal: "#4C2BBF",
          hover: "#3b2290",
        },
        purple: {
          10: "#EDEDED",
          20: "#D8D8FC",
          50: "#F4F5FE",
        },
        grey: {
          50: "#F7F7F7",
          80: "#EBEAFD",
          100: "#F1F3FF",
          200: "#E3E3E3",
          250: "#C8C8C8",
          300: "#BEC1C5",
          600: "#888888",
          700: "#898989",
          800: "#676767",
          900: "#4A445C",
          950: "#242424",
        },
        blue: {
          950: "#140a3e",
        },
        yellow: {
          400: "#FF9F1B",
        },
        red: {
          600: "#C73734",
        },
      },
      backgroundImage: {
        "dashboard-widget":
          "linear-gradient(180deg, #836ADF -41.34%, #4C2BBF 147.16%)",
      },
      boxShadow: {
        sidebar: "1px 0px 5px 0px rgba(76, 43, 191, 0.50)",
        "dashboard-widget": "1px 3px 12px 0px #4F2FC033",
        "crm-card": "1px 3px 12px 0px #4F2FC033;",
        status:
          "5.33px 5.33px 26.64px 0px rgba(76, 43, 191, 0.15), -7.32px -7.32px 19.51px 0px rgba(255, 255, 255, 0.8)",
      },
    },
  },
  plugins: [],
};
