// Copies ../../template into ./template before packing, ready to be published:
// `.gitignore` is renamed (npm would leave it out), and the workspace link to `@asbedb/melan` becomes
// the version being released alongside this package.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(here, '../../../template');
const dest = path.resolve(here, '../template');
const melanPkg = path.resolve(here, '../../melan/package.json');
const MELAN = '@asbedb/melan';

/** Build output, installed packages and local files that don't belong in a new blog. */
const SKIP = new Set(['node_modules', '.svelte-kit', 'build', '.vercel', '.netlify', '.wrangler']);

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(source, dest, {
	recursive: true,
	filter: (file) => !SKIP.has(path.basename(file))
});

fs.renameSync(path.join(dest, '.gitignore'), path.join(dest, '_gitignore'));

const { version } = JSON.parse(fs.readFileSync(melanPkg, 'utf-8'));
const pkgPath = path.join(dest, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
for (const deps of [pkg.dependencies, pkg.devDependencies]) {
	if (deps?.[MELAN]) deps[MELAN] = `^${version}`;
}
fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, '\t')}\n`);

console.log(
	`Copied the template into ${path.relative(process.cwd(), dest)} (${MELAN} ^${version})`
);
