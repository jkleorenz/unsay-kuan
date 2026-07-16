import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Lora', ...defaultTheme.fontFamily.sans],
                display: ['"Space Mono"', 'monospace'],
            },
            colors: {
                accent: {
                    50: '#f0fdf3',
                    100: '#dcfce4',
                    200: '#bcf6cb',
                    300: '#87eea3',
                    400: '#4cdc74',
                    500: '#24c351',
                    600: '#179e3d',
                    700: '#167f34',
                    800: '#17642e',
                    900: '#155228',
                    950: '#052e12',
                },
                gray: {
                    0: '#FFFFFF',
                    50: '#FAFAFA',
                    100: '#F4F4F5',
                    200: '#E4E4E7',
                    300: '#D4D4D8',
                    500: '#71717A',
                    700: '#3F3F46',
                    900: '#18181B',
                },
                success: '#16A34A',
                danger: '#DC2626',
                warning: '#D97706',
                blue: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    500: '#3B82F6',
                    600: '#2563EB',
                    700: '#1D4ED8',
                },
            },
            borderRadius: {
                sm: '6px',
                md: '10px',
                lg: '14px',
                xl: '20px',
            },
            boxShadow: {
                xs: '0 1px 2px rgba(24, 24, 27, 0.04)',
                sm: '0 1px 3px rgba(24, 24, 27, 0.06), 0 1px 2px rgba(24, 24, 27, 0.04)',
                md: '0 4px 8px rgba(24, 24, 27, 0.06), 0 2px 4px rgba(24, 24, 27, 0.04)',
                lg: '0 12px 24px rgba(24, 24, 27, 0.08), 0 4px 8px rgba(24, 24, 27, 0.04)',
            },
            spacing: {
                1: '4px',
                2: '8px',
                3: '12px',
                4: '16px',
                6: '24px',
                8: '32px',
                12: '48px',
            },
        },
    },

    plugins: [forms],
};
