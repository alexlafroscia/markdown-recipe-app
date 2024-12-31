import type { Vault } from 'vault';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			vault: Vault;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
