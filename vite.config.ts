import {ConfigEnv, loadEnv, UserConfigExport} from 'vite';
import {defineConfig} from 'vitest/config';
import dts from 'vite-plugin-dts';
import path from 'path';

export default ({mode}: ConfigEnv): UserConfigExport => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        plugins: [
            dts({tsconfigPath: 'build.tsconfig.json'}),
        ],
        build: {
            sourcemap: true,
            lib: {
                entry: path.resolve(__dirname, 'src/index.ts'),
                name: 'rollup-plugin-version-to-file',
                fileName: 'rollup-plugin-version-to-file',
            },
        },
        test: {
            globals: true,
            coverage: {
                reporter: ['text', 'clover', 'json', 'cobertura'],
                all: true,
                include: ['src/index.ts'],
                provider: 'v8',
            },
            restoreMocks: true,
        },
    });
};
