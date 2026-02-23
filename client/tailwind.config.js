import colors from 'tailwindcss/colors';

export default {
  content: [
    "./app/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.{vue,js,ts,jsx,tsx}",
    "./assets/**/*.{vue,js,ts,jsx,tsx,css,scss}",
    "./layouts/**/*.{vue,js,ts,jsx,tsx}",
    "./*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#f3f4f6',             // Original generic App background
          surface: colors.white,     // Card/Container background
          border: colors.gray[200],  // Borders
          muted: colors.gray[200],   // Original bg-gray-200
        },
        content: {
          title: colors.black,       // Original default black text
          body: colors.black,        // Original default black text
          muted: colors.gray[400],   // Original text-gray-400
        },
        accent: {
          DEFAULT: colors.indigo[500], // Primary highlight
          hover: colors.indigo[600],   // Hover highlight
          light: colors.indigo[50],    // Soft background highlight
        }
      }
    },
  },
};
