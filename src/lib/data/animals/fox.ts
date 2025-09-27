import type { AnimalData } from '$lib/types';
import idleGif from '$lib/assets/animals/fox/idle.gif';
import walkGif from '$lib/assets/animals/fox/walk.gif';
import swipeGif from '$lib/assets/animals/fox/swipe.gif';
import lieGif from '$lib/assets/animals/fox/lie.gif';
import runGif from '$lib/assets/animals/fox/run.gif';

const fox: AnimalData = {
	sprites: { idle: idleGif, walk: walkGif, swipe: swipeGif, lie: lieGif, run: runGif },
	behavior: {
		canJump: true,
		canSleep: true,
		canRun: true,
		actionProbabilities: { walk: 0.4, stop: 0.3, sleep: 0.2, run: 0.1 }
	}
};

export default fox;
