import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    dropShadow: {
      primary: '0px 10px 10px rgba(0, 0, 0, 0.25)'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        brand: {
          DEFAULT:  '#5e17eb',
          100: '#5515d4',
          200: '#4b12bc',
          300: '#4210a5',
          400: '#380e8d',
          500: '#2f0c76',
          600: '#26095e',
          700: '#1c0747',
          800: '#13052f',
          900: '#090217',
        }
      },
    },
  },
  plugins: [],
}
export default config
