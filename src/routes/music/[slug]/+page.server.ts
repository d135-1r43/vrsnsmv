import type { PageServerLoad } from './$types';
import type { DirectusReleaseResponse } from '$lib/types/release';
import { DIRECTUS_CONFIG } from '$lib/utils/directus';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const release = await fetchReleaseBySlug(params.slug, fetch);

		if (!release) {
			throw error(404, 'Release not found');
		}

		return {
			release
		};
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err; // Re-throw SvelteKit errors
		}
		console.error('Error loading release:', err);
		throw error(500, 'Failed to load release');
	}
};

async function fetchReleaseBySlug(slug: string, fetch: typeof globalThis.fetch) {
	try {
		const url = `${DIRECTUS_CONFIG.BASE_URL}/items/release/?filter[slug][_eq]=${slug}&filter[status][_eq]=published&filter[band][_eq]=${DIRECTUS_CONFIG.BAND_ID}&fields=*,tracks.*`;

		const response = await fetch(url);

		if (!response.ok) {
			console.error('Directus API error:', response.status, response.statusText);
			return null;
		}

		const result: DirectusReleaseResponse = await response.json();
		return result.data?.[0] || null;
	} catch (err) {
		console.error('Error fetching release by slug:', err);
		return null;
	}
}
