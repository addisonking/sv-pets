<script lang="ts">
	import Animal from './Animal.svelte';
	import type { AnimalState } from '../types';
	import { onMount } from 'svelte';
	import { animals } from '../data/animals';

	let { animal, size = 48 }: { animal: string; size?: number } = $props();

	let nestEl: HTMLDivElement;
	let animalEl: HTMLDivElement;

	let currentState: AnimalState = $state('idle');
	let x = 0, y = 0, vx = 2, vy = 0;
	let onGround = true;
	let facingRight = true;

	const GRAVITY = 0.5;
	const JUMP_STRENGTH = size / 4;
	const ACTION_INTERVAL = [1500, 3500];

	// Get animal data
	const animalData = animals[animal];
	if (!animalData) throw new Error(`No data found for animal: ${animal}`);
	const { sprites, behavior } = animalData;

	const actionToState: Record<string, AnimalState> = {
		walk: 'walk',
		run: 'run',
		stop: 'idle',
		sleep: behavior.canSleep ? 'lie' : 'idle'
	};

	let action: keyof typeof actionToState = 'stop';

	// Decide next action randomly
	function decideNextAction() {
		const probs = behavior.actionProbabilities ?? { walk: 0.5, run: 0.2, stop: 0.2, sleep: 0.1 };
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

		if ((action === 'walk' || action === 'run') && onGround && behavior.canJump && Math.random() < 0.3) {
			vy = -JUMP_STRENGTH;
			onGround = false;
			currentState = 'swipe';
		}

		const [min, max] = ACTION_INTERVAL;
		setTimeout(decideNextAction, min + Math.random() * (max - min));
	}

	// Animation loop
	function animate() {
		if (!nestEl || !animalEl) return;

		const { width: containerWidth, height: containerHeight } = nestEl.getBoundingClientRect();
		const { offsetWidth: animalWidth, offsetHeight: animalHeight } = animalEl;

		// Horizontal speed based on action
		const speed = action === 'run' ? vx * 2 : vx;

		if (action === 'walk' || action === 'run') {
			x += facingRight ? speed : -speed;

			// Bounce at edges
			if (x + animalWidth > containerWidth) {
				x = containerWidth - animalWidth;
				facingRight = false;
			} else if (x < 0) {
				x = 0;
				facingRight = true;
			}
		}

		// Vertical movement / gravity
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