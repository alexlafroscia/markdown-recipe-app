<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import dedent from 'dedent';
	import { processAST } from 'mddb/dist/src/lib/parseFile';

	import DomPrinter from '../DOMPrinter.svelte';
	import Root from './Root.svelte';

	const { Story } = defineMeta({
		title: 'Remark AST Root',
		component: Root,
	});

	const WITH_HEADING = dedent`
        # Hello World
    `;

	const WITH_PARAGRAPH = dedent`
        **Hello** World, *my* name is Alex
    `;
</script>

<Story name="Heading">
	<DomPrinter>
		<Root node={processAST(WITH_HEADING)} />
	</DomPrinter>
</Story>

<Story name="Paragraph">
	<DomPrinter>
		<Root node={processAST(WITH_PARAGRAPH)} />
	</DomPrinter>
</Story>
