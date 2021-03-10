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


function mCallbackPopup(mutations) {
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
