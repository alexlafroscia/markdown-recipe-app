<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		class?: ClassValue;
		children: Snippet;
	}

	let { children, class: classNames, ...rest }: Props = $props();
</script>

<button
	class={['flex gap-2 rounded-sm p-2 transition-colors hover:shadow-xs', classNames]}
	{...rest}
>
	{@render children()}
</button>
