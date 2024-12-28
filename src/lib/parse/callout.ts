import { remarkCallout, type Options } from '@r4ai/remark-callout';

export function makeOptions(): Options {
	return {};
}

export { remarkCallout };

interface CalloutData {
	dataCallout?: boolean;
	dataCalloutType?: string;
	open?: boolean;
}

declare module 'mdast' {
	interface BlockquoteData {
		hProperties?: CalloutData;
	}
}
