<script>
    export let color="gray"
    export let show=true
    export let text=''
    export let cover=true
</script>
{#if show}
    <div class="loader {cover ? 'loader--cover':''}">
        <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" class="text-{color}">
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="2">
                    <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"/>
                    </path>
                </g>
            </g>
        </svg>
        <span class="text text-{color}">{text}</span>
    </div>
{/if}

<style src="./loader.scss"></style>