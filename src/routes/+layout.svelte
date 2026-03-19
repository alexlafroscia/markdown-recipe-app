<script lang="ts" module>
	import '../app.css';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ModeWatcher } from 'mode-watcher';

	import type { LayoutData } from './$types';

	import * as Sidebar from '$lib/components/ui/sidebar';
	import AppSidebar from '$lib/components/AppSidebar.svelte';

	interface Props {
		children: Snippet<[]>;
		data: LayoutData;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<!-- Light Mode: Flexoki Paper -->
	<meta name="theme-color" content="#fffcf0" media="(prefers-color-scheme: light)" />
	<!-- Dark Mode: Flexoki Black -->
	<meta name="theme-color" content="#100f0f" media="(prefers-color-scheme: dark)" />

	<!-- Disable tap-to-zoom on iOS -->
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
	/>
</svelte:head>

<ModeWatcher />

<Sidebar.Provider>
	<AppSidebar />
	<main>
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
