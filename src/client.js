import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
});


let options = {
  childList: true
},
body = document.querySelector('body'),
observerPopup = new MutationObserver(mCallbackPopup);


async function mCallbackPopup(mutations) {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
		let node = mutation.addedNodes && mutation.addedNodes[0]
		if(node && node.tagName == 'DIV' && node.classList.contains('ecwid-popup')){
			  node.style.position = "fixed"
        let top = "50px"
        let maxHeight = "90vh"
        let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; 
        let iw = (iOS) ? screen.width : window.innerWidth;
        if(iw<769){
            top= "0"
            maxHeight= "100vh"
            node.style.height = maxHeight
        }
			  node.style.top = top
			  node.style.maxHeight = maxHeight

        if(iw < 600) return
        await new Promise(r => setTimeout(r,300))

        let cartHasNoImg = node.querySelector('.product-details--no-images')
        let cartHasNoDesc = node.querySelector('.product-details__description--blank')
        let embedContent = node.querySelector('.ecwid-ProductBrowserPopup-content')
        if(embedContent){
          let nw = embedContent.firstElementChild.firstElementChild
          if(cartHasNoImg && cartHasNoDesc){
            embedContent.style.width = "100%"
            if(iw>768)
              nw.style.width = '300px'
          }else{
            embedContent.style.width = "80vw"
            nw.style.width = 'inherit'
            if(iw>768)
            nw.setAttribute('class','ec-size ec-size--xxs ec-size--xs ec-size--s ec-size--m ecwid-no-touch ecwid-supports-cssanimations ecwid-responsive ecwid-no-dragndrop')
          }

        }

		  }
    }
  }
}


observerPopup.observe(body, options);

window.ecwidMessages = {
	"BuyNow.buy_now":"Add",
}