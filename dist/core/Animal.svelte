<script lang="ts">
	import type { AnimalState, AnimalSprite } from '../types';

	let {
		size = 48,
		state = 'idle',
		sprites
	}: { size?: number; state: AnimalState; sprites?: AnimalSprite } = $props();

	const getSprite = (s: AnimalState): string => {
		if (!sprites) return '';
		const frames = sprites[s];
		return Array.isArray(frames) ? frames[0] : (frames ?? '');
	};
</script>

<img src={getSprite(state)} alt={state} width={size} height={size} />

<style>
	img {
		display: block;
		user-select: none;
		pointer-events: none;
	}
</style>
