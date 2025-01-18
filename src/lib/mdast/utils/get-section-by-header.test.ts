import { test, expect } from 'vitest';

import { parse } from '$lib/test-helpers';
import dedent from 'dedent';

import { getSectionByHeader } from './get-section-by-header';

test('when there is no matching heading', () => {
	const { ast } = parse(dedent`
    `);

	const section = getSectionByHeader(ast, 'Heading');

	expect(section).toBeUndefined();
});

test('when the section exists with no contents', () => {
	const { ast } = parse(dedent`
        ## Sub Heading

        ## Next Heading
    `);

	const section = getSectionByHeader(ast, 'Sub Heading');

	expect(section).toBeUndefined();
});

test('when the section goes to the end of the document', () => {
	const { ast } = parse(dedent`
        ## Sub Heading

        This should be included
    `);

	const section = getSectionByHeader(ast, 'Sub Heading');

	expect(section?.length).toEqual(1);
});

test('when the section terminates at another header of the same level', () => {
	const { ast } = parse(dedent`
        ## Sub Heading

        This should be included

        ## Next Heading

        This should not be included
    `);

	const section = getSectionByHeader(ast, 'Sub Heading');

	expect(section?.length).toEqual(1);
});

test('when the section terminates at another header of a higher level', () => {
	const { ast } = parse(dedent`
        ## Sub Heading

        This should be included

        # Next Heading

        This should not be included
    `);

	const section = getSectionByHeader(ast, 'Sub Heading');

	expect(section?.length).toEqual(1);
});

test('when the section contains another heading of a lower level', () => {
	const { ast } = parse(dedent`
        ## Sub Heading

        This should be included

        ### Lower level heading

        ## Next Heading

        This should not be included
    `);

	const section = getSectionByHeader(ast, 'Sub Heading');

	expect(section?.length).toEqual(2);
});
