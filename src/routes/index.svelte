<script context="module">
    import {fetchProducts, fetchCategories} from '../lib/api'
	export async function preload(page, session) {
		const categories = await fetchCategories()
		let cat = categories && categories.items && categories.items[0] 
        return { categories, category: cat.name}
	}
</script>

<script>
	import {WelcomeBar, Carousel, CategoriesNav , ListProducts} from '../components'
	import EcwidUtil from '../lib/ecwid-util'
	import {onMount} from 'svelte'

	export let categories
	export let category
	let list = []

	async function getProducts(catIndex){
		let catObj = categories.items[catIndex]
		let catObj2 = categories.items[catIndex+1]
		if(catObj){
			nextCatIndex = catIndex+2
			let fetchPr = fetchProducts(catObj.id)
			list.push({items: fetchPr, category: catObj.name})
			if(catObj2){
				let fetchPr2 = fetchProducts(catObj2.id)
				list.push({items: fetchPr2, category: catObj2.name})
			}
			list = list
			if(typeof document !== "undefined"){
				EcwidUtil.reload()
			}
		}else{
			nextCatIndex = -1
		}
	}

	let catIndex = 0 
	let nextCatIndex

	if(~catIndex){
		getProducts(catIndex)
	}

	onMount(() => EcwidUtil.reload())

	let y
	let lastY = 0

	$: if(y !== undefined){
		let wHeight= document.body.getBoundingClientRect().height
		if(lastY < y){

			if(wHeight-1000 <= y+ window.innerHeight){
				if(~nextCatIndex){
					getProducts(nextCatIndex)
					// setTimeout(()=>{
					// 	getProducts(nextCatIndex+1)
					// },100)
					lastY = y
				}
			}
		}

		// selected category
		let selectedCat = list.find(item => {
			let node = item.node
			let rect
			if(node){
				rect = node.getBoundingClientRect()
				return rect.y+rect.height-150 > 71
			}
			return false
		})
		if(selectedCat)
			category = selectedCat.category
	}

</script>


<svelte:window bind:scrollY={y} ></svelte:window>

<div class="index">
	<WelcomeBar />
	
	<Carousel />
	
	{#if categories && categories.items && categories.items.length}
		<CategoriesNav {categories} {category} />
	{/if}
	
	
	{#if list.error}
		<div class="error">
			Error occured while fetching products, Please try again later!
		</div>
	{:else}
		{#each list as item}
			<div bind:this={item.node}>
				{#await item.items}
					<div></div>
				{:then pItems} 
					<ListProducts list={pItems} hideNotFound category={item.category} />
				{/await}
			</div>
		{/each}
	{/if}
</div>

<style>
	.index{
		background: #efefef;
		padding-bottom: 2rem;
	}
</style>