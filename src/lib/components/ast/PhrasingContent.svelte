<script lang="ts" module>
	import type { Content, PhrasingContent, PhrasingContentMap } from 'mdast';

	export function isPhrasingContent(node: Content): node is PhrasingContent {
		return (
			node.type === 'break' ||
			node.type === 'delete' ||
			node.type === 'emphasis' ||
			node.type === 'html' ||
			node.type === 'image' ||
			node.type === 'inlineCode' ||
			node.type === 'text' ||
			node.type === 'strong' ||
			node.type === 'link'
		);
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
	<img src={node.url} alt={node.alt} />
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

<!-- Ignore `as never`; this works but the following line does not type-check -->
{@render TYPE_MAP[node.type]?.(node as never)}
