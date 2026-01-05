<script lang="ts">
	import type { DirectusEvent } from '$lib/types/event';
	import { formatEventDate, formatLocation, formatVenue } from '$lib/utils/formatters';

	interface Props {
		events?: DirectusEvent[];
	}

	let { events = [] }: Props = $props();
</script>

<div class="performances-list max-w-5xl mx-auto">
	{#if events.length === 0}
		<div class="text-center py-12">
			<p class="text-gray-400 text-lg">No upcoming performances scheduled at this time.</p>
		</div>
	{:else}
		<div class="space-y-2">
			{#each events as event}
				<div
					class="performance-item group flex items-center justify-center gap-4 border-b border-white/5 py-4 hover:border-white/20 transition-all duration-300"
				>
					<!-- Date -->
					<div class="date-col font-mono text-sm text-gray-500 w-24 text-right shrink-0">
						{formatEventDate(event.date)}
					</div>

					<!-- Separator -->
					<svg class="w-2 h-2 inline-block opacity-30" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
						<path fill="currentColor" d="M823.26,739.28l-75.05,78.77l-65.39-65.39l-68.37,65.39c-1-2.5-26.43-28.91-76.26-79.26l65.61-60.69
							L499.14,574.31c-38.6,38.64-69.03,70.6-91.29,95.86l64.65,70.6c-3.47,0.5-29.72,22.55-78.77,66.14l-57.22-66.14l-81,81.74
							l-70.9-80.49l73.2-71.76l-65.46-78.07l78.77-66.18l65.39,65.39l86.2-95.12l-107.01-99.58l-62.42,66.88l-76.54-74.31l69.11-65.39
							l-69.11-69.85l70.6-74.31l69.85,65.39l72.08-70.6L469,253.49l-69.09,67.66l94.26,97.1l97.98-90.66l-69.85-75.06l81.74-78.03
							l72.08,70.6l75.8-65.39l71.77,75.5l-75.39,65.05l65.3,63.86l-73.57,80.21c-20.32-18.82-42.36-40.62-66.14-65.39l-96.61,103.29
							l104.04,96.61l65.39-69.11l76.54,75.05l-69.11,69.11L823.26,739.28z"/>
					</svg>

					<!-- Location & Venue - All in one line -->
					<div class="location-col min-w-0 max-w-3xl">
						<div class="flex items-center justify-center gap-3 text-sm">
							<span class="text-white font-medium">{event.city}</span>
							<span class="text-gray-600 text-xs uppercase tracking-wider">{event.country_code}</span>
							{#if event.event_name}
								<svg class="w-2 h-2 inline-block opacity-30" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
									<path fill="currentColor" d="M823.26,739.28l-75.05,78.77l-65.39-65.39l-68.37,65.39c-1-2.5-26.43-28.91-76.26-79.26l65.61-60.69
										L499.14,574.31c-38.6,38.64-69.03,70.6-91.29,95.86l64.65,70.6c-3.47,0.5-29.72,22.55-78.77,66.14l-57.22-66.14l-81,81.74
										l-70.9-80.49l73.2-71.76l-65.46-78.07l78.77-66.18l65.39,65.39l86.2-95.12l-107.01-99.58l-62.42,66.88l-76.54-74.31l69.11-65.39
										l-69.11-69.85l70.6-74.31l69.85,65.39l72.08-70.6L469,253.49l-69.09,67.66l94.26,97.1l97.98-90.66l-69.85-75.06l81.74-78.03
										l72.08,70.6l75.8-65.39l71.77,75.5l-75.39,65.05l65.3,63.86l-73.57,80.21c-20.32-18.82-42.36-40.62-66.14-65.39l-96.61,103.29
										l104.04,96.61l65.39-69.11l76.54,75.05l-69.11,69.11L823.26,739.28z"/>
								</svg>
								<span class="text-gray-400 truncate">{event.event_name}</span>
							{/if}
							<svg class="w-2 h-2 inline-block opacity-30" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
								<path fill="currentColor" d="M823.26,739.28l-75.05,78.77l-65.39-65.39l-68.37,65.39c-1-2.5-26.43-28.91-76.26-79.26l65.61-60.69
									L499.14,574.31c-38.6,38.64-69.03,70.6-91.29,95.86l64.65,70.6c-3.47,0.5-29.72,22.55-78.77,66.14l-57.22-66.14l-81,81.74
									l-70.9-80.49l73.2-71.76l-65.46-78.07l78.77-66.18l65.39,65.39l86.2-95.12l-107.01-99.58l-62.42,66.88l-76.54-74.31l69.11-65.39
									l-69.11-69.85l70.6-74.31l69.85,65.39l72.08-70.6L469,253.49l-69.09,67.66l94.26,97.1l97.98-90.66l-69.85-75.06l81.74-78.03
									l72.08,70.6l75.8-65.39l71.77,75.5l-75.39,65.05l65.3,63.86l-73.57,80.21c-20.32-18.82-42.36-40.62-66.14-65.39l-96.61,103.29
									l104.04,96.61l65.39-69.11l76.54,75.05l-69.11,69.11L823.26,739.28z"/>
							</svg>
							<span class="text-gray-500 truncate">{event.location}</span>
							{#if event.special}
								<svg class="w-2 h-2 inline-block opacity-30" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
									<path fill="currentColor" d="M823.26,739.28l-75.05,78.77l-65.39-65.39l-68.37,65.39c-1-2.5-26.43-28.91-76.26-79.26l65.61-60.69
										L499.14,574.31c-38.6,38.64-69.03,70.6-91.29,95.86l64.65,70.6c-3.47,0.5-29.72,22.55-78.77,66.14l-57.22-66.14l-81,81.74
										l-70.9-80.49l73.2-71.76l-65.46-78.07l78.77-66.18l65.39,65.39l86.2-95.12l-107.01-99.58l-62.42,66.88l-76.54-74.31l69.11-65.39
										l-69.11-69.85l70.6-74.31l69.85,65.39l72.08-70.6L469,253.49l-69.09,67.66l94.26,97.1l97.98-90.66l-69.85-75.06l81.74-78.03
										l72.08,70.6l75.8-65.39l71.77,75.5l-75.39,65.05l65.3,63.86l-73.57,80.21c-20.32-18.82-42.36-40.62-66.14-65.39l-96.61,103.29
										l104.04,96.61l65.39-69.11l76.54,75.05l-69.11,69.11L823.26,739.28z"/>
								</svg>
								<span class="text-gray-600 italic text-xs truncate">{event.special}</span>
							{/if}
							{#if event.ticket_link}
								<svg class="w-2 h-2 inline-block opacity-30" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
									<path fill="currentColor" d="M823.26,739.28l-75.05,78.77l-65.39-65.39l-68.37,65.39c-1-2.5-26.43-28.91-76.26-79.26l65.61-60.69
										L499.14,574.31c-38.6,38.64-69.03,70.6-91.29,95.86l64.65,70.6c-3.47,0.5-29.72,22.55-78.77,66.14l-57.22-66.14l-81,81.74
										l-70.9-80.49l73.2-71.76l-65.46-78.07l78.77-66.18l65.39,65.39l86.2-95.12l-107.01-99.58l-62.42,66.88l-76.54-74.31l69.11-65.39
										l-69.11-69.85l70.6-74.31l69.85,65.39l72.08-70.6L469,253.49l-69.09,67.66l94.26,97.1l97.98-90.66l-69.85-75.06l81.74-78.03
										l72.08,70.6l75.8-65.39l71.77,75.5l-75.39,65.05l65.3,63.86l-73.57,80.21c-20.32-18.82-42.36-40.62-66.14-65.39l-96.61,103.29
										l104.04,96.61l65.39-69.11l76.54,75.05l-69.11,69.11L823.26,739.28z"/>
								</svg>
								<a
									href={event.ticket_link}
									target="_blank"
									rel="noopener noreferrer"
									class="text-gray-600 hover:text-white text-xs uppercase tracking-widest transition-colors opacity-0 group-hover:opacity-100"
								>
									Info
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
