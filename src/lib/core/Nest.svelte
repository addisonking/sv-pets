<script lang="ts">
	import Animal from './Animal.svelte';
	import type { AnimalState } from '$lib/types';
	import { onMount } from 'svelte';
	import { animals } from '$lib/data/animals';

	let { animal, size = 48 }: { animal: string; size?: number } = $props();

	let nestEl: HTMLDivElement;
	let animalEl: HTMLDivElement;

	let currentState: AnimalState = $state('idle');
	let x = 0,
		y = 0,
		vx = 2,
		vy = 0;
	let onGround = true;
	let facingRight = true;

	const GRAVITY = 0.5;
	const JUMP_STRENGTH = size / 4;
	const ACTION_INTERVAL = [1500, 3500];

	const animalData = animals[animal as keyof typeof animals];

	if (!animalData) {
		throw new Error(`No data found for animal: ${animal}`);
	}

	const { sprites, behavior } = animalData;

	const actionToState: Record<string, AnimalState> = {
		walk: 'walk',
		stop: 'idle',
		sleep: behavior.canSleep ? 'lie' : 'idle'
	};

	let action: keyof typeof actionToState = 'stop';

	function decideNextAction() {
		const probs = behavior.actionProbabilities ?? { walk: 0.5, stop: 0.4, sleep: 0.1 };
		const r = Math.random();
		let cumulative = 0;

		for (const [act, p] of Object.entries(probs)) {
			cumulative += p;
			if (r < cumulative) {
				action = act as typeof action;
				break;
			}
		}

		currentState = actionToState[action];

		if (action === 'walk' && onGround && behavior.canJump && Math.random() < 0.3) {
			vy = -JUMP_STRENGTH;
			onGround = false;
			currentState = 'swipe';
		}

		const [min, max] = ACTION_INTERVAL;
		setTimeout(decideNextAction, min + Math.random() * (max - min));
	}

	function animate() {
		if (!nestEl || !animalEl) return;

		const { width: containerWidth, height: containerHeight } = nestEl.getBoundingClientRect();
		const { offsetWidth: animalWidth, offsetHeight: animalHeight } = animalEl;

		if (action === 'walk') {
			x += vx;
			if (x + animalWidth > containerWidth || x < 0) {
				vx = -vx;
				x += vx;
			}
			facingRight = vx > 0;
		}

		if (!onGround) {
			vy += GRAVITY;
			y += vy;
			if (y >= containerHeight - animalHeight) {
				y = containerHeight - animalHeight;
				vy = 0;
				onGround = true;
			}
		} else {
			y = containerHeight - animalHeight;
		}

		Object.assign(animalEl.style, {
			left: `${x}px`,
			top: `${y}px`,
			transform: `scaleX(${facingRight ? 1 : -1})`
		});

		requestAnimationFrame(animate);
	}

	onMount(() => {
		if (!nestEl) return;
		y = nestEl.getBoundingClientRect().height - animalEl.offsetHeight;
		decideNextAction();
		animate();
	});
</script>

<div class="nest" bind:this={nestEl}>
	<div bind:this={animalEl} style="position: absolute; transform-origin: center;">
		<Animal {size} state={currentState} sprites={sprites ?? {}} />
	</div>
</div>

<style>
	.nest {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
</style>
