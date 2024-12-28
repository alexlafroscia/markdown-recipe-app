<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import dedent from 'dedent';
	import { makeParser } from '$lib/parse';

	import DomPrinter from '../DOMPrinter.svelte';
	import Root from './Root.svelte';

	const parseWithFrontmatter = makeParser();

	function parse(doc: string) {
		return parseWithFrontmatter(doc).ast;
	}

	const { Story } = defineMeta({
		title: 'Remark AST/Callout',
		component: Root,
	});

	const WITH_CALLOUT = dedent`
		> [!question] What is love?
		> Baby don't hurt me
    `;

	const WITH_CALLOUT_OPEN = dedent`
		> [!question]+ What is love?
		> Baby don't hurt me
    `;

	const WITH_CALLOUT_CLOSED = dedent`
		> [!question]- What is love?
		> Baby don't hurt me
    `;
</script>

<Story name="Default">
	<DomPrinter>
		<Root node={parse(WITH_CALLOUT)} />
	</DomPrinter>
</Story>

<Story name="Open">
	<DomPrinter>
		<Root node={parse(WITH_CALLOUT_OPEN)} />
	</DomPrinter>
</Story>

<Story name="Closed">
	<DomPrinter>
		<Root node={parse(WITH_CALLOUT_CLOSED)} />
	</DomPrinter>
</Story>
