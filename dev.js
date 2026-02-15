const concurrently = require('concurrently');

/**
 * Portable Development Runner
 * Directly uses the concurrently Node API for maximum stability 
 * across Windows, macOS, and Linux. No emojis used.
 */

const args = process.argv.slice(2).filter(arg => arg !== '--');
const clientArgs = args.length > 0 ? ` -- ${args.join(' ')}` : '';

console.log('Starting development environment...');

const { result } = concurrently([
    {
        command: 'npm run dev --prefix server',
        name: 'server',
        prefixColor: 'blue'
    },
    {
        command: `npm run dev --prefix client${clientArgs}`,
        name: 'client',
        prefixColor: 'green'
    }
], {
    killOthers: ['failure', 'success'],
    restartDelay: 0,
});

result.then(
    () => process.exit(0),
    () => process.exit(1)
);
