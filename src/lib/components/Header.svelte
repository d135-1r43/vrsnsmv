<script lang="ts">
	import { onMount } from 'svelte';
	import MobileMenu from './MobileMenu.svelte';
	import { scramble } from '$lib/actions/scramble';

	const NAV_ITEMS = [
		{ href: '/', label: 'Home' },
		{ href: '/#tour', label: 'Performances' },
		{ href: '/#album', label: 'Latest Release' },
		{ href: '/music', label: 'Music' },
		{ href: '/#about', label: 'About' },
		{ href: '/#contact', label: 'Contact' }
	];

	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 500;
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header
	class="header {scrolled
		? 'veiled-bar fixed top-0 right-0 left-0'
		: 'absolute top-0 right-0 left-0'} z-40 w-full px-6 py-4 transition-all duration-500"
>
	<div class="flex items-center justify-between">
		<!-- Wordmark — re-decodes itself when you touch it -->
		<div class="left-part">
			<a
				href="/"
				class="logo font-heading text-2xl font-bold tracking-wider text-white no-underline transition-[letter-spacing,text-shadow] duration-500 hover:tracking-[0.18em] hover:[text-shadow:0_0_24px_rgba(255,82,82,0.6)]"
			>
				<span use:scramble={{ onHover: true, speed: 1.2, spread: 5 }}>VRS:NSMV</span>
			</a>
		</div>

		<!-- Navigation -->
		<div class="right-part">
			<nav class="main-nav">
				<MobileMenu bind:isOpen={mobileMenuOpen} />

				<ul class="main-menu m-0 hidden list-none items-center gap-8 p-0 lg:flex">
					{#each NAV_ITEMS as item (item.href)}
						<li>
							<a
								href={item.href}
								class="rune-link font-nav text-xs font-semibold tracking-wider text-white/85 uppercase no-underline transition-colors duration-300 hover:text-primary"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>
</header>

<style>
	/* Smoked glass rather than a lit panel — the dark never breaks. */
	.veiled-bar {
		background: linear-gradient(180deg, rgba(9, 13, 17, 0.92), rgba(9, 13, 17, 0.78));
		backdrop-filter: blur(14px) saturate(120%);
		-webkit-backdrop-filter: blur(14px) saturate(120%);
		border-bottom: 1px solid rgba(255, 82, 82, 0.16);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.55);
		animation: bar-descend 0.6s var(--ease-ritual) both;
	}

	@keyframes bar-descend {
		from {
			transform: translateY(-100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.veiled-bar {
			animation: none;
		}
	}
</style>
