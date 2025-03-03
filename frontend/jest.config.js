export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
        // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '.(gif|ttf|eot|svg|png)$': '<rootDir class="root">/src/__mocks__/fileMock.js',
        '.(css)$': '<rootDir>/src/__mocks__/cssStub.js',
    },
}