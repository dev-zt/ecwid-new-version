<script>
    import {onMount} from 'svelte'
    import { navShadow } from '../../stores';
    import EcwidUtil from '../../lib/ecwid-util'
    export let segment
    let close = true
    function closeMenu(){
        close = true
    }

    function openMenu(){
        close = false
    }

    let canDownload = false
    function installPWA(){
        window.deferredPrompt.prompt();
    }

    function setUpBag(){
        EcwidUtil.initBag()
    }

    onMount(() => {
        let sTime = +new Date
        let int = setInterval(() => {
            if(window.deferredPrompt){
                canDownload = true
                clearInterval(int)
            }
            let eTime = +new Date
            if(eTime-sTime > 10000){
                clearInterval(int)
            }
        },200)

        setUpBag()
    })

</script>
<section class="navbar" style={$navShadow ? 'box-shadow: var(--shadow-md);':''}>
    <nav class:open={!close}>
        <div id="mobile-menu" class="m2" class:hide={!close}>
            <div data-layout="SMALL_ICON" class="ec-cart-widget"></div>
        </div>
        <a href="/" class="logo" on:click|stopPropagation class:open={!close}>
            <img src="/logo-192.png" alt="madison logo" >
        </a>   
        <i class="fas fa-bars bars icon" class:hide={!close} on:click={openMenu} />
        <div id="menu" class="menu" class:close>
            <i class="fas fa-times icon" on:click={closeMenu}/>
            <div class="container">
                <a class="start" on:click|stopPropagation href="/#cat-nav" class:selected={segment==""}> Menu </a>
                <a href="/contact" on:click|stopPropagation class:selected={segment=="contact"}> Contact </a>
                {#if canDownload}
                    <div class="link" on:click={installPWA}>Download App</div>
                {/if}
            </div>
        </div>
    </nav>
</section>

<style src="./navbar.scss"></style>