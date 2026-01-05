<script lang="ts">
	import type { PageData } from './$types';
	import Header from '$lib/components/Header.svelte';
	import PerformanceList from '$lib/components/PerformanceList.svelte';
	import AlbumInfo from '$lib/components/AlbumInfo.svelte';
	import ContactCard from '$lib/components/ContactCard.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SectionDivider from '$lib/components/SectionDivider.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<!-- Hero Section -->
<section id="wrapper" class="hero relative h-screen overflow-hidden">
	<div class="absolute inset-0 bg-[#151514]">
		<img
			src="/images/hero-logo.jpg"
			alt="VRS:NSMV"
			class="w-full h-full object-cover animate-zoom"
		/>
	</div>
	<Header />
</section>

<SectionDivider />

<!-- Performances Section -->
<section id="tour" class="tour bg-dark py-[7.42857rem]">
	<div class="container mx-auto px-4">
		<div class="flex justify-center">
			<div class="w-full md:w-10/12 lg:w-9/12">
				<div class="text-center mb-20">
					<h1 class="font-heading text-5xl text-white">
						<span class="block-title">Performances</span>
					</h1>
				</div>
				<PerformanceList events={data.futureEvents} />

			{#if data.error}
				<div class="text-center mt-8">
					<p class="text-gray-500 text-sm">Unable to load events. Please check back later.</p>
				</div>
			{/if}
			</div>
		</div>
	</div>
</section>

<SectionDivider />

<!-- Past Performances Section -->
{#if data.pastEvents && data.pastEvents.length > 0}
	<section id="past-tour" class="past-tour bg-[#0d0d0d] py-[7.42857rem]">
		<div class="container mx-auto px-4">
			<div class="flex justify-center">
				<div class="w-full md:w-10/12 lg:w-9/12">
					<div class="text-center mb-20">
						<h1 class="font-heading text-5xl text-white">
							<span class="block-title">Past Performances</span>
						</h1>
					</div>
					<PerformanceList events={data.pastEvents} />
				</div>
			</div>
		</div>
	</section>
	<SectionDivider />
{/if}

<!-- Latest Release Section -->
<section id="album" class="latest py-[7.42857rem]">
	<div class="container mx-auto px-4">
		<div class="flex justify-center">
			<div class="w-full md:w-10/12 lg:w-9/12">
				<div class="text-center mb-20">
					<h1 class="font-heading text-5xl text-white">
						<span class="block-title">Latest Release</span>
					</h1>
				</div>
				<AlbumInfo release={data.latestRelease} />

				{#if data.releaseError}
					<div class="text-center mt-8">
						<p class="text-gray-500 text-sm">Unable to load release information. Please check back later.</p>
					</div>
				{/if}

				<!-- Link to All Releases -->
				<div class="flex justify-center mt-16">
					<a
						href="/music"
						class="inline-flex items-center gap-3 text-white/70 hover:text-primary font-mono text-sm uppercase tracking-[0.2em] hover:tracking-[0.3em] transition-all duration-300 group"
					>
						<span>View All Releases</span>
						<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<SectionDivider />

<!-- About Section -->
<section id="about" class="about overlay relative min-h-[70vh] flex items-center py-24">
	<div class="background-img absolute inset-0">
		<img src="/images/v02_glitch-28-sq.jpg" alt="" class="w-full h-full object-cover" />
		<div class="absolute inset-0 bg-dark/80"></div>
	</div>

	<div class="relative z-10 container mx-auto px-4">
		<div class="flex justify-center">
			<div class="w-full lg:w-10/12">
				<div class="front-p">
					<h1 class="text-white font-heading text-5xl mb-6">
						Sacred and Black Neo-Classical Piano
					</h1>
					<h4 class="text-2xl font-light mb-6 leading-8 text-white">
						An ethereal blend evoking the dark and sacred rituals of the past – the debut solo from
						Nacht will stir your soul.
					</h4>
					<p class="w-[93%] leading-loose mb-8 text-white/90">
						VRS:NSMV – the first solo from Nacht, pianist, and composer of Opus Iræ – will deliver
						you elegant, soulful ambience unlike anything else. This fusion calls upon the dark
						influences of Post Black Metal and minimalist classical piano to create the ultimate
						ethereal work. Evoking sacred rituals and the otherworldly. VRS:NSMV will stir your
						soul. This is a sacrament that lovers of the detached can feel in their bones as an
						ambient home.
					</p>
					<ul class="flex gap-4 mb-4 p-0 list-none">
						<li>
							<a
								href="https://www.instagram.com/vrs_nsmv/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Follow on Instagram"
								class="inline-block border-2 border-white/10 p-2 text-white/70 hover:text-white hover:border-white/30 transition-all"
							>
								<i class="socicon-instagram text-xl"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

<SectionDivider />

<!-- Contact Section -->
<section id="contact" class="contact bg-dark py-[7.42857rem]">
	<div class="container mx-auto px-4">
		<div class="flex justify-center">
			<div class="w-full md:w-10/12 lg:w-9/12">
				<div class="text-center mb-20">
					<h1 class="font-heading text-5xl text-white">
						<span class="block-title">Contact</span>
					</h1>
				</div>
				<ContactCard />
			</div>
		</div>
	</div>
</section>

<Footer />
