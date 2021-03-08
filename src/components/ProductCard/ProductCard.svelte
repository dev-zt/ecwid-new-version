<script>
    import BuyButton from '../BuyButton/BuyButton.svelte'
    import {onMount} from 'svelte'
    export let product
    let desc = ""
    function truncate(){
        if(!product.description) return 
        const newDoc = document.implementation.createHTMLDocument()
        newDoc.body.innerHTML = product.description
        let txt = newDoc.body.innerText
        desc = txt.slice(0,67)+(txt.length>67 ? '...':'')
    }

    let btnNode
    function setUpBtnClick(evt){
        btnNode = evt.detail
    }

    function triggerPopup(){
        if(btnNode){
            btnNode.querySelector('button').click()
        }
    }
    onMount(truncate)
</script>

<div class="card" on:click={triggerPopup}>
    {#if product.thumbnailUrl}
        <div class="img-wrapper">
            <img alt={product.name} src={product.thumbnailUrl} />
        </div>
    {/if}
    <div class="body">
        <div>
            <h3>{product.name}</h3>
            <div class="desc">{desc}</div>
        </div>
        <div class="control">
            <div class="price">{product.defaultDisplayedPriceFormatted}</div>
            <BuyButton id={product.id} on:setup={setUpBtnClick} />
        </div>
    </div>
</div>


<style src="./product-card.scss"></style>