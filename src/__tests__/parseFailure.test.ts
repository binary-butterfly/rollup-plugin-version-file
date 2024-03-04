import {describe, expect, it, vi} from 'vitest';
import version from '../index';

describe('version-file rollup plugin', () => {
    it('fails with a hopefully helpful error message if parsing package file fails', async () => {
        vi.mock('fs', async (importOriginal) => {
            const mod = await importOriginal() as object;
            return {
                ...mod,
                readFileSync: () => 'Banana!',
            };
        });

        const thrower = async () => {
            const plugin = version();
            await plugin.writeBundle();
        };

        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        await expect(thrower).rejects.toThrowError();
        expect(errorSpy).toHaveBeenCalledWith('version-file: Could not read version from package file', './package.json');
    });
});
