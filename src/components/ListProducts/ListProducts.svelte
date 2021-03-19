<script>
    import ProductCard from '../ProductCard/ProductCard.svelte'
    import { navShadow } from '../../stores';
    export let list
    export let hideNotFound = false
    export let category=''
</script>


<section class="list-products" class:top={!$navShadow}>
    {#if !hideNotFound || list.items.length}
    <div class="container">
            {#if hideNotFound}
                <h2>{category}</h2>
            {/if}
            <div class="products" class:empty={!list || !list.items || !list.items.length}>
                {#if list && list.items}
                    {#each list.items as product}
                        <ProductCard {product} />
                    {/each}
                    {#if !list.items.length}
                        <div class="info">No Product Found</div>
                    {/if}
                {/if}
            </div>
        </div>
    {/if}
</section>

<style src="./list-products.scss"></style>