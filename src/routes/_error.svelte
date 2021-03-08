<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<style>
	h1, p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
		font-size: 1.5em;
	}

	.error{
		padding-top: 150px;
		max-width: 1160px;
		margin: 0 auto;
		min-height: 30vh;
		text-align: center;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="error">
	<h1>{status}</h1>
	
	<p>{error.message}</p>
</div>

{#if error.stack}
	<pre>{error.stack}</pre>
{/if}
