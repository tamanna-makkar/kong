/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: () => ({
        'header-bg': 'linear-gradient(180deg, #09224F 0%, #073382 100%)',
        'logo': "url('@/assets/images/logo.svg')",
      }),
      container: {
        screens: {
          '2xl': '1440px',
        },
      },
      fontSize: {
        '15': '15px',
        '32': ['32px', '36px'],
      },
      lineHeight: {
        'normal': 'normal',
      },
      textColor: {
        'black-200': '#707888',
        'black-800': '#3C4557',
      },
      colors: {
        'primary': '#073382',
        'seconday': '#07A88D',
        'secondary-200': '#F2F6FE',
        'secondary-900': '#5888DB',
        'active': '#072863',
        'slate': '#F8F8FA',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

