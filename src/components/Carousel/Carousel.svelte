<script>
    import Fa from 'svelte-fa'
    import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
    let selected = 1
    const images = [
        {src: '6.jpg'}
    ]
    function prev(){
        if(selected>1){
            selected--
        }else{
            selected = images.length
        }
    }
    function next(){
        if(selected<images.length){
            selected++
        }else{
            selected = 1
        }
    }

</script>

<section class="carousel">
    <div class="container">
        {#if images.length>1}
        <div class="prev">
            <div on:click={prev}>
                <i><Fa icon={faChevronLeft} /></i>
            </div>
        </div>
        {/if}
        {#each images as img,i}
            <div class="item" class:selected={selected == i+1} style="background-image: url(/imgs/{img.src});">
            </div>
        {/each}
        {#if images.length>1}
        <div class="next">
            <div on:click={next}>
                <i><Fa icon={faChevronRight} /></i>
            </div>
        </div>
        {/if}
    </div>
</section>

<style src="./carousel.scss"></style>