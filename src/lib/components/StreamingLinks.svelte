<script lang="ts">
	interface Props {
		bandcampUrl?: string;
		spotifyUrl?: string;
		appleUrl?: string;
	}

	let { bandcampUrl, spotifyUrl, appleUrl }: Props = $props();

	const links = $derived(
		[
			{ url: bandcampUrl, icon: 'socicon-bandcamp', label: 'Listen on Bandcamp' },
			{ url: spotifyUrl, icon: 'socicon-spotify', label: 'Listen on Spotify' },
			{ url: appleUrl, icon: 'socicon-apple', label: 'Listen on Apple Music' }
		].filter((link) => Boolean(link.url))
	);
</script>

<ul class="mb-4 flex list-none gap-4 p-0">
	{#each links as link (link.icon)}
		<li>
			<a
				href={link.url}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={link.label}
				class="rite-link inline-block border-2 border-white/10 p-2 text-white/70"
			>
				<i class="{link.icon} text-xl"></i>
			</a>
		</li>
	{/each}
</ul>
