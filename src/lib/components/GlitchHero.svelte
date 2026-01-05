<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	interface Props {
		youtubeId?: string;
	}

	let { youtubeId = '' }: Props = $props();
	let isMobile = $state(false);

	onMount(() => {
		isMobile = window.innerWidth < 768;

		// Update on resize
		const handleResize = () => {
			isMobile = window.innerWidth < 768;
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<section id="wrapper" class="glitch-hero relative h-screen overflow-hidden">
	<!-- Background layer with YouTube video or fallback image -->
	<div class="bg-layer absolute inset-0 bg-[#151514]">
		{#if browser && youtubeId && !isMobile}
			<!-- YouTube video for desktop -->
			<div class="video-wrapper absolute inset-0" aria-hidden="true">
				<iframe
					src="https://www.youtube.com/embed/{youtubeId}?autoplay=1&mute=1&loop=1&playlist={youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&start=12"
					title="VRS:NSMV Live Performance"
					allow="autoplay; fullscreen"
					class="video-iframe"
				></iframe>
			</div>
			<!-- Dark overlay for logo visibility -->
			<div class="absolute inset-0 bg-black/40 z-[1]"></div>
			<!-- Watch on YouTube link -->
			<a
				href="https://www.youtube.com/watch?v={youtubeId}"
				target="_blank"
				rel="noopener noreferrer"
				class="youtube-link absolute bottom-8 right-8 z-[3] font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all duration-300 group"
			>
				<span class="relative inline-block">
					<span class="glitch-text">Watch on YouTube</span>
					<span class="glitch-text glitch-text-shadow" aria-hidden="true">Watch on YouTube</span>
				</span>
				<svg
					class="inline-block w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
					/>
				</svg>
			</a>
		{:else}
			<!-- Fallback: static glitch image (mobile, SSR, or no video ID) -->
			<img
				src="/images/v02_glitch-28-sq.jpg"
				alt=""
				class="w-full h-full object-cover animate-zoom"
			/>
		{/if}
	</div>

	<!-- SVG Logo with RGB split effect -->
	<div class="logo-container absolute inset-0 flex items-center justify-center">
		<div class="logo-glitch">
			<img src="/images/vrsnsmv.svg" alt="VRS:NSMV" class="logo-main" />
		</div>
	</div>

	<!-- Scanline overlay -->
	<div class="scanlines absolute inset-0" aria-hidden="true"></div>

	<!-- Glitch distortion layers -->
	<div class="glitch-layer glitch-1 absolute inset-0" aria-hidden="true"></div>
	<div class="glitch-layer glitch-2 absolute inset-0" aria-hidden="true"></div>
</section>

<style>
	/* Container setup */
	.glitch-hero {
		position: relative;
		transform: translateZ(0); /* Create compositing layer for GPU acceleration */
	}

	/* Background layer */
	.bg-layer {
		z-index: 1;
	}

	/* Video wrapper */
	.video-wrapper {
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
	}

	.video-iframe {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100vw;
		height: 100vh;
		min-width: 100%;
		min-height: 100%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		border: none;
	}

	/* Scale iframe to cover - handles both landscape and portrait viewports */
	@media (aspect-ratio > 16/9) {
		.video-iframe {
			width: 100vw;
			height: 56.25vw; /* 16:9 aspect ratio */
		}
	}

	@media (aspect-ratio < 16/9) {
		.video-iframe {
			width: 177.78vh; /* 16:9 aspect ratio */
			height: 100vh;
		}
	}

	/* Logo container and sizing */
	.logo-container {
		z-index: 2;
		pointer-events: none;
	}

	.logo-glitch {
		position: relative;
		width: 70vw;
		max-width: 1200px;
		min-width: 400px;
	}

	.logo-main {
		display: block;
		width: 100%;
		height: auto;
		position: relative;
		z-index: 1;
	}

	/* RGB Chromatic Aberration Effect */
	.logo-glitch::before,
	.logo-glitch::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		mask-image: url('/images/vrsnsmv.svg');
		mask-size: contain;
		mask-repeat: no-repeat;
		mask-position: center;
		-webkit-mask-image: url('/images/vrsnsmv.svg');
		-webkit-mask-size: contain;
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center;
		pointer-events: none;
		will-change: transform;
	}

	/* Red channel */
	.logo-glitch::before {
		background-color: #ff0000;
		mix-blend-mode: screen;
		opacity: 0.8;
		animation: rgbSplitRed 4s ease-in-out infinite;
	}

	/* Cyan channel */
	.logo-glitch::after {
		background-color: #00ffff;
		mix-blend-mode: screen;
		opacity: 0.8;
		animation: rgbSplitBlue 4s ease-in-out infinite;
	}

	/* RGB Split Animations */
	@keyframes rgbSplitRed {
		0%,
		100% {
			transform: translate(3px, 0);
		}
		25% {
			transform: translate(5px, -1px);
		}
		50% {
			transform: translate(2px, 1px);
		}
		75% {
			transform: translate(4px, 0);
		}
	}

	@keyframes rgbSplitBlue {
		0%,
		100% {
			transform: translate(-3px, 0);
		}
		25% {
			transform: translate(-2px, 1px);
		}
		50% {
			transform: translate(-5px, -1px);
		}
		75% {
			transform: translate(-4px, 0);
		}
	}

	/* Scanline overlay */
	.scanlines {
		z-index: 10;
		pointer-events: none;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 2px,
			rgba(255, 255, 255, 0.05) 2px,
			rgba(255, 255, 255, 0.05) 4px
		);
		animation: scanlineMove 8s linear infinite;
	}

	@keyframes scanlineMove {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(100%);
		}
	}

	/* Glitch distortion layers */
	.glitch-layer {
		z-index: 9;
		background: rgba(255, 82, 82, 0.1);
		opacity: 0;
		pointer-events: none;
	}

	.glitch-1 {
		animation: glitchSlice1 3.1s steps(2, end) infinite;
	}

	.glitch-2 {
		animation: glitchSlice2 5.7s steps(2, end) infinite;
		animation-delay: 1.3s;
	}

	/* Glitch slice animations - subtle bursts */
	@keyframes glitchSlice1 {
		0%,
		93% {
			opacity: 0;
			clip-path: inset(0 0 100% 0);
		}
		94% {
			opacity: 1;
			clip-path: inset(20% 0 30% 0);
			transform: translateX(-10px);
		}
		96% {
			clip-path: inset(60% 0 20% 0);
			transform: translateX(8px);
		}
		98%,
		100% {
			opacity: 0;
			clip-path: inset(0 0 100% 0);
		}
	}

	@keyframes glitchSlice2 {
		0%,
		91% {
			opacity: 0;
			clip-path: inset(0 0 100% 0);
		}
		92% {
			opacity: 1;
			clip-path: inset(40% 0 50% 0);
			transform: translateX(12px);
		}
		94% {
			clip-path: inset(10% 0 70% 0);
			transform: translateX(-8px);
		}
		96% {
			clip-path: inset(70% 0 15% 0);
			transform: translateX(5px);
		}
		98%,
		100% {
			opacity: 0;
			clip-path: inset(0 0 100% 0);
		}
	}

	/* Subtle flicker on logo */
	.logo-glitch {
		animation: subtleFlicker 7s ease-in-out infinite;
	}

	@keyframes subtleFlicker {
		0%,
		100% {
			filter: brightness(1) contrast(1);
		}
		20% {
			filter: brightness(1.05) contrast(1.02);
		}
		40% {
			filter: brightness(0.98) contrast(0.99);
		}
		60% {
			filter: brightness(1.03) contrast(1.01);
		}
		80% {
			filter: brightness(0.99) contrast(1);
		}
	}

	/* YouTube link styling */
	.youtube-link {
		backdrop-filter: blur(4px);
		background: rgba(0, 0, 0, 0.3);
		padding: 0.5rem 1rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 2px;
	}

	.youtube-link:hover {
		background: rgba(0, 0, 0, 0.5);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.glitch-text {
		display: inline-block;
	}

	.glitch-text-shadow {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		color: #ff5252;
		mix-blend-mode: screen;
	}

	.youtube-link:hover .glitch-text-shadow {
		animation: linkGlitch 0.3s ease-in-out;
	}

	@keyframes linkGlitch {
		0%,
		100% {
			opacity: 0;
			transform: translate(0, 0);
		}
		25% {
			opacity: 0.8;
			transform: translate(-2px, 0);
		}
		50% {
			opacity: 0.8;
			transform: translate(2px, 0);
		}
		75% {
			opacity: 0.8;
			transform: translate(-1px, 0);
		}
	}

	/* Responsive design */
	@media (max-width: 990px) {
		.logo-glitch {
			width: 75vw;
			min-width: 280px;
		}

		/* Reduce glitch intensity on mobile */
		.logo-glitch::before {
			animation: rgbSplitRedMobile 4s ease-in-out infinite;
		}

		.logo-glitch::after {
			animation: rgbSplitBlueMobile 4s ease-in-out infinite;
		}

		@keyframes rgbSplitRedMobile {
			0%,
			100% {
				transform: translate(1.5px, 0);
			}
			25% {
				transform: translate(2.5px, -0.5px);
			}
			50% {
				transform: translate(1px, 0.5px);
			}
			75% {
				transform: translate(2px, 0);
			}
		}

		@keyframes rgbSplitBlueMobile {
			0%,
			100% {
				transform: translate(-1.5px, 0);
			}
			25% {
				transform: translate(-1px, 0.5px);
			}
			50% {
				transform: translate(-2.5px, -0.5px);
			}
			75% {
				transform: translate(-2px, 0);
			}
		}

		.scanlines {
			background: repeating-linear-gradient(
				0deg,
				transparent,
				transparent 2px,
				rgba(255, 255, 255, 0.03) 2px,
				rgba(255, 255, 255, 0.03) 4px
			);
		}

		.glitch-1,
		.glitch-2 {
			/* Reduce distortion on mobile */
			display: none;
		}
	}

	/* Accessibility: Respect reduced motion preference */
	@media (prefers-reduced-motion: reduce) {
		.logo-glitch::before,
		.logo-glitch::after,
		.scanlines,
		.glitch-1,
		.glitch-2,
		.logo-glitch {
			animation: none !important;
		}

		/* Keep static RGB split for visual interest */
		.logo-glitch::before {
			transform: translate(3px, 0);
		}

		.logo-glitch::after {
			transform: translate(-3px, 0);
		}
	}
</style>
