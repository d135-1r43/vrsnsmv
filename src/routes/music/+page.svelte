<script lang="ts">
	import type { PageData } from './$types';
	import ReleaseCard from '$lib/components/ReleaseCard.svelte';
	import SectionDivider from '$lib/components/SectionDivider.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Music - VRS:NSMV</title>
	<meta name="description" content="Explore all releases from VRS:NSMV - Sacred and Black Neo-Classical Piano" />
</svelte:head>

<!-- Hero Section -->
<section class="hero relative min-h-[40vh] flex items-center justify-center bg-dark overflow-hidden">
	<div class="absolute inset-0 bg-[#151514]">
		<img
			src="/images/hero-logo.jpg"
			alt="VRS:NSMV"
			class="w-full h-full object-cover opacity-30"
		/>
	</div>
	<div class="relative z-10">
		<h1 class="font-heading text-6xl text-white text-center">
			<span class="block-title">Music</span>
		</h1>
	</div>
	<Header />
</section>

<SectionDivider />

<!-- Releases Grid Section -->
<section class="releases bg-dark py-[7.42857rem]">
	<div class="container mx-auto px-4">
		<div class="flex justify-center">
			<div class="w-full md:w-11/12 lg:w-10/12">
				{#if data.error || !data.releases || data.releases.length === 0}
					<!-- Empty State -->
					<div class="text-center py-20">
						<div class="flex justify-center mb-8">
							<svg class="w-16 h-16 opacity-20" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
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
						<p class="text-gray-400 text-lg">No releases available at this time.</p>
					</div>
				{:else}
					<!-- Releases Grid -->
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{#each data.releases as release, index}
							<div
								class="release-item animate-fade-in-up"
								style="animation-delay: {index * 0.1}s;"
							>
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

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		opacity: 0;
		animation: fadeInUp 0.6s ease-out forwards;
	}
</style>
