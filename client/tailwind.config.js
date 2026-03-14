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
        surface: {
          page:   colors.white,        // Page background
          base:   colors.zinc[50],     // Sidebar, nav
          raised: colors.zinc[100],    // Panels, main content
        },
        border: {
          subtle:  colors.zinc[200],   // Dividers, subtle outlines
          default: colors.zinc[300],   // Standard borders
        },
        ink: {
          muted:     colors.zinc[400], // Captions, footnotes
          secondary: colors.zinc[500], // Secondary labels
          body:      colors.zinc[600], // Body copy, descriptions
          primary:   colors.zinc[900], // Headings, labels
          heading:   colors.zinc[950], // Logo, prominent headings, action bg
        },
      }
    },
  },
};
