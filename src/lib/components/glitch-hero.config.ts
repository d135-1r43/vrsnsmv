/**
 * Configuration constants for the GlitchHero component
 */

export const GLITCH_CONFIG = {
	/** Responsive breakpoints (in pixels) */
	breakpoints: {
		mobile: 768,
		desktop: 990
	},

	/** Z-index layering for component elements */
	zIndex: {
		background: 1,
		overlay: 1.5,
		logo: 2,
		scanlines: 10,
		glitch: 9,
		youtubeLink: 3
	},

	/** Animation durations */
	animations: {
		rgbSplit: '4s',
		scanlines: '8s',
		flicker: '7s',
		glitchSlice1: '3.1s',
		glitchSlice2: '5.7s',
		glitchDelay: '1.3s',
		linkGlitch: '0.3s',
		backgroundZoom: '15s'
	},

	/** Color palette */
	colors: {
		dark: '#151514',
		darkOverlay: 'rgba(0, 0, 0, 0.4)',
		red: '#ff0000',
		cyan: '#00ffff',
		primary: '#ff5252',
		glitchLayer: 'rgba(255, 82, 82, 0.1)'
	},

	/** YouTube video configuration */
	youtube: {
		startTime: 12
	},

	/** Logo sizing */
	logo: {
		desktopWidth: '70vw',
		mobileWidth: '75vw',
		maxWidth: '1200px',
		minWidthDesktop: '400px',
		minWidthMobile: '280px'
	},

	/** RGB Split offsets (in pixels) */
	rgbSplit: {
		desktop: {
			base: 3,
			max: 5,
			min: 2
		},
		mobile: {
			base: 1.5,
			max: 2.5,
			min: 1
		}
	}
} as const;
