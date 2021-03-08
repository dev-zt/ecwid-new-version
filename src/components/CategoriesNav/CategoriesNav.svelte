<script>
import { onMount } from 'svelte';

    import {navShadow} from '../../stores'
    export let categories 
    export let category

    let list = categories.items

    let selected = 0;
    let y 
    let node
    let wide = false
    let open = false

    $: if (y && node){
        let pos = node.getBoundingClientRect()
        wide = pos.y == 79
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
                <a href="/{list[i].name}#cat-nav" class="item" class:selected={selected==i} >
                    {list[i].name}
                </a>
            {/each}
            {#if selected>=nSlice || nSlice == 0}
                <a  href="/{list[selected].name}#cat-nav" class="item" class:selected={true} >
                    {list[selected].name}
                </a>
            {/if}
        </div>
        <div class="right" on:mouseup|stopPropagation={toggleMenu}>
            {#if slicedItems.length}
                <div class="more" >
                    More <i class="fas fa-sort-down" />
                </div>
            {/if}
            <div class="options" class:open>
                {#each slicedItems as cat}
                    <a href="/{cat.name}#cat-nav" class="item">
                        {cat.name}
                    </a>
                {/each}
            </div>
        </div>
    </div>
</section>

<style src="./categories-nav.scss"></style>