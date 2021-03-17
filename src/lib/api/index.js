import env from '../env'
const API_URL = 'https://app.ecwid.com/api/v3/'+env.STORE_ID

if (typeof fetch !== 'function') {
    global.fetch = require('node-fetch')
}

async function req(url){
    try {
        return await fetch(API_URL+url+'token='+env.TOKEN).then(res => res.json())
    }catch (e){
        return {error: true}
    }
}

function slugify(text) {
    return text
      .toString()                     // Cast to string
      .toLowerCase()                  // Convert the string to lowercase letters
      .normalize('NFD')       // The normalize() method returns the Unicode Normalization Form of a given string.
      .trim()                         // Remove whitespace from both sides of a string
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

export async function fetchCategories(){
    let categories =  await req(`/categories?`)

    categories.items = categories.items.map(c => {
        if(!c) return
       const slug = slugify(c.name)
       return {...c, slug}
    })

    return categories
}

export async function fetchProducts(cat){
    return await req(`/products?${cat ? 'category='+cat+'&enabled=true&' : ''}`)
}