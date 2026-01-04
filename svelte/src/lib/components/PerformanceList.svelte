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
		{#each events as event}
			<div
				class="performance-item flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-white/10 py-8 gap-4"
			>
				<!-- Date -->
				<div class="date-col w-full lg:w-auto">
					<p class="font-mono text-base mb-0 text-white">{formatEventDate(event.date)}</p>
				</div>

				<!-- Location & Venue -->
				<div class="location-col flex-1">
					<h4 class="font-heading text-xl mb-1 text-white">
						{formatLocation(event.city, event.country_code)}
					</h4>
					<p class="text-gray-400 text-sm mb-0">
						{formatVenue(event.location, event.event_name)}
					</p>
					{#if event.special}
						<p class="text-gray-500 text-xs italic mt-1">{event.special}</p>
					{/if}
				</div>

				<!-- Info/Ticket Button (only if ticket_link exists) -->
				{#if event.ticket_link}
					<div class="button-col w-full lg:w-auto">
						<a
							href={event.ticket_link}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-xs uppercase font-nav font-semibold tracking-wider hover:bg-primary-dark transition-colors no-underline"
						>
							<i class="icon-ticket"></i>
							Info
						</a>
					</div>
				{/if}
			</div>
		{/each}
	{/if}
</div>
