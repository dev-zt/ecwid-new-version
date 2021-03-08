export default {
    remove(){

        if (typeof Ecwid != 'undefined'){
            Ecwid.destroy()
            // Ecwid.init()
        }

    },
    initCart(){
        
        let sc = document.createElement('script')
		sc.setAttribute('type','text/javascript')
		sc.setAttribute('src', `https://app.ecwid.com/script.js?45331382&data_platform=singleproduct_v2`)
		sc.setAttribute('charset','utf-8')
		sc.setAttribute('id','cart-ecwid-pr')
		sc.dataset.csasync = false

		document.body.appendChild(sc)
		window.ecwid_script_defer = true;
		window.ecwid_dynamic_widgets = true;
    },
    initBag(){
        let bagelm = document.getElementById('bag-ecwid-pr')
        if(bagelm) return
        let scE = document.createElement('script')
        scE.setAttribute('id','bag-ecwid-pr')
        scE.innerHTML = 'Ecwid.init();'

        const menuItem = document.getElementById("mobile-menu")
        let tout = setInterval(() => {
            if (window.hasOwnProperty("Ecwid")){  
                menuItem.appendChild(scE)
                clearInterval(tout)
            }
        },30)

    },
    async reload(){
        this.remove()
        // this.initBag()
        
    }
}