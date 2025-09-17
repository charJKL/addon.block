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
const copyConfig = 
{
    targets: [ 
        { src: "./src/icon/AddonBlockIcon*.png", dest:"./build" },
        { src: "./src/manifest.json", dest:"./build" }
    ]
}

export default
[
    {
        input: "./src/addon.block.ts",
        output: 
        {
            file: "./build/addon.block.js",
        },
        plugins: [typescript(), del(delConfig), copy(copyConfig)]
    },
    {
        input: "./src/public/settings.ts",
        output: 
        {
            file: "./build/public/settings.js",
        },
        plugins: [typescript(), del(delConfig), copy(copyConfig)] 
    }
];
