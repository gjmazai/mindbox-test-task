
export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest" 
    // process `*.tsx` files with `ts-jest`
    },
		// moduleNameMapper: {
		// 	'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/__ mocks __/fileMock.js'
		// },
		globals: {
			'ts-jest': {
				"tsConfig": '<rootDir>/tsconfig.app.json'
			}
		},

}
