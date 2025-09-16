/*export default 
{   
    input: "./addon.block.ts",
    output:
    {
        file: "./build/background.js",

    }
};
*/
import type { RollupOptions } from 'rollup';
import typescript from '@rollup/plugin-typescript';

export default
{
    input: "./src/addon.block.ts",
    output: 
    {
        file: "./build/addon.block.js",
    },
    plugins: [typescript()]
} satisfies RollupOptions;
