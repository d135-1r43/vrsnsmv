import type { PageServerLoad } from './$types';
import type { DirectusReleasesResponse } from '$lib/types/release';
import { DIRECTUS_CONFIG } from '$lib/utils/directus';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const releases = await fetchReleases(fetch);

		return {
			releases,
			error: !releases || releases.length === 0
		};
	} catch (error) {
		console.error('Error loading releases:', error);
		return {
			releases: [],
			error: true
		};
	}
};

async function fetchReleases(fetch: typeof globalThis.fetch) {
	try {
		const url = `${DIRECTUS_CONFIG.BASE_URL}/items/release/?sort=-release_date&filter[status][_eq]=published&filter[band][_eq]=${DIRECTUS_CONFIG.BAND_ID}`;

		const response = await fetch(url);

		if (!response.ok) {
			console.error('Directus API error:', response.status, response.statusText);
			return [];
		}

		const result: DirectusReleasesResponse = await response.json();
		return result.data || [];
	} catch (error) {
		console.error('Error fetching releases:', error);
		return [];
	}
}
