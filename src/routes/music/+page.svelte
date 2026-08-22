<script lang="ts">
	import type { PageData } from './$types';
	import ReleaseCard from '$lib/components/ReleaseCard.svelte';
	import SectionDivider from '$lib/components/SectionDivider.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Sigil from '$lib/components/Sigil.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { scramble } from '$lib/actions/scramble';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Music - VRS:NSMV</title>
	<meta
		name="description"
		content="Explore all releases from VRS:NSMV - Sacred and Black Neo-Classical Piano"
	/>
</svelte:head>

<!-- Hero Section -->
<section class="hero relative flex items-center justify-center bg-dark pt-32 pb-12">
	<div class="veil relative z-10" use:reveal>
		<h1 class="font-heading text-center text-6xl text-white">
			<span class="block-title" use:scramble>Music</span>
		</h1>
	</div>
	<Header />
</section>

<SectionDivider />

<!-- Releases Grid Section -->
<section class="releases bg-dark pt-12 pb-[7.42857rem]">
	<div class="container mx-auto px-4">
		<div class="flex justify-center">
			<div class="w-full md:w-11/12 lg:w-10/12">
				{#if data.error || !data.releases || data.releases.length === 0}
					<!-- Empty State -->
					<div class="veil py-20 text-center" use:reveal>
						<div class="mb-8 flex justify-center">
							<Sigil class="sigil sigil-breathe h-16 w-16 text-primary/20" />
						</div>
						<p class="font-mono text-sm tracking-[0.25em] text-gray-400 uppercase">
							Nothing has surfaced yet
						</p>
					</div>
				{:else}
					<!-- Releases Grid -->
					<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{#each data.releases as release, index (release.id)}
							<div class="release-item veil" use:reveal={{ delay: Math.min(index, 9) * 90 }}>
								<ReleaseCard {release} />
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<SectionDivider />

<Footer />
