<script context="module">
    import {fetchProducts, fetchCategories} from '../lib/api'
	export async function preload(page, session) {
		const categories = await fetchCategories()
        return { categories }
	}
</script>

<script>
	import {WelcomeBar, Carousel, CategoriesNav , ListProducts, Loader} from '../components'
	export let categories
	let category
	let category_name=''
	let list = []
	let loading = true
	import { stores } from "@sapper/app";
	import { onMount, tick } from 'svelte';
	const {page} = stores()

	async function getProducts(cat){
		let catObj = categories.items.find(c => c.slug == cat)
		list = []
		if(catObj){
			category_name = catObj.name
			list = await fetchProducts(catObj.id)
			loading = false
		}
	}

	let init = true
	$: if($page.params.category && init){
		if(typeof document !== "undefined"){
			category = $page.params.category
			getProducts(category)
			init = false
		}
	}

	async function getOffsetTop( elem ){
		document.documentElement.scrollTop = 0
		console.log(document.documentElement.scrollTop)
		return elem.getBoundingClientRect().top + document.documentElement.scrollTop
	}

	async function setScroll(iw){
		let elm = document.getElementById('cat-nav')
		let otop = await getOffsetTop(elm)
		
		scrollTo(0, otop-70)
	}
	
	function scrollToNav(){
		let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; 
		let iw = (iOS) ? screen.width : window.innerWidth,
			ih = (iOS) ? screen.height : window.innerHeight
		let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		let firstTime = true;
		let tout  = setInterval(() => {
			if(ih<630 || loading)
				return
			if(!isSafari){
				setScroll(iw)
				clearTimeout(tout)
			}
			
			if(isSafari){
				if(document.documentElement.scrollTop>650 || firstTime){
					setScroll(iw)
					firstTime = false;
				}
				setTimeout(() => {
					clearTimeout(tout)
				},2000)
			}
		},1)
	}

	onMount(() => {
		scrollToNav()
	})

</script>

<svelte:head>
	<title>{category_name}</title>
</svelte:head>


<div class="index">
	<WelcomeBar />
	<Carousel />

	{#if categories && categories.items && categories.items.length}
		<CategoriesNav {categories} category={category_name} on:positionScroll={scrollToNav} />
	{/if}


	{#if list.error}
		<div class="error">
			Error occured while fetching products, Please try again later!
		</div>
	{:else}
		<div class="relative" >
			<Loader show={loading} text="Loading products..." />
			<ListProducts {list} />
		</div>
	{/if}

</div>

<style>
	.index{
		background: #efefef;
	}
	.relative{
		position: relative;
		min-height: 65vh;
		padding-top: 0;
	}
</style>