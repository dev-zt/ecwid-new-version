import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
});

let head = document.querySelector('head'),
options = {
  childList: true
},
observer = new MutationObserver(mCallback);

let body = document.querySelector('body'),
observerPopup = new MutationObserver(mCallbackPopup);


async function mCallbackPopup(mutations) {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
		let node = mutation.addedNodes && mutation.addedNodes[0]
		if(node && node.tagName == 'DIV' && node.classList.contains('ecwid-popup')){
			  node.style.position = "fixed"
        let top = "50px"
        let maxHeight = "90vh"
        if(window.innerWidth<480){
            top= "0"
            maxHeight= "100vh"
        }
			  node.style.top = top
			  node.style.maxHeight = maxHeight

        if(window.innerWidth < 600) return
        await new Promise(r => setTimeout(r,300))
        
        let cartHasNoImg = node.querySelector('.product-details--no-images')
        let cartHasNoDesc = node.querySelector('.product-details__description--blank')
        let embedContent = node.querySelector('.ecwid-ProductBrowserPopup-content')
        if(embedContent){
          let nw = embedContent.firstElementChild.firstElementChild
          if(cartHasNoImg && cartHasNoDesc){
            embedContent.style.width = "100%"
            nw.style.width = '300px'
          }else{
            embedContent.style.width = "80vw"
            nw.style.width = 'inherit'
            nw.setAttribute('class','ec-size ec-size--xxs ec-size--xs ec-size--s ec-size--m ecwid-no-touch ecwid-supports-cssanimations ecwid-responsive ecwid-no-dragndrop')
          }
        }

		  }
    }
  }
}

function mCallback(mutations) {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
		let node = mutation.addedNodes && mutation.addedNodes[0]
		if(node && node.tagName == 'LINK'){
			// node.setAttribute('href','/ecwid.css')
		}
    }
  }
}

observer.observe(head, options);
observerPopup.observe(body, options);

window.ecwidMessages = {
	"BuyNow.buy_now":"Add",
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPrompt = e;
});
