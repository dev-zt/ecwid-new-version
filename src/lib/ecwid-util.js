import env from './env'
export default {
    remove(){

        if (typeof Ecwid != 'undefined'){
            Ecwid.destroy()
        }

    },
    initCart(){
        
        let sc = document.createElement('script')
		sc.setAttribute('type','text/javascript')
		sc.setAttribute('src', `https://app.ecwid.com/script.js?${env.STORE_ID}&data_platform=singleproduct_v2`)
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

        const triggerNewBag = (menuItem, oChild) => {
            let int = setInterval(() => {
                let icon = menuItem.querySelector('.ec-minicart__icon')
                if(icon){
                    menuItem.removeChild(oChild)
                    icon.style.opacity = 1;
                    clearInterval(int)
                }
            },1)
        }

        let tout = setInterval(() => {
            if (window.hasOwnProperty("Ecwid")){  
                const menuItem = document.getElementById("mobile-menu")
                const oChild = document.getElementById('bag-placeholder')
                if(menuItem){
                    menuItem.appendChild(scE)
                    triggerNewBag(menuItem,oChild)
                    clearInterval(tout)
                }
            }
        },1)

    },
    async reload(){
        this.remove()
        // this.initBag()
        
    }
}