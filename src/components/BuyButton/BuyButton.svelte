

<script>    
    import {onMount} from 'svelte'
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()
    let node
    export let id
    
    async function setProduct(){
        let psc = document.createElement('script')

        let tout = setInterval(() => {
            if (window.hasOwnProperty("xProduct")){  
                psc.innerHTML= `xProduct()` 
                node.appendChild(psc)
                clearInterval(tout)
                dispatch('setup', node)
            }
        },30)
    }

    onMount(setProduct)
</script>

<div bind:this={node}>
    <div
        data-layout="TITLE_COUNTER"
        class="ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-{id}"
        itemtype="http://schema.org/Product"
        data-single-product-id="{id}"
    >
        <div
            class="ecsp-title"
            itemprop="name"
            style="display:none;"
            content="Vegetarian Don"
        />
        <div customprop="addtobag" />
    </div>
</div>

