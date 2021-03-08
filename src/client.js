import * as sapper from '@sapper/app';

sapper.start({
	target: document.querySelector('#sapper')
});

let head = document.querySelector('head'),
options = {
  childList: true
},
observer = new MutationObserver(mCallback);

function mCallback(mutations) {
  for (let mutation of mutations) {
    if (mutation.type === 'childList') {
		let node = mutation.addedNodes && mutation.addedNodes[0]
		if(node && node.tagName == 'LINK'){
			node.setAttribute('href','/ecwid.css')
		}
    }
  }
}

observer.observe(head, options);

window.ecwidMessages = {
	"BuyNow.buy_now":"Add",
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPrompt = e;
});
