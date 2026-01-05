<script lang="ts">
	import { browser } from '$app/environment';
	import type { DirectusRelease } from '$lib/types/release';
	import { getDirectusAssetUrl, getBandcampEmbedUrl } from '$lib/utils/directus';
	import { formatReleaseDate, calculateTotalDuration } from '$lib/utils/releaseFormatters';
	import StreamingLinks from './StreamingLinks.svelte';

	interface Props {
		release?: DirectusRelease | null;
	}

	let { release }: Props = $props();

	// Fallback to hardcoded data if no release provided
	const fallbackAlbum = {
		title: 'Vade Retro',
		artwork: '/images/album/vade-retro-mockup-web.png',
		length: '3:35 min',
		releaseDate: '2022-10-14',
		bandcampEmbed:
			'https://bandcamp.com/EmbeddedPlayer/album=1369685496/size=small/bgcol=333333/linkcol=e32c14/transparent=true/',
		bandcampUrl: 'https://vrsnsmv.bandcamp.com/album/vade-retro',
		spotifyUrl: undefined,
		appleUrl: undefined
	};

	const displayData = release
		? {
				title: release.title,
				artwork: getDirectusAssetUrl(release.cover, { width: 800, quality: 85, format: 'webp' }),
				length: calculateTotalDuration(release.tracks),
				releaseDate: formatReleaseDate(release.release_date),
				bandcampEmbed: getBandcampEmbedUrl(release.bandcamp_id, {
					size: 'small',
					bgColor: '333333',
					linkColor: 'e32c14',
					transparent: true
				}),
				bandcampUrl: release.bandcamp_url,
				spotifyUrl: release.spotify_url,
				appleUrl: release.apple_url
			}
		: fallbackAlbum;
</script>

<div class="album-info">
	<!-- Album Artwork (constrained to lg:w-8/12) -->
	<div class="flex justify-center mb-20">
		<div class="w-full lg:w-8/12 md:w-10/12">
			<img src={displayData.artwork} alt={`${displayData.title} by VRS:NSMV`} class="w-full" />
		</div>
	</div>

	<!-- Bandcamp Player (constrained to lg:w-8/12) -->
	<div class="flex justify-center mb-16">
		<div class="w-full lg:w-8/12 md:w-10/12">
			{#if browser}
				<iframe
					title="Bandcamp Player"
					class="border-0 w-full h-[42px]"
					src={displayData.bandcampEmbed}
				></iframe>
			{/if}
		</div>
	</div>

	<!-- Album Details (constrained to lg:w-4/12) -->
	<div class="flex justify-center">
		<div class="w-full lg:w-4/12 md:w-8/12">
			<div class="text-center pb-12">
				<div class="block-album-info mb-8">
					<ul class="list-none p-0 m-0 space-y-4">
						<li class="border-b border-white/10 pb-4">
							<h5 class="inline-block font-heading text-lg text-white mr-4">Title</h5>
							<span class="text-white">{displayData.title}</span>
						</li>
						<li class="border-b border-white/10 pb-4">
							<h5 class="inline-block font-heading text-lg text-white mr-4">Length</h5>
							<span class="text-white">{displayData.length}</span>
						</li>
						<li class="border-b border-white/10 pb-4">
							<h5 class="inline-block font-heading text-lg text-white mr-4">Release Date</h5>
							<span class="text-white">{displayData.releaseDate}</span>
						</li>
					</ul>
				</div>

				<!-- Streaming Links -->
				<div class="flex justify-center mt-8">
					<StreamingLinks
						bandcampUrl={displayData.bandcampUrl}
						spotifyUrl={displayData.spotifyUrl}
						appleUrl={displayData.appleUrl}
					/>
				</div>
			</div>
		</div>
	</div>
</div>
