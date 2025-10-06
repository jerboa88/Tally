import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';

/** @type {import('@markdoc/markdoc').Config} */
export default defineMarkdocConfig({
	nodes: {
		document: {
			...nodes.document,
			render: null,
		},
		link: {
			...nodes.link,
			render: component('@components/ui/Link.astro'),
		},
		strong: {
			...nodes.strong,
			render: component('@components/ui/Strong.astro'),
		},
		blockquote: {
			...nodes.blockquote,
			render: component('@components/ui/Alert.astro'),
		},
		image: {
			...nodes.image,
			render: component('@components/ui/Image.astro'),
		},
	},
});
