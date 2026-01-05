const DIRECTUS_BASE_URL = 'https://directus.herhoffer.net';
const VRSNSMV_BAND_ID = 3;

/**
 * Get Directus asset URL from UUID with optional transformations
 */
export function getDirectusAssetUrl(
	assetId: string,
	options?: {
		width?: number;
		height?: number;
		quality?: number;
		format?: 'jpg' | 'png' | 'webp';
	}
): string {
	const params = new URLSearchParams();

	if (options?.width) params.set('width', options.width.toString());
	if (options?.height) params.set('height', options.height.toString());
	if (options?.quality) params.set('quality', options.quality.toString());
	if (options?.format) params.set('format', options.format);

	const query = params.toString();
	return `${DIRECTUS_BASE_URL}/assets/${assetId}${query ? `?${query}` : ''}`;
}

/**
 * Build Bandcamp embed URL from bandcamp_id
 */
export function getBandcampEmbedUrl(
	bandcampId: number,
	options?: {
		size?: 'small' | 'large';
		bgColor?: string;
		linkColor?: string;
		transparent?: boolean;
		tracklist?: boolean;
		artwork?: 'small' | 'none';
	}
): string {
	const {
		size = 'small',
		bgColor = '333333',
		linkColor = 'ff5252',
		transparent = true,
		tracklist = true,
		artwork = 'small'
	} = options || {};

	let url = `https://bandcamp.com/EmbeddedPlayer/album=${bandcampId}/size=${size}/bgcol=${bgColor}/linkcol=${linkColor}`;

	if (tracklist === false) {
		url += '/tracklist=false';
	}

	if (artwork === 'none') {
		url += '/artwork=none';
	}

	url += `/transparent=${transparent}/`;

	return url;
}

export const DIRECTUS_CONFIG = {
	BASE_URL: DIRECTUS_BASE_URL,
	BAND_ID: VRSNSMV_BAND_ID
};
