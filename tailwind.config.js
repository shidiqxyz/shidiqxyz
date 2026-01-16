import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1.125rem', // 18px - lebih nyaman dibaca
                        lineHeight: '1.8', // Jarak antar baris lebih lega
                        letterSpacing: '0.01em', // Sedikit spasi antar huruf
                        wordSpacing: '0.05em', // Sedikit spasi antar kata
                        '--tw-prose-body': theme('colors.gray.700'),
                        '--tw-prose-headings': theme('colors.gray.900'),
                        '--tw-prose-links': theme('colors.blue.600'),
                        '--tw-prose-invert-body': theme('colors.gray.300'),
                        '--tw-prose-invert-headings': theme('colors.white'),
                        '--tw-prose-invert-links': theme('colors.blue.400'),
                        'blockquote p:first-of-type::before': { content: 'none' },
                        'blockquote p:last-of-type::after': { content: 'none' },
                        'p': {
                            marginTop: '1.25em',
                            marginBottom: '1.25em',
                        },
                        'h1': {
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '2.25rem',
                            letterSpacing: '-0.02em',
                            lineHeight: '1.2',
                            marginTop: '1.5em',
                            marginBottom: '0.5em',
                        },
                        'h2': {
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '1.75rem',
                            letterSpacing: '-0.01em',
                            lineHeight: '1.3',
                            marginTop: '1.25em',
                            marginBottom: '0.5em',
                        },
                        'h3': {
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '1.375rem',
                            lineHeight: '1.4',
                            marginTop: '1em',
                            marginBottom: '0.4em',
                        },
                        'h4, h5, h6': {
                            fontFamily: 'Outfit, sans-serif',
                            marginTop: '0.75em',
                            marginBottom: '0.4em',
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        typography,
    ],
}
