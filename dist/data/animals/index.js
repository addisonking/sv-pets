// Dynamically import all TS files in the folder
const modules = import.meta.glob('./*.ts', {
    eager: true
});
export const animals = {};
// Convert file paths to animal names
for (const path in modules) {
    const match = path.match(/\.\/(.*)\.ts$/);
    if (!match)
        continue;
    const name = match[1];
    animals[name] = modules[path].default;
}
