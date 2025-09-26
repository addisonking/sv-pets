<script lang="ts">
  import type { AnimalState } from '../types';
  import { animals } from '$lib/data/animals';

  let { animal = 'fox', state = 'idle', size = 48 }: { animal: string; state: AnimalState; size?: number } = $props();

  const getSprite = (animal: string, state: AnimalState): string => {
    const frames = animals[animal as keyof typeof animals]?.[state];
    
    return Array.isArray(frames) ? frames[0] : frames ?? '';
  };
</script>

<img src={getSprite(animal, state)} alt="{animal} - {state}" width={size} height={size} />

<style>
	img {
		display: block;
		user-select: none;
		pointer-events: none;
	}
</style>