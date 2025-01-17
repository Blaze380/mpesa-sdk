/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	testEnvironment: 'node',
	transform: {
		'^.+.tsx?$': ['ts-jest', {}],
	},
	testMatch: ['**/tests/**/*.ts', '**/?(*.)+(spec|test).ts'],
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{ts}'],
};
