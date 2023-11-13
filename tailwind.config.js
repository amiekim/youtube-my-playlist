/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  purge: ['./src/**/*.{js,jsx,ts,tsx}'], // 사용하지 않는 클래스를 제거하여 최적화하기
  content: [],
  theme: {
    screens: {
      's-mobile': '200px',
      mobile: '360px',
      tablet: '640px',
      laptop: '1024px',
    },
    fontFamily: {
      sans: ['"Noto Sans KR"', 'sans-serif'],
      serif: [],
      mono: [],
      display: [],
      body: ['Noto Sans KR', 'sans-serif'],
    },
    extend: {
      padding: {
        '5625per': '56.25%',
      },
      width: {
        320: '320px',
        360: '360px',
        640: '640px',
        900: '900px',
      },
      minWidth: {
        320: '320px',
        360: '360px',
        640: '640px',
        900: '900px',
      },

      boxShadow: {
        default:
          '0 1px 3px 0 rgba(70, 73, 255, 0.1), 0 1px 2px 0 rgba(70, 73, 255, 0.2)',
        lg: '0 10px 15px -3px rgba(70, 73, 255, 0.1), 0 4px 6px -2px rgba(70, 73, 255, 0.2)',
      },
    },
  },
  plugins: [],
};
