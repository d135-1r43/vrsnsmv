<script lang="ts">
	interface Props {
		bandcampUrl?: string;
		spotifyUrl?: string;
		appleUrl?: string;
	}

	let { bandcampUrl, spotifyUrl, appleUrl }: Props = $props();
</script>

<ul class="flex gap-4 mb-4 p-0 list-none">
	{#if bandcampUrl}
		<li>
			<a
				href={bandcampUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Listen on Bandcamp"
				class="inline-block border-2 border-white/10 p-2 text-white/70 hover:text-white hover:border-white/30 transition-all"
			>
				<i class="socicon-bandcamp text-xl"></i>
			</a>
		</li>
	{/if}
	{#if spotifyUrl}
		<li>
			<a
				href={spotifyUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Listen on Spotify"
				class="inline-block border-2 border-white/10 p-2 text-white/70 hover:text-white hover:border-white/30 transition-all"
			>
				<i class="socicon-spotify text-xl"></i>
			</a>
		</li>
	{/if}
	{#if appleUrl}
		<li>
			<a
				href={appleUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Listen on Apple Music"
				class="inline-block border-2 border-white/10 p-2 text-white/70 hover:text-white hover:border-white/30 transition-all"
			>
				<i class="socicon-applemusic text-xl"></i>
			</a>
		</li>
	{/if}
</ul>
