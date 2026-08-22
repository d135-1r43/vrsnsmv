<script lang="ts">
	import type { DirectusEvent } from '$lib/types/event';
	import { formatEventDate } from '$lib/utils/formatters';
	import { reveal } from '$lib/actions/reveal';
	import Sigil from './Sigil.svelte';

	interface Props {
		events?: DirectusEvent[];
	}

	let { events = [] }: Props = $props();
</script>

<div class="performances-list mx-auto max-w-5xl">
	{#if events.length === 0}
		<div class="veil py-12 text-center" use:reveal>
			<div class="mb-6 flex justify-center">
				<Sigil class="sigil sigil-breathe h-10 w-10 text-primary/25" />
			</div>
			<p class="font-mono text-sm tracking-[0.25em] text-gray-500 uppercase">
				No rites are scheduled
			</p>
		</div>
	{:else}
		<div class="space-y-2">
			{#each events as event, index (event.id)}
				<div
					class="performance-item veil group relative flex items-center justify-center gap-4 border-b border-white/5 py-4 transition-colors duration-500 hover:border-primary/30"
					use:reveal={{ delay: Math.min(index, 8) * 70 }}
				>
					<!-- Light sweeping across the row on approach -->
					<span class="row-light" aria-hidden="true"></span>

					<!-- Date -->
					<div
						class="date-col w-24 shrink-0 text-right font-mono text-sm text-gray-500 transition-colors duration-500 group-hover:text-bone"
					>
						{formatEventDate(event.date)}
					</div>

					<Sigil class="mark h-2 w-2 shrink-0 text-white opacity-30" />

					<!-- Location & venue, on one line -->
					<div class="location-col max-w-3xl min-w-0">
						<div class="flex items-center justify-center gap-3 text-sm">
							<span
								class="font-medium text-white transition-[letter-spacing] duration-500 group-hover:tracking-wider"
							>
								{event.city}
							</span>
							<span class="text-xs tracking-wider text-gray-600 uppercase">
								{event.country_code}
							</span>

							{#if event.event_name}
								<Sigil class="mark h-2 w-2 shrink-0 text-white opacity-30" />
								<span class="truncate text-gray-400">{event.event_name}</span>
							{/if}

							<Sigil class="mark h-2 w-2 shrink-0 text-white opacity-30" />
							<span class="truncate text-gray-500">{event.location}</span>

							{#if event.special}
								<Sigil class="mark h-2 w-2 shrink-0 text-white opacity-30" />
								<span class="truncate text-xs text-gray-600 italic">{event.special}</span>
							{/if}

							{#if event.ticket_link}
								<Sigil class="mark h-2 w-2 shrink-0 text-white opacity-30" />
								<a
									href={event.ticket_link}
									target="_blank"
									rel="noopener noreferrer"
									class="ticket-link ember-glow shrink-0 font-mono text-xs font-bold tracking-[0.2em] text-primary uppercase transition-all duration-500 hover:tracking-[0.32em] hover:text-white"
								>
									Tickets
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.performance-item {
		overflow: hidden;
	}

	/* A slow wash of ember light drawn across the row while hovered. */
	.row-light {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 82, 82, 0.09) 45%,
			rgba(255, 82, 82, 0.02) 70%,
			transparent
		);
		opacity: 0;
		transform: translateX(-35%);
		transition:
			opacity 0.6s ease,
			transform 1.1s var(--ease-ritual);
		pointer-events: none;
	}

	.performance-item:hover .row-light,
	.performance-item:focus-within .row-light {
		opacity: 1;
		transform: translateX(0);
	}

	/* The small crosses turn and catch fire with the row. */
	.performance-item :global(.mark) {
		transition:
			transform 0.8s var(--ease-ritual),
			color 0.6s ease,
			opacity 0.6s ease;
	}

	.performance-item:hover :global(.mark),
	.performance-item:focus-within :global(.mark) {
		transform: rotate(180deg);
		color: var(--color-ember);
		opacity: 0.85;
	}

	.ticket-link:hover {
		text-shadow: 0 0 20px rgba(255, 82, 82, 0.7);
	}

	@media (prefers-reduced-motion: reduce) {
		.row-light,
		.performance-item :global(.mark) {
			transition: none;
		}

		.performance-item:hover :global(.mark) {
			transform: none;
		}
	}
</style>
