import type { AnimalBehavior, AnimalSprite } from '$lib/types';
import idleGif from '$lib/assets/animals/fox/idle.gif';
import walkGif from '$lib/assets/animals/fox/walk.gif';
import swipeGif from '$lib/assets/animals/fox/swipe.gif';
import lieGif from '$lib/assets/animals/fox/lie.gif';

export const fox: { sprites: AnimalSprite; behavior: AnimalBehavior } = {
	sprites: {
		idle: idleGif,
		walk: walkGif,
		swipe: swipeGif,
		lie: lieGif
	},
	behavior: {
		canJump: true,
		canSleep: true,
		actionProbabilities: { walk: 0.5, stop: 0.3, sleep: 0.2 }
	}
};