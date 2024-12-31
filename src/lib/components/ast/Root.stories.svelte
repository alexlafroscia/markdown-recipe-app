<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import dedent from 'dedent';
	import type { FilePath } from 'vault/file';
	import { makeParser } from 'vault/parser';

	import DomPrinter from '../DOMPrinter.svelte';
	import Root from './Root.svelte';

	const parseWithFrontmatter = makeParser({
		index: () => [],
		externalize: (filePath) => filePath,
		resolvePath: (reference) => reference as FilePath,
	});

	function parse(doc: string) {
		return parseWithFrontmatter(doc).ast;
	}

	const { Story } = defineMeta({
		title: 'Remark AST/Root',
		component: Root,
	});

	const WITH_HEADING = dedent`
        # Hello World
    `;

	const WITH_PARAGRAPH = dedent`
        **Hello** World, *my* name is Alex
    `;

	const WITH_BLOCKQUOTE = dedent`
		> This is a quote
    `;
</script>

<Story name="Heading">
	<DomPrinter>
		<Root node={parse(WITH_HEADING)} />
	</DomPrinter>
</Story>

<Story name="Paragraph">
	<DomPrinter>
		<Root node={parse(WITH_PARAGRAPH)} />
	</DomPrinter>
</Story>

<Story name="Blockquote">
	<DomPrinter>
		<Root node={parse(WITH_BLOCKQUOTE)} />
	</DomPrinter>
</Story>
