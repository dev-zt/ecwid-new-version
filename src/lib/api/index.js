const STORE_ID = '45331382'
const API_URL = 'https://app.ecwid.com/api/v3/'+STORE_ID
const TOKEN = 'public_UPXgpG6jhmnbmuECv4cMpqFyP8JigvUw'

if (typeof fetch !== 'function') {
    global.fetch = require('node-fetch')
}

async function req(url){
    try {
        return await fetch(API_URL+url+'token='+TOKEN).then(res => res.json())
    }catch (e){
        return {error: true}
    }
}

export async function fetchCategories(){
    return await req(`/categories?`)
}

export async function fetchProducts(cat){
    return await req(`/products?${cat ? 'category='+cat+'&' : ''}`)
}


