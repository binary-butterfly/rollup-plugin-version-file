# rollup plugin version file

[![Coverage Status](https://coveralls.io/repos/github/binary-butterfly/rollup-plugin-version-file/badge.svg)](https://coveralls.io/github/binary-butterfly/rollup-plugin-version-file)

This is a very small rollup plugin to save the current version from your package.json to a static file during the build
process.

## Usage

First install the plugin `npm i --save-dev @binary-butterfly/rollup-plugin-version-file`.
Then, in your rollup config add it to the plugins array:

```js
import versionFile from '@binary-butterfly/rollup-plugin-version-file';

{
    // ... other config
    plugins: [
        // ... other plugins
        versionFile({
            'outputPath': './public/version',
            'packageFilePath': './package.json',
            'log': true,
        })
    ]
    // ... other config
}
```

The config parameters given in that example are the defaults, so if you want to use these settings, you can not provide
any value for them.

## Config parameters

- `outputPath`: Where to store the version file, relative to your project root directory
- `packageFilePath`: Where to find your `package.json` file, relative to your project root directory
- `log`: If you want the plugin to log what it wrote once it is done
