#!/usr/bin/env node
// `pnpm create melan [folder]`: copies the template bundled with this package into a new folder.
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const TEMPLATE_DIR = fileURLToPath(new URL('../template', import.meta.url));
const DEFAULT_DIR = 'my-blog';

const HELP = `
Usage: create-melan [folder]

Creates a new Melan blog in [folder], or asks for one.
`;

/** The package manager that ran us, from `npm_config_user_agent` (e.g. `pnpm/12.14.0 …`). */
function packageManager(): string {
	const agent = process.env.npm_config_user_agent ?? '';
	const name = agent.split('/')[0];
	return ['pnpm', 'yarn', 'bun', 'npm'].includes(name) ? name : 'npm';
}

/** A valid npm package name made from the folder name. */
function toPackageName(dir: string): string {
	return (
		path
			.basename(dir)
			.toLowerCase()
			.replace(/[^a-z0-9._~-]+/g, '-')
			.replace(/^[._-]+|-+$/g, '') || DEFAULT_DIR
	);
}

async function askForDir(): Promise<string> {
	if (!process.stdin.isTTY) return DEFAULT_DIR;
	const rl = createInterface({ input: process.stdin, output: process.stdout });
	const answer = await rl.question(`Where should the blog go? (${DEFAULT_DIR}) `);
	rl.close();
	return answer.trim() || DEFAULT_DIR;
}

async function main() {
	const arg = process.argv[2];
	if (arg === '--help' || arg === '-h') {
		console.log(HELP);
		return;
	}

	const dir = arg ?? (await askForDir());
	const target = path.resolve(dir);
	if (fs.existsSync(target) && fs.readdirSync(target).length > 0) {
		console.error(`\n${dir} already exists and isn't empty. Pick another folder.\n`);
		process.exit(1);
	}

	fs.cpSync(TEMPLATE_DIR, target, { recursive: true });
	// npm leaves `.gitignore` files out of published packages, so the template ships it renamed.
	fs.renameSync(path.join(target, '_gitignore'), path.join(target, '.gitignore'));

	const pkgPath = path.join(target, 'package.json');
	const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
	pkg.name = toPackageName(target);
	fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, '\t')}\n`);

	const pm = packageManager();
	const run = pm === 'npm' ? 'npm run' : pm;
	const cd = path.relative(process.cwd(), target) || '.';
	console.log(`
Your blog is ready in ${cd}. Next:

  cd ${cd}
  ${pm} install
  ${run} dev

Then open melan.config.ts to make it yours.
Docs: https://github.com/asbedb/melan/tree/main/docs
`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
