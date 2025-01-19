<div class="full-screen-container">
	<slot />
</div>

<style>
	.full-screen-container {
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
