import type { DirectusTrack } from '$lib/types/release';

/**
 * Format release date from ISO 8601 to full format
 * @example "2022-10-14" → "October 14, 2022"
 */
export function formatReleaseDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

/**
 * Format release date to year only
 * @example "2022-10-14" → "2022"
 */
export function formatReleaseYear(dateString: string): string {
	const date = new Date(dateString);
	return date.getFullYear().toString();
}

/**
 * Format release date to short format
 * @example "2022-10-14" → "Oct '22"
 */
export function formatReleaseShort(dateString: string): string {
	const date = new Date(dateString);
	const month = date.toLocaleDateString('en-US', { month: 'short' });
	const year = date.getFullYear().toString().slice(-2);
	return `${month} '${year}`;
}

/**
 * Calculate total duration from track list
 * @param tracks - Array of tracks with duration strings (e.g., "3:45")
 * @returns Total duration in "MM:SS" format
 */
export function calculateTotalDuration(tracks?: DirectusTrack[]): string {
	if (!tracks || tracks.length === 0) return '0:00';

	const totalSeconds = tracks.reduce((total, track) => {
		if (!track.duration) return total;

		const [minutes, seconds] = track.duration.split(':').map(Number);
		return total + minutes * 60 + seconds;
	}, 0);

	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
