<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		children: Snippet;
	}

	let { children, class: classNames, ...rest }: Props = $props();
</script>

<button class="flex gap-2 rounded p-2 transition-colors hover:shadow-sm {classNames}" {...rest}>
	{@render children()}
</button>
