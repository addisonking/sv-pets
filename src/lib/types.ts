export type AnimalState = 'idle' | 'walk' | 'run' | 'lie' | 'swipe';

export interface AnimalSprite {
	idle: string;
	walk: string;
	run?: string;
	lie?: string;
	swipe?: string;
}

export interface AnimalBehavior {
	canJump?: boolean;
	canSleep?: boolean;
	actionProbabilities?: Partial<Record<'walk' | 'stop' | 'sleep', number>>;
}

export interface AnimalData {
	sprites: AnimalSprite;
	behavior: AnimalBehavior;
}
