import {beforeEach, describe, expect, it, vi} from 'vitest';
import version from '../index';

describe('version-file rollup plugin', () => {
    beforeEach(() => {
        vi.mock('path', async (importOriginal) => {
            const mod = await importOriginal() as object;
            return {
                ...mod,
                resolve: (string: string) => string,
            };
        });

        vi.mock('fs', async (importOriginal) => {
            const mod = await importOriginal() as object;
            return {
                ...mod,
                readFileSync: () => '{"version": "1.0.0"}',
                promises: {
                    open: () => new Promise((resolve) => {
                        resolve({
                            writeFile: () => new Promise(resolveThis => resolveThis(true)),
                            close: () => new Promise(resolveThis => resolveThis(true)),
                        });
                    }),
                },
            };
        });
    });

    it('can write version file with default config', async () => {
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
        const plugin = version();
        await plugin.writeBundle();
        expect(logSpy).toHaveBeenCalledWith('version-file: Logged version:', '1.0.0', 'to file:', './public/version');
    });

    it('can write version file and suppress the log message', async () => {
        const logSpy = vi.spyOn(console, 'log');
        const plugin = version({outputPath: 'test', packageFilePath: './test', log: false});
        await plugin.writeBundle();
        expect(logSpy).not.toHaveBeenCalled();
    });
});
