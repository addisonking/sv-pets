import type { AnimalState, AnimalSprite } from '../types';
type $$ComponentProps = {
    size?: number;
    state: AnimalState;
    sprites?: AnimalSprite;
};
declare const Animal: import("svelte").Component<$$ComponentProps, {}, "">;
type Animal = ReturnType<typeof Animal>;
export default Animal;
