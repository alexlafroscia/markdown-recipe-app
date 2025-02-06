<script lang="ts" module>
	export type Frontmatter = [string, any][];
</script>

<script lang="ts">
	type StringValue = {
		type: 'string';
		value: string;
	};

	type DateValue = {
		type: 'date';
		value: Date;
	};

	type URLValue = {
		type: 'url';
		value: string;
	};

	type ObsidianLinkValue = {
		type: 'wikilink';
		url: string;
		label: string;
	};

	type TagListValue = {
		type: 'tag-list';
		value: string[];
	};

	type Value = StringValue | DateValue | URLValue | ObsidianLinkValue | TagListValue;

	interface Props {
		frontmatter: Frontmatter;
	}

	let { frontmatter }: Props = $props();

	function toValue(input: any): Value {
		// Try: Date
		const asDate = new Date(input);
		if (!isNaN(asDate as any)) {
			return { type: 'date', value: asDate };
		}

		// Try: URL
		try {
			return { type: 'url', value: new URL(input).toString() };
		} catch {}

		// Try: Wikilink
		if (typeof input === 'string' && input.startsWith('[[') && input.endsWith(']]')) {
			const fileName = input.replace('[[', '').replace(']]', '');

			const url = new URL('obsidian://open');
			url.searchParams.set('file', fileName);

			const stringifiedUrl = url.toString().replace('+', '%20');

			return {
				type: 'wikilink',
				label: fileName,
				url: stringifiedUrl,
			};
		}

		// Default: string
		return { type: 'string', value: new String(input) } as StringValue;
	}

	let entriedWithValues: [string, Value | Value[]][] = $derived.by(() => {
		return frontmatter
			.filter(([key, value]) => {
				if (Array.isArray(value)) {
					return value.length > 0;
				}

				return true;
			})
			.map(([key, value]) => {
				return [key, Array.isArray(value) ? value.map((item) => toValue(item)) : toValue(value)];
			});
	});

	const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short' });
</script>

{#snippet renderValue(value: Value)}
	{#if value.type === 'string'}
		{value.value}
	{:else if value.type === 'date'}
		{formatter.format(value.value)}
	{:else if value.type === 'url'}
		<a class="block truncate underline" href={value.value}>
			{value.value}
		</a>
	{:else if value.type === 'wikilink'}
		<a class="underline" href={value.url}>
			<span class="text-tx-2">[[</span>{value.label}<span class="text-tx-2">]]</span>
		</a>
	{/if}
{/snippet}

<dl class="bg-bg-2 grid p-2 text-sm">
	{#each entriedWithValues as [key, value]}
		<dt class="border-bg border-r">{key}</dt>
		<dd>
			{#if Array.isArray(value)}
				<ul>
					<li>
						{#each value as item}
							{@render renderValue(item)}
						{/each}
					</li>
				</ul>
			{:else}
				{@render renderValue(value)}
			{/if}
		</dd>
	{/each}
</dl>

<style>
	dl {
		row-gap: 0.5em;
		column-gap: 1em;
		grid-template-columns: 100px minmax(0, 1fr);
	}
</style>
