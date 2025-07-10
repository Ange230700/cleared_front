// src\styles.ts

import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

export const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          50: "{purple.50}",
          100: "{purple.100}",
          200: "{purple.200}",
          300: "{purple.300}",
          400: "{purple.400}",
          500: "{purple.500}",
          600: "{purple.600}",
          700: "{purple.700}",
          800: "{purple.800}",
          900: "{purple.900}",
          950: "{purple.950}",
        },
      },
      dark: {
        primary: {
          50: "{cyan.50}",
          100: "{cyan.100}",
          200: "{cyan.200}",
          300: "{cyan.300}",
          400: "{cyan.400}",
          500: "{cyan.500}",
          600: "{cyan.600}",
          700: "{cyan.700}",
          800: "{cyan.800}",
          900: "{cyan.900}",
          950: "{cyan.950}",
        },
      },
    },
  },
});
