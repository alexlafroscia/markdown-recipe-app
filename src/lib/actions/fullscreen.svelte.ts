import type { Action } from 'svelte/action';

const safeDoc: Document | undefined = globalThis.document;

export class FullscreenController {
	private node?: HTMLElement;

	enabled = $state(false);

	private fullscreenChangeHandler = () => {
		this.enabled = !!safeDoc?.fullscreenElement;
	};

	/**
	 * Svelte action to bind this {@linkcode FullscreenController} to a DOM node
	 */
	attach: Action = (node) => {
		this.node = node;

		return {
			destroy: () => {
				this.cleanup();
			},
		};
	};

	constructor() {
		safeDoc?.addEventListener('fullscreenchange', this.fullscreenChangeHandler);
	}

	private cleanup() {
		safeDoc?.removeEventListener('fullscreenchange', this.fullscreenChangeHandler);
	}

	/// MARK: Open/Closed State

	enable() {
		this.node?.requestFullscreen();
	}

	disable() {
		safeDoc?.exitFullscreen();
	}

	toggle() {
		if (this.enabled) {
			this.disable();
		} else {
			this.enable();
		}
	}
}
