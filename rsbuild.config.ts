import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginTypedCSSModules } from "@rsbuild/plugin-typed-css-modules";

export default
{
    plugins: [pluginSass(), pluginTypedCSSModules()],
    source: 
    {
        entry: 
        {
            addon:
            {
                import: "./src/addon.block.ts",
                filename: "addon.block.js",
                html: false,
            },
            settings: 
            {
                import: "./src/public/settings.tsx",
            }
        },
    },
    output:
    {
        copy:
        [
            { from: "./src/manifest.json" }
        ],
        distPath:
        {
            root: './build',
        }
    }
};