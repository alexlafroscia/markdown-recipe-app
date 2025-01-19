<script lang="ts">
	import type { Root } from 'vault/mdast';

	import ChefHatIcon from 'lucide-svelte/icons/chef-hat';

	import Button from '$lib/components/Button.svelte';
	import FullScreen from '$lib/components/FullScreen.svelte';
	import CookingWizard from './CookingWizard.svelte';

	interface Props {
		recipe: Root;
	}

	let { recipe }: Props = $props();

	let isCooking = $state(false);
</script>

<Button
	class="bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:bg-blue-100"
	disabled={isCooking}
	onclick={() => {
		isCooking = true;
	}}
>
	<ChefHatIcon />

	Cook
</Button>

{#if isCooking}
	<FullScreen
		onclose={() => {
			isCooking = false;
		}}
	>
		<CookingWizard {recipe} />
	</FullScreen>
{/if}
