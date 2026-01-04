export interface DirectusEvent {
	id: number;
	status: string;
	date: string;
	location: string;
	city: string;
	country_code: string;
	event_name?: string;
	special?: string;
	ticket_link?: string;
}

export interface DirectusEventsResponse {
	data: DirectusEvent[];
}
