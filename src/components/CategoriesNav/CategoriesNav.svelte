<script>
    import Fa from 'svelte-fa'
    import { faSortDown } from '@fortawesome/free-solid-svg-icons'
    import { onMount } from 'svelte';
    import {navShadow} from '../../stores'

    export let categories 
    export let category
    export let main = false

    let list = categories.items

    let selected = 0;
    let selectedItem = {}
    let y 
    let node
    let wide = false
    let open = false

    $: if (y && node){
        let pos = node.getBoundingClientRect()
        wide = pos.y <= 80
        $navShadow = !wide
    }

    function toggleMenu(){
        open = !open
    }
    let nSlice = list.length >= 4 ? 4 : list.length
    $: slicedItems = list.slice(nSlice, list.length)

    function setSelected(){
        const catParam = category;
        if(!catParam) return
        for(let i=0; i<list.length;i++){
            if(list[i].name == catParam){
                selected = i;
                selectedItem = list[i]
                return;
            }
        }
    }

    $:if (category){
        setSelected()
    }
    onMount(() => {
        if(window.innerWidth<770){
            nSlice = 0
        }
    })
</script>

<svelte:window bind:scrollY={y} on:mouseup={() => open = false}/>

<section id="cat-nav" class="categories-nav" class:wide bind:this={node}>
    <div class="container" class:normal={!wide}>
        <div class="list">
            {#each [...new Array(nSlice)] as item,i}
                {#if selected == i && !main}
                    <div class="selected item">{list[i].name}</div>
                {:else}
                    <a on:click|stopPropagation href="/{list[i].slug}/#cat-nav" class="item" class:selected={selected==i} >
                        {list[i].name}
                    </a>
                {/if}
            {/each}
            {#if selected>=nSlice || nSlice == 0}
                {#if !main}
                    <div class="item selected" >
                        {list[selected].name}
                    </div>
                {:else}
                    <a on:click|stopPropagation href="/{list[selected].slug}/#cat-nav" class="item selected" >
                        {list[selected].name}
                    </a>
                {/if}
            {/if}
        </div>
        <div class="right" on:mouseup|stopPropagation={toggleMenu}>
            {#if slicedItems.length>1}
                <div class="more" >
                    More <i><Fa icon={faSortDown} /></i>
                </div>
            {/if}
            <div class="options" class:open>
                {#each slicedItems as cat}
                    {#if selectedItem.name == cat.name}
                        <div class="selected item">{cat.name}</div>
                    {:else}
                        <a on:click|stopPropagation href="/{cat.slug}/#cat-nav" class="item">
                            {cat.name}
                        </a>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
</section>

<style src="./categories-nav.scss"></style>