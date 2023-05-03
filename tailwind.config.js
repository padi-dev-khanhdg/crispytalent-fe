/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    fontSize: {
      xs: '12px', /* 12px */
      sm: "14px", /* 14px */
      base: "16px", /* 16px */
      lg: "18px", /* 18px */
      xl: "20px", /* 20px */
      "2xl": "24px", /* 24px */
      "3xl": "30px", /* 30px */
      "32px": "32px",
      "4xl": "36px", /* 36px */
      '40px': "40px",
      "5xl": "48px", /* 48px */
      "6xl": "60px", /* 60px */
      "7xl": "72px", /* 72px */
      "8xl": "96px", /* 96px */
      "9xl": "128px", /* 128px */

    },
    colors: {
      ink: {
        100: '#6F767E',
        300:"#011222",
        400:'#22313F',
        500:"#111315",
      },
      slate: {
        700: "#323232"
      },
      red: {
        100: '#FFF7F5',
        200: '#FFE7E1',
        300: '#FFAC9F',
        400: '#EF6851',
        500: '#DD0F05'
      },
      blue: {
        100: '#F2F9FF',
        200: '#E1EFFF',
        300: '#A2CBFF',
        400: '#509AFF',
        500: '#0065FF'
      },
      green: {
        100: '#F7FEF8',
        200: '#DCFADE',
        300: '#A9F5AB',
        400: '#4ED960',
        500: '#02BD3A'
      },
      orange: {
        100: '#FFF9F5',
        200: '#FFF2E2',
        300: '#FFD0A5',
        400: '#FF9A54',
        500: '#FF6006'
      },
      primary: {
        100: "#CCEBF2",
        500: "#009DBE"
      },
      white: {
        100: "#DEDDDD",
        200:"#EFEFEF",
        300:'#F4F4F4',
        400:"#FCFCFC",
        500: "#ffffff"
      },
      emerald:{
        100:'#33B1CB',
        300:'#8ECAE6'
      }
      
    },
    extend: {
      spacing: {
        '18px':'18px',
        '26px':'26px',
        '30px':'30px',
        '46px': '46px',
        '50px': "50px",
        '60px':'60px',
        '66px': '66px',
        '72px': '72px',
        '100px':'100px',
        '120px': '120px',
        '156px': '156px',
        '200px':'200px',
        '230px':'230px',
        '263px':'263px',
        '276px':'276px',
        '285px': '285px',
        '300px':'300px',
        '400px': '400px',
        '430px': '430px',
        '480px': '480px',
        '500px':'500px',
        '600px': '600px',
        '680px': '680px',
        '726px':'726px',
        '800px':'800px',
        '1000px':'1000px',
        "20%": "20%",
        "45%":"45%",
        "3%": "3%",
        "8%":"8%",
        "110%":"110%"
      },
      boxShadow: {
        '3xl': '0px 0px 14px -4px rgba(0, 0, 0, 0.05), 0px 0px 48px -8px rgba(0, 0, 0, 0.1)',
      },
      scale:{
        600:'6'
      },
     
    },
  },
  plugins: [],
}
