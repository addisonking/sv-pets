import type { AnimalBehavior, AnimalSprite } from '$lib/types';

export const fox: { sprites: AnimalSprite; behavior: AnimalBehavior } = {
	sprites: {
		idle: 'https://raw.githubusercontent.com/tonybaloney/vscode-pets/refs/heads/main/media/fox/red_idle_8fps.gif',
		walk: 'https://raw.githubusercontent.com/tonybaloney/vscode-pets/refs/heads/main/media/fox/red_walk_8fps.gif',
		run: 'https://raw.githubusercontent.com/tonybaloney/vscode-pets/refs/heads/main/media/fox/red_run_8fps.gif',
		lie: 'https://raw.githubusercontent.com/tonybaloney/vscode-pets/refs/heads/main/media/fox/red_lie_8fps.gif',
		swipe:
			'https://raw.githubusercontent.com/tonybaloney/vscode-pets/refs/heads/main/media/fox/red_swipe_8fps.gif'
	},
	behavior: {
		canJump: true,
		canSleep: true,
		actionProbabilities: { walk: 0.5, stop: 0.3, sleep: 0.2 }
	}
};
