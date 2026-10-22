// Prints the changelog entry for a release tag such as `@asbedb/melan@0.2.0`, for the GitHub
// release the release workflow creates. Usage: node scripts/release-notes.ts <tag>
import fs from 'node:fs';
import path from 'node:path';

const tag = process.argv[2];
const match = tag?.match(/^(.+)@(\d+\.\d+\.\d+.*)$/);
if (!match) {
	console.error(`Expected a tag like @asbedb/melan@0.2.0, got "${tag ?? ''}"`);
	process.exit(1);
}
const [, name, version] = match;

const packagesDir = path.resolve(import.meta.dirname, '../packages');
const dir = fs
	.readdirSync(packagesDir)
	.map((d) => path.join(packagesDir, d))
	.find((d) => {
		const pkg = path.join(d, 'package.json');
		return fs.existsSync(pkg) && JSON.parse(fs.readFileSync(pkg, 'utf-8')).name === name;
	});
if (!dir) {
	console.error(`No package named ${name} in packages/`);
	process.exit(1);
}

// The entry runs from its `## <version>` heading to the next version heading.
const changelog = fs.readFileSync(path.join(dir, 'CHANGELOG.md'), 'utf-8').replace(/\r\n/g, '\n');
const start = changelog.indexOf(`\n## ${version}\n`);
if (start === -1) {
	console.log(`See the changelog for ${version}.`);
	process.exit(0);
}
const body = changelog.slice(changelog.indexOf('\n', start + 1) + 1);
const end = body.search(/^## /m);
console.log((end === -1 ? body : body.slice(0, end)).trim());
