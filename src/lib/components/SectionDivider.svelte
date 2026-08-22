<script lang="ts">
	import { magnetic } from '$lib/actions/magnetic';
	import { reveal } from '$lib/actions/reveal';
	import Sigil from './Sigil.svelte';
</script>

<div class="section-divider veil flex items-center justify-center gap-6 py-10" use:reveal>
	<span class="thread thread-left"></span>

	<div class="magnetic sigil-holder" use:magnetic={{ strength: 0.35, max: 8 }}>
		<Sigil class="sigil sigil-breathe h-6 w-6 text-primary" />
		<span class="halo"></span>
	</div>

	<span class="thread thread-right"></span>
</div>

<style>
	.thread {
		display: block;
		height: 1px;
		width: 4rem;
		background: linear-gradient(90deg, transparent, rgba(255, 82, 82, 0.45));
		transition:
			width 0.9s var(--ease-ritual),
			opacity 0.9s ease;
		opacity: 0.6;
	}

	.thread-right {
		background: linear-gradient(90deg, rgba(255, 82, 82, 0.45), transparent);
	}

	.section-divider:hover .thread {
		width: 7rem;
		opacity: 1;
	}

	.sigil-holder {
		position: relative;
		display: grid;
		place-items: center;
	}

	.sigil-holder :global(.sigil) {
		position: relative;
		z-index: 1;
	}

	/* A ring of light that opens outward when the mark is approached. */
	.halo {
		position: absolute;
		inset: -0.75rem;
		border: 1px solid rgba(255, 82, 82, 0.35);
		border-radius: 50%;
		opacity: 0;
		transform: scale(0.6);
		transition:
			opacity 0.7s ease,
			transform 0.7s var(--ease-ritual);
		pointer-events: none;
	}

	.sigil-holder:hover .halo {
		opacity: 1;
		transform: scale(1);
	}

	.sigil-holder:hover :global(.sigil) {
		transform: rotate(180deg) scale(1.15);
		filter: drop-shadow(0 0 14px rgba(255, 82, 82, 0.75));
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.thread,
		.halo,
		.sigil-holder :global(.sigil) {
			transition: none;
		}
	}
</style>
