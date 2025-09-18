import typescript from "@rollup/plugin-typescript";
import nodeResolve from '@rollup/plugin-node-resolve'; // include external dependecy into bundle
import commonjs from '@rollup/plugin-commonjs'; // allow use commonjs modules (needed for react)

import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import replace from '@rollup/plugin-replace';

// clear build folder from previous build
const delConfig = 
{
    targets: ['./build/*']
}	
// copy icons, and manifest file
const addonCopyConfig = 
{
    verbose: true,
    targets: 
    [ 
        { src: "./src/icon/AddonBlockIcon*.png", dest:"./build" },
        { src: "./src/manifest.json", dest:"./build" }
    ],
}
const settingsCopyConfig = 
{
    verbose: true,
    targets:
    [
        { src: "./src/public/*.html", dest : "./build/public" }
    ],
}
/**
 * React `react` module uses `process.env.NODE_ENV` to determinate some properties. 
 * In case of missing throwing errors, hence replace all reference to it by const 
 * value `development`.
 */
const settingsRepalceConfig = 
{
	preventAssignment: false,
	"process.env.NODE_ENV": '"development"'
}
export default
[
    {
        input: "./src/addon.block.ts",
        output: 
        {
            file: "./build/addon.block.js",
        },
        plugins: [typescript(), del(delConfig), copy(addonCopyConfig)]
    },
    {
        input: "./src/public/settings.tsx",
        output: 
        {
            file: "./build/public/settings.js",
        },
        plugins: [replace(settingsRepalceConfig), commonjs(), typescript(), nodeResolve(), copy(settingsCopyConfig)] 
    }
];
