import {describe, vi, it, expect} from 'vitest';
import version from '../index';

describe('version-file-rollup-plugin', () => {
    it('crashes with a hopefully helpful error message on fs errors', async () => {
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
                            writeFile: () => new Promise((_, reject) => reject('awwawawawawawww!')),
                            close: () => new Promise(resolveThis => resolveThis(true)),
                        });
                    }),
                },
            };
        });

        const thrower = async () => {
            const plugin = version();
            await plugin.writeBundle();
        };

        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        await expect(thrower).rejects.toThrowError();
        expect(errorSpy).toHaveBeenCalledWith('version-file: Could not write version to output file', './public/version');
    });
});
