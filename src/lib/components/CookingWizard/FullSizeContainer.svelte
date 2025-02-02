<div class="full-screen-container">
	<slot />
</div>

<style>
	.full-screen-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		height: 100%;
	}

	:global {
		html,
		body,
		#storybook-root {
			&:has(.full-screen-container) {
				height: 100%;
			}
		}
	}
</style>
