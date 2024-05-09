import { listeProducts, productItems } from "./component/listeProduct.js"
import { fetchJson } from "./function/api.js"
import { createElement } from "./function/dom.js"

const boutonShop = document.querySelector('#shop')
const robinet = document.querySelector('#imageHeader')
const header = document.querySelector('#devHeader')
const card = document.querySelector('#cardsList')
const validation = document.querySelector('.validationButton')

/* Permet de masquer ou de cacher le panier des achats */
boutonShop.addEventListener('click',()=>{
    const fenetre = boutonShop.parentElement.parentNode.querySelector('#fenetre')
    if(fenetre.classList.contains('isClicked')){
        fenetre.classList.remove('isClicked')
    } else{
        fenetre.classList.add('isClicked')
    }
})


/* Animation */
const Observer = new IntersectionObserver((entries)=>{
    for(const entry of entries){
        if(entry.isIntersecting){
            entry.target.classList.add('revealVisible')
            Observer.unobserve(entry.target)
        }
    }
})
Observer.observe(header)
Observer.observe(robinet)
Observer.observe(card)

    /*
    let produit = []
    const produitInstorage = localStorage.getItem('produits')
    if(produitInstorage){
        produit = JSON.parse(produitInstorage)
    }
    produit.forEach((item)=>{
        let pro = {
            title: item.title,
            id: item.id
        }
        const it = new productItems(pro)
        const fenetre = document.querySelector('#fenetre')
        fenetre.prepend(it.item)
    })*/

/* Verification est ce que l'utilisateur a rempli le panier avant d'aller valider sa commande */
validation.addEventListener(('click'),()=>{
    if(parseInt(document.querySelector('.prixTotal').innerText)<=0){
        alert('veuillez remplir le panier pour valider votre achat')
    }else{
        validation.querySelector('a').setAttribute('href','./pages/validation.html')
    }
    
    /* Enregistrement des donnees dans le local storage*/
    const productname = []
    document.querySelector('#fenetre').querySelectorAll('.productName').forEach((item)=>{
        productname.push(item.innerHTML)
    })
    localStorage.setItem('productname',JSON.stringify(productname))
    localStorage.setItem('fenetre',JSON.stringify(document.querySelector('.prixTotal').innerText))
})

/* Responsive */
const viewportWidth = innerWidth
if(viewportWidth<=650){
    document.querySelector('#imageHeader').querySelector('img').setAttribute('src','image/robinetPetit.svg')
}else{
    document.querySelector('#imageHeader').querySelector('img').setAttribute('src','image/robinet.svg')
}


/* Recuperer les elements via un appel Http puis les ajouters á ('#cardsList') */
try{
    const products = await fetchJson('')
    const card = new listeProducts(products)
    card.appendTo(document.querySelector('#cardsList'))
}catch(e){
    console.log(e)
    const alertElement = createElement('div',{
        class : 'alert alert-danger m-2',
        role : 'alert'
    })
    alertElement.innerText = 'Impossible de charger les elements'
    document.body.append(alertElement)
}
