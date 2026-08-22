<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Sigil from './Sigil.svelte';

	const currentYear = new Date().getFullYear();
</script>

<footer class="footer relative overflow-hidden py-14">
	<div class="veil container mx-auto px-4 text-center" use:reveal>
		<div class="mb-6 flex justify-center">
			<Sigil class="sigil sigil-breathe h-5 w-5 text-primary/40" />
		</div>

		<p class="mb-3 font-mono text-xs tracking-[0.35em] text-white/40 uppercase">
			Sacred and Black Neo-Classical Piano
		</p>

		<p class="mb-2 text-sm text-white/55">
			&copy; {currentYear} VRS:NSMV
		</p>

		<p class="text-xs text-white/35">
			VRS:NSMV c/o Markus Herhoffer, Scheyerer Str. 50, 85276 Pfaffenhofen
		</p>
	</div>
</footer>

<style>
	.footer {
		background:
			radial-gradient(120% 100% at 50% 0%, rgba(255, 82, 82, 0.07), transparent 60%),
			linear-gradient(180deg, var(--color-dark), var(--color-void));
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}
</style>
