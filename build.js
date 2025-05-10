import htmlPlugin from '@chialab/esbuild-plugin-html';
import esbuild from 'esbuild';

await esbuild.build({
	entryPoints: ['src/index.html'],
	outdir: 'public',
	plugins: [
		htmlPlugin({
			minifyOptions: {
				collapseAttributeWhitespace: true,
				collapseWhitespace: true,
				deduplicateAttributeValues: true,
			},
		}),
	],
});
