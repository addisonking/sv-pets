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
	canRun?: boolean;
	actionProbabilities?: Partial<Record<'walk' | 'stop' | 'sleep' | 'run', number>>;
}

export interface AnimalData {
	sprites: AnimalSprite;
	behavior: AnimalBehavior;
}
