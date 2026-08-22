<script lang="ts">
	import Sigil from './Sigil.svelte';

	const NAV_ITEMS = [
		{ href: '/', label: 'Home' },
		{ href: '/#tour', label: 'Performances' },
		{ href: '/#album', label: 'Latest Release' },
		{ href: '/music', label: 'Music' },
		{ href: '/#about', label: 'About' },
		{ href: '/#contact', label: 'Contact' }
	];

	let { isOpen = $bindable(false) } = $props();

	function closeMenu() {
		isOpen = false;
	}
</script>

<!-- Hamburger — the bars fold into a cross -->
<div class="toggle-mobile-but lg:hidden">
	<button
		class="mobile-but relative h-6 w-8 cursor-pointer border-0 bg-transparent p-0"
		onclick={() => (isOpen = !isOpen)}
		aria-label="Toggle mobile menu"
		aria-expanded={isOpen}
	>
		<div class="lines">
			<span
				class="absolute block h-0.5 w-full bg-white transition-all duration-500 {isOpen
					? 'top-1/2 -translate-y-1/2 rotate-45 bg-primary'
					: 'top-0'}"
			></span>
			<span
				class="absolute top-1/2 block h-0.5 w-full -translate-y-1/2 bg-white transition-all duration-300 {isOpen
					? 'scale-x-0 opacity-0'
					: 'scale-x-100 opacity-100'}"
			></span>
			<span
				class="absolute block h-0.5 w-full bg-white transition-all duration-500 {isOpen
					? 'top-1/2 -translate-y-1/2 -rotate-45 bg-primary'
					: 'bottom-0'}"
			></span>
		</div>
	</button>
</div>

<!-- Mobile menu -->
{#if isOpen}
	<nav class="mobile-menu fixed top-[80px] right-0 left-0 z-40 overflow-hidden lg:hidden">
		<ul class="m-0 flex list-none flex-col p-0">
			{#each NAV_ITEMS as item, index (item.href)}
				<li class="menu-row border-b border-white/10" style="--row-delay: {index * 55}ms">
					<a
						href={item.href}
						class="group font-nav flex w-full items-center gap-3 px-6 py-4 text-left text-xs font-semibold tracking-wider text-white uppercase no-underline transition-colors duration-300 hover:text-primary"
						onclick={closeMenu}
					>
						<Sigil
							class="row-mark h-2 w-2 shrink-0 text-primary opacity-0 transition-all duration-500 group-hover:opacity-100"
						/>
						<span class="transition-transform duration-500 group-hover:translate-x-1">
							{item.label}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	.mobile-menu {
		background: linear-gradient(180deg, rgba(9, 13, 17, 0.97), rgba(5, 7, 10, 0.99));
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(255, 82, 82, 0.16);
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
	}

	/* Each entry surfaces a beat after the one above it. */
	.menu-row {
		animation: row-in 0.55s var(--ease-ritual) var(--row-delay, 0ms) both;
	}

	@keyframes row-in {
		from {
			opacity: 0;
			transform: translate3d(0, -10px, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	.menu-row a:hover :global(.row-mark) {
		transform: rotate(180deg);
	}

	@media (prefers-reduced-motion: reduce) {
		.menu-row {
			animation: none;
		}
	}
</style>
