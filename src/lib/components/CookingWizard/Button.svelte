<script lang="ts">
	import type { Root } from 'vault/mdast';

	import ChefHatIcon from 'lucide-svelte/icons/chef-hat';

	import Button from '$lib/components/Button.svelte';
	import CookingWizard from './CookingWizard.svelte';

	interface Props {
		recipe: Root;
	}

	let { recipe }: Props = $props();

	let isCooking = $state(false);
	let modal = $state<HTMLDialogElement>();

	function openModal() {
		isCooking = true;
		modal?.showModal();

		modal?.addEventListener(
			'close',
			() => {
				isCooking = false;
			},
			{ once: true },
		);
	}
</script>

<Button
	class="bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:bg-blue-100"
	disabled={isCooking}
	onclick={() => {
		openModal();
	}}
>
	<ChefHatIcon />

	Cook
</Button>

<dialog class="min-w-half m-auto max-h-full rounded-lg shadow-2xl" bind:this={modal}>
	<CookingWizard {recipe} />
</dialog>
