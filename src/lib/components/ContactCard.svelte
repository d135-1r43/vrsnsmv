<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { spotlight } from '$lib/actions/spotlight';
	import Sigil from './Sigil.svelte';
</script>

<div class="contact-card veil mx-auto max-w-2xl text-center" use:reveal>
	<div class="altar candlelit rounded-sm border border-white/10 p-12" use:spotlight>
		<div class="mb-6 flex justify-center">
			<Sigil class="sigil sigil-breathe h-6 w-6 text-primary/60" />
		</div>

		<h3 class="font-heading mb-6 text-2xl text-white">Booking &amp; Management</h3>

		<div class="contact-details space-y-4">
			<p class="mb-2 text-lg text-white">Markus Herhoffer</p>

			<p class="mb-2">
				<a
					href="tel:+4915150663634"
					class="rune-link ember-glow text-white/70 no-underline transition-colors duration-500 hover:text-primary"
				>
					+49-151-50663634
				</a>
			</p>

			<p class="mb-0">
				<a
					href="mailto:booking@vrsnsmv.com"
					class="rune-link ember-glow text-white/70 no-underline transition-colors duration-500 hover:text-primary"
				>
					booking@vrsnsmv.com
				</a>
			</p>
		</div>
	</div>
</div>

<style>
	.altar {
		background: rgba(255, 255, 255, 0.04);
		transition:
			border-color 0.6s ease,
			box-shadow 0.6s ease;
	}

	.altar:hover {
		border-color: rgba(255, 82, 82, 0.28);
		box-shadow: 0 0 60px rgba(255, 82, 82, 0.1);
	}

	@media (prefers-reduced-motion: reduce) {
		.altar {
			transition: none;
		}
	}
</style>
