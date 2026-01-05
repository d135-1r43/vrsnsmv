/**
 * Utility functions for working with YouTube embeds
 */

export interface YouTubeEmbedOptions {
	autoplay?: boolean;
	mute?: boolean;
	loop?: boolean;
	startTime?: number;
	controls?: boolean;
}

/**
 * Builds a YouTube embed URL with specified options
 * @param videoId The YouTube video ID
 * @param options Embed configuration options
 * @returns Complete YouTube embed URL with query parameters
 */
export function buildYouTubeEmbedUrl(
	videoId: string,
	options: YouTubeEmbedOptions = {}
): string {
	const {
		autoplay = true,
		mute = true,
		loop = true,
		startTime = 0,
		controls = false
	} = options;

	const params = new URLSearchParams({
		autoplay: autoplay ? '1' : '0',
		mute: mute ? '1' : '0',
		loop: loop ? '1' : '0',
		playlist: loop ? videoId : '', // Required for loop to work
		start: startTime.toString(),
		controls: controls ? '1' : '0',
		showinfo: '0',
		rel: '0',
		modestbranding: '1',
		iv_load_policy: '3',
		playsinline: '1'
	});

	return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/**
 * Generates a YouTube watch URL for a video
 * @param videoId The YouTube video ID
 * @returns YouTube watch URL
 */
export function getYouTubeWatchUrl(videoId: string): string {
	return `https://www.youtube.com/watch?v=${videoId}`;
}
