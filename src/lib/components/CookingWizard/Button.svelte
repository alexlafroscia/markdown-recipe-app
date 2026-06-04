<script lang="ts">
	import type { Root } from 'vault/mdast';

	import ChefHatIcon from '@lucide/svelte/icons/chef-hat';

	import { Button } from '$lib/components/ui/button';
	import Dialog, { DialogController } from '$lib/components/Dialog.svelte';
	import CookingWizard from './CookingWizard.svelte';

	interface Props {
		recipe: Root;
	}

	let { recipe }: Props = $props();

	let dialogController = new DialogController();
</script>

<Button
	variant="secondary"
	size="sm"
	class="gap-1.5 bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:hover:bg-blue-900"
	disabled={dialogController.isOpen}
	onclick={dialogController.showModal}
>
	<ChefHatIcon class="h-4 w-4" />
	Cook
</Button>

<Dialog
	class="min-w-half m-auto max-h-full rounded-lg text-base shadow-2xl"
	controller={dialogController}
>
	<CookingWizard {recipe} />
</Dialog>
