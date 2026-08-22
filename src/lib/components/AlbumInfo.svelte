<script lang="ts">
	import { browser } from '$app/environment';
	import type { DirectusRelease } from '$lib/types/release';
	import { getDirectusAssetUrl, getBandcampEmbedUrl } from '$lib/utils/directus';
	import { formatReleaseDate } from '$lib/utils/releaseFormatters';
	import { reveal } from '$lib/actions/reveal';
	import { tilt } from '$lib/actions/tilt';
	import StreamingLinks from './StreamingLinks.svelte';

	interface Props {
		release?: DirectusRelease | null;
	}

	let { release }: Props = $props();

	// Fallback to hardcoded data if no release provided
	const fallbackAlbum = {
		title: 'Vade Retro',
		artwork: '/images/album/vade-retro-mockup-web.png',
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
	<!-- Artwork — turns toward the light under the cursor -->
	<div class="mb-20 flex justify-center">
		<div class="veil w-full md:w-10/12 lg:w-8/12" use:reveal>
			<div class="reliquary relic" use:tilt={{ max: 5, lift: 16 }}>
				<img
					src={displayData.artwork}
					alt={`${displayData.title} by VRS:NSMV`}
					class="w-full"
					loading="lazy"
				/>
				<span class="reliquary-sheen" aria-hidden="true"></span>
			</div>
		</div>
	</div>

	<!-- Bandcamp Player -->
	<div class="mb-16 flex justify-center">
		<div class="veil w-full md:w-10/12 lg:w-8/12" use:reveal={{ delay: 120 }}>
			{#if browser}
				<iframe
					title="Bandcamp Player"
					class="h-[42px] w-full border-0"
					src={displayData.bandcampEmbed}
				></iframe>
			{/if}
		</div>
	</div>

	<!-- Album details -->
	<div class="flex justify-center">
		<div class="veil w-full md:w-8/12 lg:w-6/12" use:reveal={{ delay: 200 }}>
			<div class="pb-12 text-center">
				<div class="block-album-info mb-8">
					<ul class="m-0 list-none space-y-4 p-0">
						<li class="rite-row border-b border-white/10 pb-4">
							<h5 class="font-heading mr-4 inline-block text-lg text-white">Title</h5>
							<span class="text-white">{displayData.title}</span>
						</li>
						<li class="rite-row border-b border-white/10 pb-4">
							<h5 class="font-heading mr-4 inline-block text-lg text-white">Release Date</h5>
							<span class="whitespace-nowrap text-white">{displayData.releaseDate}</span>
						</li>
					</ul>
				</div>

				<div class="mt-8 flex justify-center">
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
