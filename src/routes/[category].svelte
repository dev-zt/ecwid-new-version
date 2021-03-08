<script context="module">
    import {fetchProducts, fetchCategories} from '../lib/api'
	export async function preload(page, session) {
		const categories = await fetchCategories()
        return { categories }
	}
</script>

<script>
	import {WelcomeBar, Carousel, CategoriesNav , ListProducts, AboutSection} from '../components'
	import EcwidUtil from '../lib/ecwid-util'
	export let categories
	let category
	let list = []
	import { stores } from "@sapper/app";
	const {page} = stores()

	async function getProducts(cat){
		let catObj = categories.items.find(c => c.name == cat)
		list = []
		if(catObj){
			list = await fetchProducts(catObj.id)
		}
	}

	$: if($page.params.category){
		category = $page.params.category
		getProducts(category)

		if(typeof document !== "undefined"){
			EcwidUtil.reload()
		}
	}

</script>

<svelte:head>
	<title>{category}</title>
</svelte:head>


<div class="index">
	<WelcomeBar />
	<Carousel />

	<AboutSection />
	{#if categories && categories.items && categories.items.length}
		<CategoriesNav {categories} {category} />
	{/if}


	{#if list.error}
		<div class="error">
			Error occured while fetching products, Please try again later!
		</div>
	{:else}
		<ListProducts {list} />
	{/if}

</div>

<style>
	.index{
		background: #efefef;
	}
</style>