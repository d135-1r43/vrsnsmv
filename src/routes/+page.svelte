<script lang="ts">
	import type { PageData } from './$types';
	import GlitchHero from '$lib/components/GlitchHero.svelte';
	import Header from '$lib/components/Header.svelte';
	import PerformanceList from '$lib/components/PerformanceList.svelte';
	import AlbumInfo from '$lib/components/AlbumInfo.svelte';
	import ContactCard from '$lib/components/ContactCard.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SectionDivider from '$lib/components/SectionDivider.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { scramble } from '$lib/actions/scramble';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<!-- Hero Section with Glitch Effect -->
<GlitchHero youtubeId="3bCLZXLJALw" />
<Header />

<SectionDivider />

<!-- Performances Section -->
<section id="tour" class="tour bg-dark py-[7.42857rem]">
	<div class="container mx-auto px-4">
		<div class="flex justify-center">
			<div class="w-full md:w-10/12 lg:w-9/12">
				<div class="veil mb-20 text-center" use:reveal>
					<h1 class="font-heading text-5xl text-white">
						<span class="block-title" use:scramble>Performances</span>
					</h1>
				</div>

				<PerformanceList events={data.futureEvents} />

				{#if data.error}
					<div class="mt-8 text-center">
						<p class="text-sm text-gray-500">Unable to load events. Please check back later.</p>
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
					<div class="veil mb-20 text-center" use:reveal>
						<h1 class="font-heading text-5xl text-white">
							<span class="block-title" use:scramble>Past Performances</span>
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
				<div class="veil mb-20 text-center" use:reveal>
					<h1 class="font-heading text-5xl text-white">
						<span class="block-title" use:scramble>Latest Release</span>
					</h1>
				</div>

				<AlbumInfo release={data.latestRelease} />

				{#if data.releaseError}
					<div class="mt-8 text-center">
						<p class="text-sm text-gray-500">
							Unable to load release information. Please check back later.
						</p>
					</div>
				{/if}

				<!-- Link to All Releases -->
				<div class="veil mt-16 flex justify-center" use:reveal>
					<a
						href="/music"
						class="group rune-link inline-flex items-center gap-3 font-mono text-sm tracking-[0.2em] text-white/70 uppercase transition-all duration-500 hover:tracking-[0.3em] hover:text-primary"
					>
						<span>View All Releases</span>
						<svg
							class="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<SectionDivider />

<!-- About Section -->
<section id="about" class="about overlay relative flex min-h-[70vh] items-center py-24">
	<div class="background-img absolute inset-0 overflow-hidden">
		<img
			src="/images/v02_glitch-28-sq.jpg"
			alt=""
			class="animate-zoom h-full w-full object-cover"
		/>
		<div class="absolute inset-0 bg-dark/80"></div>
	</div>

	<div class="relative z-10 container mx-auto px-4">
		<div class="flex justify-center">
			<div class="w-full lg:w-10/12">
				<div class="front-p">
					<h1 class="veil font-heading mb-6 text-5xl text-white" use:reveal>
						Sacred and Black Neo-Classical Piano
					</h1>
					<h4
						class="veil mb-6 text-2xl leading-8 font-light text-white"
						use:reveal={{ delay: 120 }}
					>
						An ethereal blend evoking the dark and sacred rituals of the past – the debut solo from
						Nacht will stir your soul.
					</h4>
					<p class="veil mb-8 w-[93%] leading-loose text-white/90" use:reveal={{ delay: 220 }}>
						VRS:NSMV – the first solo from Nacht, pianist, and composer of Opus Iræ – will deliver
						you elegant, soulful ambience unlike anything else. This fusion calls upon the dark
						influences of Post Black Metal and minimalist classical piano to create the ultimate
						ethereal work. Evoking sacred rituals and the otherworldly. VRS:NSMV will stir your
						soul. This is a sacrament that lovers of the detached can feel in their bones as an
						ambient home.
					</p>
					<ul class="veil mb-4 flex list-none gap-4 p-0" use:reveal={{ delay: 320 }}>
						<li>
							<a
								href="https://www.instagram.com/vrs_nsmv/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Follow on Instagram"
								class="rite-link inline-block border-2 border-white/10 p-2 text-white/70"
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
				<div class="veil mb-20 text-center" use:reveal>
					<h1 class="font-heading text-5xl text-white">
						<span class="block-title" use:scramble>Contact</span>
					</h1>
				</div>

				<ContactCard />
			</div>
		</div>
	</div>
</section>

<Footer />
