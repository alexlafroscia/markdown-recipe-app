<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Separator } from '$lib/components/ui/separator';
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		children?: Snippet;
	}

	let { children, title }: Props = $props();
</script>

<header
	class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
>
	<div class="flex w-full items-center gap-2 px-4">
		<Sidebar.Trigger class="-ms-1" />

		<Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />

		{#if title}
			<h1 class="grow text-2xl">{title}</h1>
		{/if}

		{@render children?.()}
	</div>
</header>
