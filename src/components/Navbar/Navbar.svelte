<script>
    import Fa from 'svelte-fa'
    import { faBars } from '@fortawesome/free-solid-svg-icons'
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
        setUpBag()
    })

</script>
<section class="navbar" style={$navShadow ? 'box-shadow: var(--shadow-md);':''}>
    <nav >
        <div id="mobile-menu" >
            <div data-layout="SMALL_ICON" class="ec-cart-widget"></div>
        </div>
        <div class="nav-s1" class:open={!close}>
            <div></div>
            <a href="/" class="logo" on:click|stopPropagation class:open={!close}>
                <div class="logo-img"></div>
            </a>   
            <div class="icon bars" class:hide={!close} on:click={openMenu}>
                <Fa icon={faBars} />
            </div>
            
            <div id="menu" class="menu" class:close>
                <img alt="close" class="icon" src="/icons/close.svg" on:click={closeMenu} />
                <div class="container">
                    <a class="start" on:click|stopPropagation href="/#cat-nav" class:selected={segment==""}> Menu </a>
                    <a href="/contact" on:click|stopPropagation class:selected={segment=="contact"}> Contact </a>
                    {#if canDownload}
                    <div class="link" on:click={installPWA}>Download App</div>
                    {/if}
                    <hr>
                    <a href="#!/~/accountSettings">Sign in</a>

                </div>
            </div>
        </div>
    </nav>
</section>

<style src="./navbar.scss"></style>