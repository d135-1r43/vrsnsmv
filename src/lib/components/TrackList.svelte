<script lang="ts">
	import type { DirectusTrack } from '$lib/types/release';
	import { reveal } from '$lib/actions/reveal';
	import Sigil from './Sigil.svelte';

	interface Props {
		tracks?: DirectusTrack[];
	}

	let { tracks = [] }: Props = $props();
</script>

{#if tracks.length > 0}
	<div class="track-list space-y-2">
		{#each tracks as track, index (track.id)}
			<div
				class="track-item veil flex items-center gap-3 border-b border-white/5 py-2 transition-colors duration-500 hover:border-primary/25"
				use:reveal={{ delay: Math.min(index, 12) * 50 }}
			>
				<div
					class="track-number w-8 shrink-0 text-right font-mono text-sm text-gray-500 transition-colors duration-500"
				>
					{track.track_number}
				</div>

				<Sigil class="mark h-2 w-2 shrink-0 text-white opacity-30" />

				<div
					class="track-title min-w-0 flex-1 text-sm text-white transition-transform duration-500"
				>
					{track.title}
				</div>

				{#if track.duration}
					<div class="track-duration shrink-0 font-mono text-sm text-gray-500">
						{track.duration}
					</div>
				{/if}
			</div>
		{/each}
	</div>
{/if}

<style>
	.track-item:hover .track-number {
		color: var(--color-ember);
	}

	.track-item:hover .track-title {
		transform: translateX(4px);
	}

	.track-item :global(.mark) {
		transition:
			transform 0.8s var(--ease-ritual),
			color 0.5s ease,
			opacity 0.5s ease;
	}

	.track-item:hover :global(.mark) {
		transform: rotate(180deg);
		color: var(--color-ember);
		opacity: 0.9;
	}

	@media (prefers-reduced-motion: reduce) {
		.track-item :global(.mark),
		.track-item .track-title {
			transition: none;
		}

		.track-item:hover :global(.mark),
		.track-item:hover .track-title {
			transform: none;
		}
	}
</style>
