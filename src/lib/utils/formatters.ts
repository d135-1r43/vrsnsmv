/**
 * Format ISO date to "20. Apr 24" format (German)
 */
export function formatEventDate(dateString: string): string {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleDateString('de-DE', { month: 'short' });
	const year = date.getFullYear().toString().slice(-2);
	return `${day}. ${month} ${year}`;
}

/**
 * Format location: "Neckarsulm, DE"
 */
export function formatLocation(city: string, countryCode: string): string {
	return `${city}, ${countryCode}`;
}

/**
 * Format venue with optional event_name: "Brainstorm Festival · Gigant"
 */
export function formatVenue(location: string, eventName?: string): string {
	return eventName ? `${eventName} · ${location}` : location;
}

/**
 * Convert country code to flag emoji: "DE" → "🇩🇪"
 */
export function getFlagEmoji(countryCode: string): string {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt(0));
	return String.fromCodePoint(...codePoints);
}
