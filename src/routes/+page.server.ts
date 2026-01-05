import type { PageServerLoad } from './$types';
import type { DirectusEvent, DirectusEventsResponse } from '$lib/types/event';
import type { DirectusReleasesResponse, DirectusRelease } from '$lib/types/release';
import { DIRECTUS_CONFIG } from '$lib/utils/directus';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		// Fetch events and latest release in parallel
		const [eventsResult, latestRelease] = await Promise.all([
			fetchEvents(fetch),
			fetchLatestRelease(fetch)
		]);

		return {
			...eventsResult,
			latestRelease,
			releaseError: !latestRelease
		};
	} catch (error) {
		console.error('Failed to fetch data from Directus:', error);
		return {
			futureEvents: [],
			pastEvents: [],
			error: true,
			latestRelease: null,
			releaseError: true
		};
	}
};

async function fetchEvents(fetch: typeof globalThis.fetch) {
	try {
		const url = `${DIRECTUS_CONFIG.BASE_URL}/items/band/${DIRECTUS_CONFIG.BAND_ID}?fields=events.*`;

		const response = await fetch(url);

		if (!response.ok) {
			console.error(`Directus API error: ${response.status}`);
			return { futureEvents: [], pastEvents: [], error: true };
		}

		const result = await response.json();
		const events: DirectusEvent[] = result.data?.events || [];

		// Separate past and future events
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const pastEvents = events
			.filter((event) => new Date(event.date) < today)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		const futureEvents = events
			.filter((event) => new Date(event.date) >= today)
			.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

		return {
			futureEvents,
			pastEvents,
			error: false
		};
	} catch (error) {
		console.error('Failed to fetch events:', error);
		return { futureEvents: [], pastEvents: [], error: true };
	}
}

async function fetchLatestRelease(fetch: typeof globalThis.fetch): Promise<DirectusRelease | null> {
	try {
		const url = `${DIRECTUS_CONFIG.BASE_URL}/items/release/?sort=-release_date&filter[status][_eq]=published&filter[band][_eq]=${DIRECTUS_CONFIG.BAND_ID}&limit=1`;

		const response = await fetch(url);

		if (!response.ok) {
			console.error('Directus API error for releases:', response.status, response.statusText);
			return null;
		}

		const result: DirectusReleasesResponse = await response.json();
		return result.data?.[0] || null;
	} catch (error) {
		console.error('Error fetching latest release:', error);
		return null;
	}
}
