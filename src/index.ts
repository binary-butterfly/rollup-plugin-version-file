import {readFileSync, promises} from 'fs';
import {resolve} from 'path';

type PluginOptionsType = {
    outputPath?: string,
    packageFilePath?: string,
    log?: boolean,
};

const version = (options: PluginOptionsType = {}) => {
    const outputPath = options.outputPath ?? './public/version';
    const packageFilePath = options.packageFilePath ?? './package.json';
    const log = options.log ?? true;

    return {
        name: 'version-file',
        writeBundle: async () => {
            let versionCode;
            try {
                versionCode = JSON.parse(readFileSync(resolve(packageFilePath), 'utf-8'))!.version;
            } catch (e) {
                console.error('version-file: Could not read version from package file', packageFilePath);
                throw e;
            }

            try {
                const file = await promises.open(resolve(outputPath), 'w');
                await file.writeFile(versionCode + '\n');
                await file.close();
            } catch (e) {
                console.error('version-file: Could not write version to output file', outputPath);
                throw e;
            }

            if (log) {
                console.log('version-file: Logged version:', versionCode, 'to file:', outputPath);
            }
        },
    };
};

export default version;
