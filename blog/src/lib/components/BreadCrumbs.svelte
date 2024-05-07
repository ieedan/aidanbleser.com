<script lang="ts">
	import { page } from '$app/stores';

	/** Can be used to exclude a path prefix EX: excludePrefix == '/dashboard' => route == '/dashboard/settings' => route == '/settings'*/
	export let excludePrefix: string | undefined = undefined;
	/** Allows you to apply a custom transform to the path name */
	export let transform: (pathName: string) => string = (pathName: string) => decodeURIComponent(pathName);
	export let separator: string = '/';
	/** Will prevent the transformation from being run on direct children of the routes provided*/
	export let doNotTransform: string[] = [];

	type BreadCrumb = {
		name: string;
		href: string;
	};

	$: breadCrumbs = getBreadCrumbs($page.url.pathname);

	const getBreadCrumbs = (path: string): BreadCrumb[] => {
		let p = path;
		if (excludePrefix) {
			if (excludePrefix.endsWith('/')) {
				excludePrefix = excludePrefix.slice(0, excludePrefix.length - 1);
			}

			p = p.replace(excludePrefix, '');
		}

		const routes = p.split('/');

		let currentPath = excludePrefix != undefined ? excludePrefix : '';
		const bcs: BreadCrumb[] = [];
		let lastBCIndex = 0;
		for (let i = 0; i < routes.length; i++) {
			const noTransform =
				bcs[lastBCIndex] &&
				doNotTransform &&
				doNotTransform.find((a) => bcs[lastBCIndex].href.endsWith(a));

			if (routes[i] == '') {
				if (i == routes.length - 1 && bcs[lastBCIndex] != undefined) {
					bcs[lastBCIndex].href = bcs[lastBCIndex].href + '/';
				}
				continue;
			}
			currentPath = currentPath + '/' + routes[i];
			bcs.push({
				name: noTransform ? decodeURIComponent(routes[i]) : transform(routes[i]),
				href: currentPath,
			});
			lastBCIndex = bcs.length - 1;
		}

		return bcs;
	};
</script>

<ul class="flex place-items-center gap-2 px-4">
	{#each breadCrumbs as { name, href }}
		<span
			class="font-serif
			font-thin italic text-gray-300 dark:text-gray-700"
		>
			{separator}
		</span>
		<a
			{href}
			data-active={$page.url.pathname == href}
			class="data-[active=true]:text-foreground-primary text-foreground-secondary
            flex place-items-center gap-4 rounded-md hover:text-foreground-primary
            px-2 py-1 font-medium transition-all hover:bg-component-background-hover"
		>
			{name}
		</a>
	{/each}
</ul>

<!--
@component
A component to show the current path.

[See Docs](https://geist-ui-svelte.dev/components/breadcrumbs) | [Open Issue](https://github.com/ieedan/geist-ui-svelte/issues/new)
-->
