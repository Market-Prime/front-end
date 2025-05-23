/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to your components
    "./node_modules/@shadcn/**/*.{js,jsx,ts,tsx}", // Shadcn-specific
  ],

  compilerOptions: {
    // ...
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
    },
    // ...
  },

  theme: {
    extend: {
      // screens: {
      //   'sm': '300px',
      //   'md': '768px',
      //   'lg': '1024px',
      //   'xl': '1280px',
      //   '2xl': '1750px',
      // },
      // widths:{
      //   extralarge2xl:"15.5%",
      //   large:"30%",
      //   medium:"50%"
        
      // }
    },
  },
  plugins: [],
};
