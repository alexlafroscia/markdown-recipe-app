<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import dedent from 'dedent';

	import { parse } from '$lib/test-helpers';

	import CookingWizard from './CookingWizard.svelte';
	import FullSizeContainer from './FullSizeContainer.svelte';

	const { Story } = defineMeta({
		title: 'CookingWizard',
		component: CookingWizard,
	});

	const { ast } = parse(dedent`
        - 1 egg

        Scramble it

        ---

        - 1 cup milk

        Add the milk
    `);
</script>

<Story name="Recipe with separated steps">
	<FullSizeContainer>
		<CookingWizard recipe={ast} />
	</FullSizeContainer>
</Story>
