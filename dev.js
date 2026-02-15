const { execSync } = require('child_process');

// Get arguments (e.g., --host)
const args = process.argv.slice(2).filter(arg => arg !== '--');
const clientArgs = args.length > 0 ? ` -- ${args.join(' ')}` : '';

const command = `npx concurrently "npm run dev --prefix server" "npm run dev --prefix client${clientArgs}"`;

console.log(`🚀 Executing: ${command}`);

try {
    execSync(command, { stdio: 'inherit' });
} catch (e) {
    // Silent exit, concurrently handles errors
}
