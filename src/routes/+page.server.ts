import type { PageServerLoad } from './$types';
import type { DirectusEvent, DirectusEventsResponse } from '$lib/types/event';

const DIRECTUS_BASE_URL = 'https://directus.herhoffer.net';
const VRSNSMV_BAND_ID = 3;

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const url = `${DIRECTUS_BASE_URL}/items/band/${VRSNSMV_BAND_ID}?fields=events.*`;

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
		console.error('Failed to fetch events from Directus:', error);
		return { futureEvents: [], pastEvents: [], error: true };
	}
};
