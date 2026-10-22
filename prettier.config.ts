// For the files at the root of the repository: docs, workflows and the like. Each package and
// the template have their own config.
import type { Config } from 'prettier';

const config: Config = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100
};

export default config;
