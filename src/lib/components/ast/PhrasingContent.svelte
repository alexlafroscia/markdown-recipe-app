<script lang="ts" module>
	import type { Node, PhrasingContent, PhrasingContentMap } from 'vault/mdast';

	export function isPhrasingContent(node: Node): node is PhrasingContent {
		return (
			node.type === 'break' ||
			node.type === 'delete' ||
			node.type === 'emphasis' ||
			node.type === 'html' ||
			node.type === 'image' ||
			node.type === 'inlineCode' ||
			node.type === 'text' ||
			node.type === 'strong' ||
			node.type === 'link' ||
			node.type === 'wikiLink'
		);
	}

	function altIsMaxWidth(alt: string | undefined | null): boolean {
		return typeof alt === 'string' && !isNaN(parseInt(alt));
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	import PhrasingContentParent from './PhrasingContentParent.svelte';

	type PhrasingContentRendererMap = {
		[type in keyof PhrasingContentMap]: Snippet<[PhrasingContentMap[type]]>;
	};

	const TYPE_MAP: Partial<PhrasingContentRendererMap> = {
		break: breakSnoppet,
		delete: deleteSnippet,
		emphasis,
		html,
		image,
		inlineCode,
		text,
		strong,
		link,
		wikiLink,
	};

	interface Props {
		node: PhrasingContent;
	}

	let props: Props = $props();
	let node = $derived(props.node);
</script>

{#snippet breakSnoppet(_node: PhrasingContentMap['break'])}
	<br />
{/snippet}

{#snippet deleteSnippet(node: PhrasingContentMap['delete'])}
	<s><PhrasingContentParent {node} /></s>
{/snippet}

{#snippet emphasis(node: PhrasingContentMap['emphasis'])}
	<i><PhrasingContentParent {node} /></i>
{/snippet}

{#snippet html(node: PhrasingContentMap['html'])}
	{@html node.value}
{/snippet}

{#snippet image(node: PhrasingContentMap['image'])}
	{#if altIsMaxWidth(node.alt)}
		<!-- svelte-ignore a11y_missing_attribute -->
		<img src={node.url} style:max-width={`${node.alt}px`} />
	{:else}
		<img src={node.url} alt={node.alt} />
	{/if}
{/snippet}

{#snippet inlineCode(node: PhrasingContentMap['inlineCode'])}
	<code>{node.value}</code>
{/snippet}

{#snippet link(node: PhrasingContentMap['link'])}
	<a href={node.url}><PhrasingContentParent {node} /></a>
{/snippet}

{#snippet strong(node: PhrasingContentMap['strong'])}
	<b><PhrasingContentParent {node} /></b>
{/snippet}

{#snippet text(node: PhrasingContentMap['text'])}
	{node.value}
{/snippet}

{#snippet wikiLink(node: PhrasingContentMap['wikiLink'])}
	<svelte:element this={node.data.hName} href={node.data.hProperties.href}>
		{node.data.alias}
	</svelte:element>
{/snippet}

<!-- Ignore `as never`; this works but the following line does not type-check -->
{@render TYPE_MAP[node.type]?.(node as never)}
