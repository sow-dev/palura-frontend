const primaryColors = require('@left4code/tw-starter/dist/js/colors')

module.exports = {
  // mode: "jit",
  purge: [
    './src/**/*.{php,html,js,jsx,ts,tsx,vue}',
    './public/**/*.{php,html,js,jsx,ts,tsx,vue}',
    './resources/**/*.{php,html,js,jsx,ts,tsx,vue}',
    './node_modules/@left4code/tw-starter/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: primaryColors.gray['300']
    }),
    extend: {
      height: theme => ({
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
      width: theme => ({
        "screen/2": "50vh",
        "screen/3": "calc(100vw / 3)",
        "screen/4": "calc(100vw / 4)",
        "screen/5": "calc(100vw / 5)",
        "screen/6": "calc(100vw / 6)",
      }),
      colors: {
        ...primaryColors,
        primary: {
          ...primaryColors.primary,
          1: '#2F5AD8'
        },
        theme: {
          1: '#162343',
          2: '#94A1B7',
          3: '#263457',
          4: '#DEE7EF',
          5: '#1C3FAA',
          6: '#1B284A',
          7: '#7486A2',
          8: '#1E2C50',
          9: '#172C69',
          10: '#F0F5FF',
          11: '#294CB7',
          12: '#A8B6DB',
          13: '#7E8BB4',
          14: '#BFCBE4',
          15: '#FBC500',
          16: '#E63B1F',
          17: '#B8F1E1',
          18: '#FFE7D9',
          19: '#DBDFF9',
          20: '#13B176',
          21: '#CE3131',
          22: '#203f90',
          23: '#D6E1F5',
          24: '#1C3FAA',
          25: '#2F5AD8',
          26: '#547FFC',
          27: '#16379B',
          28: '#2F50B5',
          29: '#F78B00',
          30: '#15379D',
          31: '#DEE5F5',
          32: '#8DA9BE',
          33: '#607F96',
          // 34: "#0E1F46",
          35: '#b7c3e6',
          36: '#1b389f',
          37: '#183295'
        }
      },
      fontFamily: {
        roboto: ['Roboto']
      },
      container: {
        center: true
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%'
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1600px'
      },
      strokeWidth: {
        0.5: 0.5,
        1.5: 1.5,
        2.5: 2.5
      }
    }
  },
  variants: {
    extend: {
      zIndex: ['responsive', 'hover'],
      position: ['responsive', 'hover'],
      padding: ['responsive', 'last'],
      margin: ['responsive', 'last'],
      borderWidth: ['responsive', 'last'],
      backgroundColor: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      borderColor: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      textColor: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      boxShadow: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      borderOpacity: ['last', 'first', 'odd', 'responsive', 'hover', 'dark'],
      backgroundOpacity: ['last', 'first', 'odd', 'responsive', 'hover', 'dark']
    }
  }
}
