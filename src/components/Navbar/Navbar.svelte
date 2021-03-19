<script>
    import Fa from 'svelte-fa'
    import { faBars } from '@fortawesome/free-solid-svg-icons'
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

    let loaded = false
    $:if(typeof window !== "undefined" && !loaded){
        setUpBag()
        loaded = true
    }
    
</script>
<section class="navbar" style={$navShadow ? 'box-shadow: var(--shadow-md);':''}>
    <nav >
        <div id="mobile-menu" >
            <div data-layout="SMALL_ICON" class="ec-cart-widget">
            </div>
            <div id="bag-placeholder">
                <svg class="icon-default" width="36" height="30" viewBox="0 0 36 30" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M7 7h22v18a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4V7z" stroke="currentColor" stroke-width="2"></path><path d="M13 10V6c0-2.993 2.009-5 5-5s5 2.026 5 5v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
            </div>
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
                    <a class="start" on:click|stopPropagation href="/" class:selected={segment==""}> Menu </a>
                    <a href="/contact" on:click|stopPropagation class:selected={segment=="contact"}> Contact </a>
                    {#if canDownload}
                    <div class="link" on:click={installPWA}>Download App</div>
                    {/if}
                    <hr>
                    <a href="/{segment}#!/~/accountSettings">Sign in</a>

                </div>
            </div>
        </div>
    </nav>
</section>

<style src="./navbar.scss"></style>