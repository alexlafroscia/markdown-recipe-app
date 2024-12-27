import { expect, test } from 'vitest';
import dedent from 'dedent';
import { parse } from './remark';

test('basic markdown', () => {
	const { ast, frontmatter } = parse(dedent`
        # Heading 1

        Paragraph Text
    `);

	expect(ast).toMatchSnapshot();
	expect(frontmatter).toEqual({});
});

test('frontmatter extraction', () => {
	const { ast, frontmatter } = parse(dedent`
        ---
        foo: bar
        ---

        # Heading 1
    `);

	expect(ast).toMatchSnapshot();
	expect(frontmatter).toEqual({
		foo: 'bar',
	});
});
