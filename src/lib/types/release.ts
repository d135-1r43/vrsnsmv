export interface DirectusRelease {
	id: number;
	status: string;
	title: string;
	type: 'Album' | 'Single' | 'EP';
	label?: string;
	cover: string; // Directus asset UUID
	band: number;
	release_date: string; // ISO 8601 date
	bandcamp_url: string;
	bandcamp_id: number;
	spotify_url?: string;
	apple_url?: string;
	slug: string;
	date_created?: string;
	date_updated?: string;
	// Expanded fields when fetching detail
	tracks?: DirectusTrack[];
	description?: string;
	catalog_number?: string;
}

export interface DirectusTrack {
	id: number;
	track_number: number;
	title: string;
	duration?: string; // e.g., "3:45"
}

export interface DirectusReleasesResponse {
	data: DirectusRelease[];
}

export interface DirectusReleaseResponse {
	data: DirectusRelease;
}
