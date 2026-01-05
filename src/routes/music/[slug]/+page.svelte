<script lang="ts">
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import { getDirectusAssetUrl, getBandcampEmbedUrl } from '$lib/utils/directus';
	import { formatReleaseDate } from '$lib/utils/releaseFormatters';
	import StreamingLinks from '$lib/components/StreamingLinks.svelte';
	import TrackList from '$lib/components/TrackList.svelte';
	import SectionDivider from '$lib/components/SectionDivider.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { release } = data;
	const artworkUrl = getDirectusAssetUrl(release.cover, { width: 1200, quality: 90, format: 'webp' });
	const bandcampEmbed = getBandcampEmbedUrl(release.bandcamp_id, {
		size: 'large',
		bgColor: '333333',
		linkColor: 'ff5252',
		transparent: true
	});
</script>

<svelte:head>
	<title>{release.title} - VRS:NSMV</title>
	<meta name="description" content="{release.title} by VRS:NSMV - {release.type} released {formatReleaseDate(release.release_date)}" />
</svelte:head>

<!-- Hero Section -->
<section class="hero relative min-h-[30vh] flex items-center justify-center bg-dark overflow-hidden">
	<div class="absolute inset-0 bg-[#151514]">
		<img
			src={artworkUrl}
			alt="{release.title}"
			class="w-full h-full object-cover opacity-20 blur-xl"
		/>
	</div>
	<Header />
</section>

<SectionDivider />

<!-- Release Detail Section -->
<section class="release-detail bg-dark py-[7.42857rem]">
	<div class="container mx-auto px-4">
		<div class="flex justify-center">
			<div class="w-full md:w-10/12 lg:w-8/12">
				<!-- Back to Music Link -->
				<div class="mb-12">
					<a
						href="/music"
						class="inline-flex items-center gap-2 text-primary hover:text-white transition-colors duration-300"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
						<span class="font-mono text-sm uppercase tracking-wider">Back to Music</span>
					</a>
				</div>

				<!-- Album Artwork -->
				<div class="flex justify-center mb-16">
					<div class="w-full lg:w-10/12 group">
						<img
							src={artworkUrl}
							alt="{release.title} by VRS:NSMV"
							class="w-full transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
						/>
					</div>
				</div>

				<!-- Release Title -->
				<div class="text-center mb-12">
					<h1 class="font-heading text-5xl text-white mb-4">
						{release.title}
					</h1>
					<p class="text-primary text-sm uppercase tracking-[0.3em] font-mono">
						{release.type}
					</p>
				</div>

				<!-- Bandcamp Player -->
				{#if browser}
					<div class="flex justify-center mb-16">
						<div class="w-full lg:w-10/12">
							<iframe
								title="Bandcamp Player"
								class="border-0 w-full"
								style="height: 470px;"
								src={bandcampEmbed}
							></iframe>
						</div>
					</div>
				{/if}

				<!-- Metadata Table -->
				<div class="flex justify-center mb-12">
					<div class="w-full lg:w-8/12">
						<div class="metadata-table">
							<ul class="list-none p-0 m-0 space-y-4">
								<li class="border-b border-white/10 pb-4 flex justify-between items-baseline">
									<h5 class="font-heading text-lg text-white">Release Date</h5>
									<span class="text-white whitespace-nowrap">{formatReleaseDate(release.release_date)}</span>
								</li>
								{#if release.label}
									<li class="border-b border-white/10 pb-4 flex justify-between items-baseline">
										<h5 class="font-heading text-lg text-white">Label</h5>
										<span class="text-white">{release.label}</span>
									</li>
								{/if}
								{#if release.catalog_number}
									<li class="border-b border-white/10 pb-4 flex justify-between items-baseline">
										<h5 class="font-heading text-lg text-white">Catalog Number</h5>
										<span class="text-white font-mono">{release.catalog_number}</span>
									</li>
								{/if}
							</ul>
						</div>
					</div>
				</div>

				<!-- Streaming Links -->
				<div class="flex justify-center mb-16">
					<StreamingLinks
						bandcampUrl={release.bandcamp_url}
						spotifyUrl={release.spotify_url}
						appleUrl={release.apple_url}
					/>
				</div>

				<!-- Track Listing -->
				{#if release.tracks && release.tracks.length > 0}
					<SectionDivider />
					<div class="flex justify-center mt-16">
						<div class="w-full lg:w-10/12">
							<h2 class="font-heading text-3xl text-white mb-8 text-center">Track Listing</h2>
							<TrackList tracks={release.tracks} />
						</div>
					</div>
				{/if}

				<!-- Description -->
				{#if release.description}
					<SectionDivider />
					<div class="flex justify-center mt-16">
						<div class="w-full lg:w-10/12">
							<div class="prose prose-invert max-w-none">
								<p class="text-white/90 leading-loose">{release.description}</p>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<SectionDivider />

<Footer />
