<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import PerformanceList from '$lib/components/PerformanceList.svelte';
	import AlbumInfo from '$lib/components/AlbumInfo.svelte';
	import ContactCard from '$lib/components/ContactCard.svelte';
	import Footer from '$lib/components/Footer.svelte';
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

<!-- Performances Section -->
<section id="tour" class="tour bg-dark py-[7.42857rem]">
	<div class="container mx-auto px-4">
		<div class="flex justify-center">
			<div class="w-full md:w-10/12 lg:w-9/12">
				<div class="text-center mb-20">
					<h1 class="font-heading text-5xl text-white">Performances</h1>
				</div>
				<PerformanceList />
			</div>
		</div>
	</div>
</section>

<!-- Latest Release Section -->
<section id="album" class="latest py-[7.42857rem]">
	<div class="container mx-auto px-4">
		<div class="flex justify-center">
			<div class="w-full md:w-10/12 lg:w-9/12">
				<div class="text-center mb-20">
					<h1 class="font-heading text-5xl text-white">Latest Release</h1>
				</div>
				<AlbumInfo />
			</div>
		</div>
	</div>
</section>

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

<!-- Contact Section -->
<section id="contact" class="contact bg-dark py-[7.42857rem]">
	<div class="container mx-auto px-4">
		<div class="flex justify-center">
			<div class="w-full md:w-10/12 lg:w-9/12">
				<div class="text-center mb-20">
					<h1 class="font-heading text-5xl text-white">Contact</h1>
				</div>
				<ContactCard />
			</div>
		</div>
	</div>
</section>

<Footer />
