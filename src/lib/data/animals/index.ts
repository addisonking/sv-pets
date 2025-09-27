import type { AnimalData } from '$lib/types';

// Dynamically import all TS files in the folder
const modules: Record<string, { default: AnimalData }> = import.meta.glob('./*.ts', {
	eager: true
});

export const animals: Record<string, AnimalData> = {};

// Convert file paths to animal names
for (const path in modules) {
	const match = path.match(/\.\/(.*)\.ts$/);
	if (!match) continue;
	const name = match[1];
	animals[name] = modules[path].default;
}
