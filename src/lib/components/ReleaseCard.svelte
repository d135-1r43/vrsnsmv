<script lang="ts">
	import type { DirectusRelease } from '$lib/types/release';
	import { getDirectusAssetUrl } from '$lib/utils/directus';
	import { formatReleaseShort } from '$lib/utils/releaseFormatters';
	import { tilt } from '$lib/actions/tilt';
	import Sigil from './Sigil.svelte';

	interface Props {
		release: DirectusRelease;
	}

	let { release }: Props = $props();

	const artworkUrl = getDirectusAssetUrl(release.cover, {
		width: 600,
		quality: 85,
		format: 'webp'
	});
</script>

<a
	href="/music/{release.slug}"
	class="release-card relic group relative block overflow-hidden bg-dark"
	use:tilt={{ max: 5, lift: 10 }}
>
	<!-- Album artwork -->
	<div class="artwork-wrapper relative aspect-square overflow-hidden">
		<img
			src={artworkUrl}
			alt="{release.title} cover"
			loading="lazy"
			class="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
		/>

		<!-- The sigil turns in the dark once the sleeve is approached -->
		<div class="shroud absolute inset-0 flex items-center justify-center">
			<Sigil class="spin-mark h-16 w-16 text-primary" />
		</div>

		<span class="sheen" aria-hidden="true"></span>
	</div>

	<!-- Metadata -->
	<div class="release-info bg-[#0d0d0d] p-4">
		<div class="mb-2 flex items-center justify-between gap-2">
			<h3 class="flex-1 truncate text-base font-medium text-white">
				{release.title}
			</h3>
			<span class="shrink-0 font-mono text-xs tracking-wider text-primary uppercase">
				{release.type}
			</span>
		</div>
		<p class="font-mono text-sm text-gray-500">
			{formatReleaseShort(release.release_date)}
		</p>
	</div>
</a>

<style>
	.release-card {
		transition:
			transform 0.6s var(--ease-ritual),
			box-shadow 0.6s ease;
	}

	.release-card:hover {
		box-shadow:
			0 30px 70px rgba(0, 0, 0, 0.6),
			0 0 48px rgba(255, 82, 82, 0.16);
	}

	.shroud {
		background: rgba(9, 13, 17, 0.6);
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	.release-card:hover .shroud,
	.release-card:focus-visible .shroud {
		opacity: 1;
	}

	.shroud :global(.spin-mark) {
		transform: scale(0.6) rotate(-60deg);
		filter: drop-shadow(0 0 18px rgba(255, 82, 82, 0.6));
		transition: transform 0.9s var(--ease-ritual);
	}

	.release-card:hover .shroud :global(.spin-mark),
	.release-card:focus-visible .shroud :global(.spin-mark) {
		transform: scale(1) rotate(0deg);
		animation: mark-turn 9s linear 0.9s infinite;
	}

	@keyframes mark-turn {
		from {
			transform: scale(1) rotate(0deg);
		}
		to {
			transform: scale(1) rotate(360deg);
		}
	}

	/* Light passing over the sleeve. */
	.sheen {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			110deg,
			transparent 38%,
			rgba(255, 255, 255, 0.14) 50%,
			transparent 62%
		);
		opacity: 0;
		transform: translateX(-70%);
		transition:
			opacity 0.4s ease,
			transform 1.2s var(--ease-ritual);
		pointer-events: none;
	}

	.release-card:hover .sheen {
		opacity: 1;
		transform: translateX(70%);
	}

	@media (prefers-reduced-motion: reduce) {
		.release-card,
		.sheen,
		.shroud,
		.shroud :global(.spin-mark) {
			transition: none;
		}

		.release-card:hover .shroud :global(.spin-mark) {
			animation: none;
			transform: scale(1);
		}
	}
</style>
