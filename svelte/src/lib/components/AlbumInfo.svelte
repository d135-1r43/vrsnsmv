<script lang="ts">
	import { browser } from '$app/environment';

	const album = {
		title: 'Vade Retro',
		artwork: '/images/album/vade-retro-mockup-web.png',
		length: '3:35 min',
		releaseDate: '2022-10-14',
		bandcampEmbed:
			'https://bandcamp.com/EmbeddedPlayer/album=1369685496/size=small/bgcol=333333/linkcol=e32c14/transparent=true/',
		bandcampUrl: 'https://vrsnsmv.bandcamp.com/album/vade-retro'
	};
</script>

<div class="album-info">
	<!-- Album Artwork (constrained to lg:w-8/12) -->
	<div class="flex justify-center mb-20">
		<div class="w-full lg:w-8/12 md:w-10/12">
			<img src={album.artwork} alt={`${album.title} by VRS:NSMV`} class="w-full" />
		</div>
	</div>

	<!-- Bandcamp Player (constrained to lg:w-8/12) -->
	<div class="flex justify-center mb-16">
		<div class="w-full lg:w-8/12 md:w-10/12">
			{#if browser}
				<iframe
					title="Bandcamp Player"
					class="border-0 w-full h-[42px]"
					src={album.bandcampEmbed}
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
							<span class="text-white">{album.title}</span>
						</li>
						<li class="border-b border-white/10 pb-4">
							<h5 class="inline-block font-heading text-lg text-white mr-4">Length</h5>
							<span class="text-white">{album.length}</span>
						</li>
						<li class="border-b border-white/10 pb-4">
							<h5 class="inline-block font-heading text-lg text-white mr-4">Release Date</h5>
							<span class="text-white">{album.releaseDate}</span>
						</li>
					</ul>
				</div>

				<!-- Social Links - Only Bandcamp -->
				<ul class="flex justify-center gap-3 p-0 m-0 list-none mt-8">
					<li>
						<a
							href={album.bandcampUrl}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Listen on Bandcamp"
							class="inline-block border-2 border-white/10 p-2 text-white/70 hover:text-white hover:border-white/30 transition-all text-xl"
						>
							<i class="socicon-bandcamp"></i>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
