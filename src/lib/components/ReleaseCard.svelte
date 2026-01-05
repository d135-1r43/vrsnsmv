<script lang="ts">
	import type { DirectusRelease } from '$lib/types/release';
	import { getDirectusAssetUrl } from '$lib/utils/directus';
	import { formatReleaseShort } from '$lib/utils/releaseFormatters';

	interface Props {
		release: DirectusRelease;
	}

	let { release }: Props = $props();

	const artworkUrl = getDirectusAssetUrl(release.cover, { width: 600, quality: 85, format: 'webp' });
</script>

<a
	href="/music/{release.slug}"
	class="release-card group block relative overflow-hidden bg-dark transition-all duration-500 hover:scale-105 hover:brightness-110"
>
	<!-- Album artwork -->
	<div class="artwork-wrapper relative aspect-square overflow-hidden">
		<img
			src={artworkUrl}
			alt="{release.title} cover"
			class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
		/>

		<!-- Red cross overlay on hover -->
		<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-dark/60">
			<svg class="w-16 h-16 animate-spin-slow" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
				<path
					fill="#ff5252"
					d="M823.26,739.28l-75.05,78.77l-65.39-65.39l-68.37,65.39c-1-2.5-26.43-28.91-76.26-79.26l65.61-60.69
					L499.14,574.31c-38.6,38.64-69.03,70.6-91.29,95.86l64.65,70.6c-3.47,0.5-29.72,22.55-78.77,66.14l-57.22-66.14l-81,81.74
					l-70.9-80.49l73.2-71.76l-65.46-78.07l78.77-66.18l65.39,65.39l86.2-95.12l-107.01-99.58l-62.42,66.88l-76.54-74.31l69.11-65.39
					l-69.11-69.85l70.6-74.31l69.85,65.39l72.08-70.6L469,253.49l-69.09,67.66l94.26,97.1l97.98-90.66l-69.85-75.06l81.74-78.03
					l72.08,70.6l75.8-65.39l71.77,75.5l-75.39,65.05l65.3,63.86l-73.57,80.21c-20.32-18.82-42.36-40.62-66.14-65.39l-96.61,103.29
					l104.04,96.61l65.39-69.11l76.54,75.05l-69.11,69.11L823.26,739.28z"
				/>
			</svg>
		</div>
	</div>

	<!-- Metadata -->
	<div class="release-info p-4 bg-[#0d0d0d]">
		<div class="flex items-center justify-between gap-2 mb-2">
			<h3 class="text-white font-medium text-base truncate flex-1">
				{release.title}
			</h3>
			<span class="text-primary text-xs uppercase tracking-wider shrink-0 font-mono">
				{release.type}
			</span>
		</div>
		<p class="text-gray-500 text-sm font-mono">
			{formatReleaseShort(release.release_date)}
		</p>
	</div>
</a>

<style>
	@keyframes spin-slow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.animate-spin-slow {
		animation: spin-slow 3s linear infinite;
	}
</style>
