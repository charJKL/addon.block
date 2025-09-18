import { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";


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
        input: "./src/public/settings.ts",
        output: 
        {
            file: "./build/public/settings.js",
        },
        plugins: [typescript(), copy(settingsCopyConfig)] 
    }
];
