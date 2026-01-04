export function smoothScroll(targetId: string, offset: number = -60) {
	const target = document.getElementById(targetId);
	if (!target) return;

	const targetPosition = target.getBoundingClientRect().top + window.scrollY;
	const offsetPosition = targetPosition + offset;

	window.scrollTo({
		top: offsetPosition,
		behavior: 'smooth'
	});
}
