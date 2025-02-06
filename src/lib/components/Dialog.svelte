<script lang="ts" module>
	export class DialogController {
		node = $state<HTMLDialogElement>();

		isOpen = $state(false);

		showModal = () => {
			this.isOpen = true;
			this.node?.showModal();

			this.node?.addEventListener(
				'close',
				() => {
					this.isOpen = false;
				},
				{ once: true },
			);
		};
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		class?: ClassValue;
		controller: DialogController;
		children: Snippet;
	}

	let { class: classValue, controller, children }: Props = $props();

	$effect(() => {
		if (controller.isOpen) {
			document.body.classList.add('overflow-y-hidden');
		} else {
			document.body.classList.remove('overflow-y-hidden');
		}
	});
</script>

<dialog class={classValue} bind:this={controller.node}>
	{@render children()}
</dialog>
