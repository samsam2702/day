/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm, muted, Korean-minimal palette. No bright colors.
        paper: {
          DEFAULT: '#FBF6EE', // warm cream paper
          dark: '#F1E9DA',
          deep: '#E7DCC7',
        },
        blush: {
          DEFAULT: '#E9D3C9', // soft dusty pink
          light: '#F3E4DC',
          dark: '#D9B8A9',
        },
        sage: {
          DEFAULT: '#C7D0BE', // muted sage green
          light: '#DCE3D5',
          dark: '#AAB79E',
        },
        ink: {
          DEFAULT: '#4A3F35', // warm brown-black for text
          light: '#7A6C5D',
          faint: '#A99B8B',
        },
        gold: {
          DEFAULT: '#C6A671', // soft muted gold accent
          light: '#DDC79A',
        },
      },
      fontFamily: {
        display: ['"Gowun Batang"', '"Nanum Myeongjo"', 'serif'],
        hand: ['"Gaegu"', '"Caveat"', 'cursive'],
        body: ['"Pretendard"', '"Noto Sans KR"', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url('/src/assets/textures/paper-texture.svg')",
        'grain': "url('/src/assets/textures/grain.svg')",
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(74, 63, 53, 0.18)',
        letter: '0 20px 60px -15px rgba(74, 63, 53, 0.25)',
        card: '0 8px 24px -8px rgba(74, 63, 53, 0.15)',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.1)' },
        },
      },
      animation: {
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        sparkle: 'sparkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
