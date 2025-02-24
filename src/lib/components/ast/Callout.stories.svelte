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

	const CALLOUT_TYPES = dedent`
		> [!default] Default

		> [!bug] Bug

		> [!error] Error

		> [!fail] Fail

		> [!warning] Warning

		> [!question] Question

		> [!success] Success

		> [!important] Important

		> [!summary] Summary

		> [!tip] Tip

		> [!tldr] TLDR

		> [!info] Info

		> [!todo] Todo

		> [!example] Example
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

<Story name="Types">
	<Root node={parse(CALLOUT_TYPES)} />
</Story>
