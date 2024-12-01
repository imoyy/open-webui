/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				gray: {
					50: '#f9f9f9',
					100: '#ececec',
					200: '#e3e3e3',
					300: '#cdcdcd',
					400: '#b4b4b4',
					500: '#9b9b9b',
					600: '#676767',
					700: '#4e4e4e',
					800: 'var(--color-gray-800, #333)',
					850: 'var(--color-gray-850, #262626)',
					900: 'var(--color-gray-900, #171717)',
					950: 'var(--color-gray-950, #0d0d0d)'
				},
				dark: {
					200: "#b4b4b4",
					600: "#2f2f2f",
					700: "#212121",
					800: "#171717",
					900: "#0d0d0d"
				}
			},
			typography: {
				DEFAULT: {
					css: {
						lineHeight: '1.625',
						pre: false,
						code: false,
						'pre code': false,
						'code::before': false,
						'code::after': false,
						'ul > li': {
              'padding-left': '1rem', 
            },
            'ol > li': {
              'padding-left': '1rem',
            },
            'ul > li > ul > li': {
              'padding-left': '0.7rem',
            },
            'ol > li > ol > li': {
              'padding-left': '0.7rem',
            },
            'ul > li > ul > li > ul > li': {
              'padding-left': '0.6rem',
            },
            'ol > li > ol > li > ol > li': {
              'padding-left': '0.6rem',
            },
					}
				}
			},
			padding: {
				'safe-bottom': 'env(safe-area-inset-bottom)'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
