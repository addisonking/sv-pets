<script lang="ts">
	import Animal from './Animal.svelte';
	import type { AnimalState, AnimalBehavior } from '../types';
	import { onMount } from 'svelte';

	let {
		animal = 'fox',
		size = 48,
		initialState = 'idle'
	}: { animal: string; size?: number; initialState?: AnimalState } = $props();

	let nestEl: HTMLDivElement;
	let animalEl: HTMLDivElement;

	let currentState: AnimalState = $state(initialState);
	let x = 0;
	let y = 0;
	let vx = 2;
	let vy = 0;
	let onGround = true;
	let action: 'walk' | 'stop' | 'sleep' = 'stop';
	let facingRight = true;

	const GRAVITY = 0.5;
	const JUMP_STRENGTH = size / 4; // Jump height scales with size
	const ACTION_INTERVAL = [1500, 3500]; // min/max ms

	// Behavior map per animal
	const behaviors: Record<string, AnimalBehavior> = {
		fox: { canJump: true, canSleep: true },
		turtle: { canJump: false, canSleep: false }
	};

	const animalBehavior = behaviors[animal] ?? {};

	function decideNextAction() {
		// Probabilities (defaults)
		const probs = animalBehavior.actionProbabilities ?? { walk: 0.5, stop: 0.4, sleep: 0.1 };
		const r = Math.random();
		let cumulative = 0;

		// Determine action respecting behavior constraints
		for (const [act, p] of Object.entries(probs)) {
			cumulative += p;
			if (r < cumulative) {
				action = act as typeof action;
				break;
			}
		}

		// Sleep only if supported and has 'lie' animation
		if (action === 'sleep' && !animalBehavior.canSleep) {
			action = 'stop';
		}

		// Update state
		currentState = action === 'walk' ? 'walk' : action === 'sleep' ? 'lie' : 'idle';

		// Random jump if allowed
		if (action === 'walk' && onGround && animalBehavior.canJump && Math.random() < 0.3) {
			currentState = 'swipe';
			vy = -JUMP_STRENGTH;
			onGround = false;
		}

		const [min, max] = ACTION_INTERVAL;
		setTimeout(decideNextAction, min + Math.random() * (max - min));
	}

	function animate() {
		if (!nestEl || !animalEl) return;

		const { width: containerWidth, height: containerHeight } = nestEl.getBoundingClientRect();
		const { offsetWidth: animalWidth, offsetHeight: animalHeight } = animalEl;

		// Horizontal
		if (action === 'walk') {
			x += vx;
			if (x + animalWidth > containerWidth || x < 0) {
				vx = -vx;
				x += vx;
			}
			facingRight = vx > 0;
		}

		// Vertical
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
		<Animal {animal} {size} state={currentState} />
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
