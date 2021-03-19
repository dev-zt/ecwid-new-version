<script>
    import Fa from 'svelte-fa'
    import { faFacebookSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
</script>

<footer class="footer">
    <div class="body">
        <div class="follow">
            <h3>Follow us</h3>
            <div class="icons">
                <a href="https://www.facebook.com/Madison-Grill-102712391900155" target="_blank">
                    <Fa icon={faFacebookSquare} />
                </a>
                <a href="https://www.instagram.com/madisongrill.me/" target="_blank">
                    <Fa icon={faInstagramSquare} />
                </a>
            </div>    
        </div>    
        <div class="menu">
            <a on:click|stopPropagation href="/terms">Terms & Conditions</a>
            <a on:click|stopPropagation href="/privacy-policy">Privacy Policy</a>
        </div>
    </div>   
</footer>


<style src="./footer.scss"></style>