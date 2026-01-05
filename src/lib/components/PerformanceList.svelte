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
					<div class="text-white/20">·</div>

					<!-- Location & Venue - All in one line -->
					<div class="location-col min-w-0 max-w-3xl">
						<div class="flex items-center justify-center gap-3 text-sm">
							<span class="text-white font-medium">{event.city}</span>
							<span class="text-gray-600 text-xs uppercase tracking-wider">{event.country_code}</span>
							{#if event.event_name}
								<span class="text-white/30">·</span>
								<span class="text-gray-400 truncate">{event.event_name}</span>
							{/if}
							<span class="text-white/30">·</span>
							<span class="text-gray-500 truncate">{event.location}</span>
							{#if event.special}
								<span class="text-white/30">·</span>
								<span class="text-gray-600 italic text-xs truncate">{event.special}</span>
							{/if}
							{#if event.ticket_link}
								<span class="text-white/30">·</span>
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
