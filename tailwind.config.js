/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        institucional: '#1D4ED8',
        asistenciaRoja: '#DC2626',     // Riesgo
        asistenciaAmarilla: '#FACC15', // Advertencia
        asistenciaVerde: '#16A34A',    // Excelente
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
