/** @type {import('tailwindcss').Config} */

function rem(px) {
	return `${px / 16}rem`
}

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	plugins: [require('daisyui')],
	daisyui: {
		darkTheme: 'dark',
		styled: true,
		themes: [
			{
				mytheme: {
					primary: '#426967',
					secondary: '#b2fff2',
					accent: '#d16253',
					neutral: '#F0F2F4',
					'base-100': '#FCFCFD',
					info: '#4C8FE6',
					success: '#1CCE8D',
					warning: '#A1860C',
					error: '#F0477F',
					'--rounded-btn': rem(6),
					'--rounded-badge': rem(6),
					'--rounded-box': rem(6),
					'--tab-radius': rem(6),
					'--border-btn': rem(1),
					'--tw-border-opacity': 1,
				},
			},
		],
	},
	theme: {
		extend: {
			colors: {
				'primary-light': '#e4efee',
				'primary-dark': '#0c5f4f',
			},
		},

		fontSize: {
			'nfs-4': rem(8),
			'nfs-3': rem(10),
			'nfs-2': rem(12),
			'nfs-1': rem(14),
			'fs-0': rem(16),
			'fs-1': rem(18),
			'fs-2': rem(20),
			'fs-3': rem(22),
			'fs-4': rem(24),
			'fs-5': rem(26),
			'fs-6': rem(28),
			'fs-7': rem(30),
			'fs-8': rem(32),
			'fs-9': rem(34),
			'fs-10': rem(36),
			'fs-11': rem(38),
			'fs-12': rem(40),
			'fs-13': rem(42),
			'fs-14': rem(44),
			'fs-15': rem(46),
			'fs-16': rem(48),
			'fs-17': rem(50),
			'fs-18': rem(52),
			'fs-19': rem(54),
			'fs-20': rem(56),
		},
	},
}
