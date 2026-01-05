<script lang="ts">
	import { onMount } from 'svelte';
	import { smoothScroll } from '$lib/utils/smoothScroll';
	import MobileMenu from './MobileMenu.svelte';

	let scrolled = $state(false);
	let scrollY = $state(0);
	let mobileMenuOpen = $state(false);

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
			scrolled = scrollY > 500;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function handleNavClick(targetId: string) {
		smoothScroll(targetId);
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<header
	class="header {scrolled
		? 'fixed top-0 left-0 right-0 bg-white shadow-md'
		: 'absolute top-0 left-0 right-0'} w-full z-40 transition-all duration-300 px-6 py-4"
>
	<div class="flex items-center justify-between">
		<!-- Logo -->
		<div class="left-part">
			<button
				class="logo uppercase font-heading font-bold text-2xl tracking-wider {scrolled
					? 'text-dark'
					: 'text-white'} transition-colors border-0 bg-transparent cursor-pointer p-0"
				onclick={scrollToTop}
			>
				VRS:NSMV
			</button>
		</div>

		<!-- Desktop Navigation -->
		<div class="right-part">
			<nav class="main-nav">
				<!-- Mobile Menu Component -->
				<MobileMenu bind:isOpen={mobileMenuOpen} />

				<!-- Desktop Menu -->
				<ul class="main-menu hidden lg:flex items-center gap-8 m-0 p-0 list-none">
					<li>
						<button
							class="font-nav font-semibold text-xs uppercase {scrolled
								? 'text-dark'
								: 'text-white'} tracking-wider hover:text-primary transition-colors border-0 bg-transparent cursor-pointer"
							onclick={scrollToTop}
						>
							Home
						</button>
					</li>
					<li>
						<button
							class="font-nav font-semibold text-xs uppercase {scrolled
								? 'text-dark'
								: 'text-white'} tracking-wider hover:text-primary transition-colors border-0 bg-transparent cursor-pointer"
							onclick={() => handleNavClick('tour')}
						>
							Performances
						</button>
					</li>
					<li>
						<button
							class="font-nav font-semibold text-xs uppercase {scrolled
								? 'text-dark'
								: 'text-white'} tracking-wider hover:text-primary transition-colors border-0 bg-transparent cursor-pointer"
							onclick={() => handleNavClick('album')}
						>
							Latest Release
						</button>
					</li>
					<li>
						<a
							href="/music"
							class="font-nav font-semibold text-xs uppercase {scrolled
								? 'text-dark'
								: 'text-white'} tracking-wider hover:text-primary transition-colors no-underline"
						>
							Music
						</a>
					</li>
					<li>
						<button
							class="font-nav font-semibold text-xs uppercase {scrolled
								? 'text-dark'
								: 'text-white'} tracking-wider hover:text-primary transition-colors border-0 bg-transparent cursor-pointer"
							onclick={() => handleNavClick('about')}
						>
							About
						</button>
					</li>
					<li>
						<button
							class="font-nav font-semibold text-xs uppercase {scrolled
								? 'text-dark'
								: 'text-white'} tracking-wider hover:text-primary transition-colors border-0 bg-transparent cursor-pointer"
							onclick={() => handleNavClick('contact')}
						>
							Contact
						</button>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</header>
