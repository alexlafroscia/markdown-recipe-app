<script lang="ts" module>
	import { cva, type VariantProps } from 'class-variance-authority';

	const button = cva('flex items-center rounded-sm p-2 transition-colors hover:shadow-xs', {
		variants: {
			size: {
				base: 'text-base gap-2',
				small: 'text-sm gap-1',
			},
		},
		defaultVariants: {
			size: 'base',
		},
	});
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes, VariantProps<typeof button> {
		children: Snippet;
	}

	let { children, class: classNames, size, ...rest }: Props = $props();
</script>

<button class={[button({ size }), classNames]} {...rest}>
	{@render children()}
</button>
