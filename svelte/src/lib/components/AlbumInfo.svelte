<script lang="ts">
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

<div class="album-info text-center">
	<!-- Album Artwork -->
	<div class="album-artwork mb-12">
		<img src={album.artwork} alt={album.title} class="w-full max-w-2xl mx-auto" />
	</div>

	<!-- Bandcamp Player -->
	<div class="bandcamp-player mb-12">
		<iframe
			title="Bandcamp Player"
			style="border: 0; width: 100%; height: 42px;"
			src={album.bandcampEmbed}
			seamless
		>
		</iframe>
	</div>

	<!-- Album Details -->
	<div class="album-details mb-8">
		<div class="overflow-x-auto">
			<table class="w-full max-w-2xl mx-auto text-left">
				<tbody>
					<tr class="border-b border-white/10">
						<td class="py-4 px-4 font-heading text-lg text-white">Title:</td>
						<td class="py-4 px-4 text-white">{album.title}</td>
					</tr>
					<tr class="border-b border-white/10">
						<td class="py-4 px-4 font-heading text-lg text-white">Length:</td>
						<td class="py-4 px-4 text-white">{album.length}</td>
					</tr>
					<tr class="border-b border-white/10">
						<td class="py-4 px-4 font-heading text-lg text-white">Release Date:</td>
						<td class="py-4 px-4 text-white">{album.releaseDate}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- Links -->
	<div class="album-links flex flex-wrap justify-center gap-4">
		<a
			href={album.bandcampUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 border-2 border-white/10 px-6 py-3 text-white/70 hover:text-white hover:border-white/30 transition-all no-underline"
		>
			<i class="socicon-bandcamp text-xl"></i>
			<span class="font-nav text-xs uppercase">Bandcamp</span>
		</a>
		<a
			href="https://open.spotify.com/artist/your-artist-id"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 border-2 border-white/10 px-6 py-3 text-white/70 hover:text-white hover:border-white/30 transition-all no-underline"
		>
			<i class="socicon-spotify text-xl"></i>
			<span class="font-nav text-xs uppercase">Spotify</span>
		</a>
		<a
			href="https://music.apple.com/artist/your-artist-id"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 border-2 border-white/10 px-6 py-3 text-white/70 hover:text-white hover:border-white/30 transition-all no-underline"
		>
			<i class="socicon-apple text-xl"></i>
			<span class="font-nav text-xs uppercase">Apple Music</span>
		</a>
		<a
			href="https://www.amazon.com/music/player/artists/your-artist-id"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 border-2 border-white/10 px-6 py-3 text-white/70 hover:text-white hover:border-white/30 transition-all no-underline"
		>
			<i class="socicon-amazon text-xl"></i>
			<span class="font-nav text-xs uppercase">Amazon</span>
		</a>
	</div>
</div>
