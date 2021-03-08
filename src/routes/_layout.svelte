<script context="module">
	export const preload = () => {};
	import {Navbar, Footer} from '../components'
</script>

<script>
	import { stores } from "@sapper/app";
	import EcwidUtil from '../lib/ecwid-util'
	// You may not want to use `segment`, but it is passed for the time being and will
	// create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
	// https://github.com/sveltejs/sapper/issues/824
	export let segment = "";
	// Silence unused export property warning
	// eslint-disable-next-line no-empty
	import {onMount } from 'svelte'
	onMount(() => {
		EcwidUtil.initCart()
	})
	if (segment) {}
	const { page } = stores();

	$: path = $page.path.slice(1);
</script>

<svelte:head>
	<title>
		{path ? path.charAt(0).toUpperCase() + path.slice(1).replace(/%20/g,' ') : "Madison"}
	</title>
</svelte:head>

<Navbar {segment} />
<slot />
<Footer />