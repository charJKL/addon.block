import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginTypedCSSModules } from "@rsbuild/plugin-typed-css-modules";
import { pluginReact } from '@rsbuild/plugin-react';

export default
{
	plugins: [pluginReact(), pluginSass(), pluginTypedCSSModules()],
	mode: 'development',
	dev: {
		hmr: false,
		liveReload: false,
	},
	source: 
	{
		entry: 
		{
			addon:
			{
				import: "./src/backend/addon.block.ts",
				filename: "addon.block.js",
				html: false,
			},
			settings: 
			{
				import: "./src/frontend/settings/main.tsx",
			},
			block: 
			{
				import: "./src/frontend/block/block.tsx",
			}
		},
	},
	output:
	{
		copy:
		[
			{ from: "./src/manifest.json" },
			{ from: "./src/icon/BlockDistractingSitesIcon*.png", to: "./icons/[name][ext]" }
		],
		distPath:
		{
			root: "./build/",
		}
	}
};