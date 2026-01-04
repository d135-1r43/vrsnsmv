<script lang="ts">
	const performances = [
		{
			date: '20. Apr 24',
			location: 'Neckarsulm, DE',
			venue: 'Kreatief',
			infoUrl: 'http://www.kreatief-neckarsulm.de/'
		},
		{
			date: '06. Jul 24',
			location: 'Pfaffenhofen an der Ilm, DE',
			venue: "Open Park PFA'HOFA",
			infoUrl: 'https://www.open-park.de/'
		},
		{
			date: '5. Nov 22',
			location: 'Apeldoorn, NL',
			venue: 'Brainstorm Festival, Gigant',
			infoUrl: 'https://www.brainstormfestival.com/'
		},
		{
			date: '12. Nov 22',
			location: 'Heilbronn, D',
			venue: 'Blast of Eternity, Maschinenfabrik',
			infoUrl: 'https://blasofeternity.de'
		}
	];
</script>

<div class="performances-list max-w-5xl mx-auto">
	{#each performances as performance}
		<div
			class="performance-item flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-white/10 py-8 gap-4"
		>
			<!-- Date -->
			<div class="date-col w-full lg:w-auto">
				<p class="font-mono text-base mb-0 text-white">{performance.date}</p>
			</div>

			<!-- Location & Venue -->
			<div class="location-col flex-1">
				<h4 class="font-heading text-xl mb-1 text-white">{performance.location}</h4>
				<p class="text-gray-400 text-sm mb-0">{performance.venue}</p>
			</div>

			<!-- Info Button -->
			<div class="button-col w-full lg:w-auto">
				<a
					href={performance.infoUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-xs uppercase font-nav font-semibold tracking-wider hover:bg-primary-dark transition-colors no-underline"
				>
					<i class="icon-ticket"></i>
					Info
				</a>
			</div>
		</div>
	{/each}
</div>
