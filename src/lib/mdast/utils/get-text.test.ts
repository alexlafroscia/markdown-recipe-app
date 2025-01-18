import { test, expect } from 'vitest';

import { parse } from '$lib/test-helpers';
import dedent from 'dedent';

import { getText } from './get-text';

test('getting formatted paragraph text', () => {
	const { ast } = parse(dedent`
        Regular **bold** *italic* \`code\`
    `);

	expect(getText(ast)).toBe('Regular bold italic code');
});

test('getting formatted header text', () => {
	const { ast } = parse(dedent`
        # Regular **bold** *italic* \`code\`
    `);

	expect(getText(ast)).toBe('Regular bold italic code');
});

test('getting the content of link', () => {
	const { ast } = parse(dedent`
        [Foobar](./foobar)
    `);

	expect(getText(ast)).toBe('Foobar');
});
