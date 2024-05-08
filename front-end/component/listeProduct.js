import { createElement } from "../function/dom.js"

export class listeProducts{

    #Produits = []
    #items =[]
    constructor(produits){
        this.#Produits = produits
    }

    appendTo(element){
        for(let produit of this.#Produits){
            const t = new productCard(produit)
            element.append(t.element)
        }

        document.querySelectorAll('.cardButton').forEach((item)=>{
            item.addEventListener('click',e => this.onSubmit(e))
        })

    }

    onSubmit(e){
        const t = e.currentTarget.parentElement.parentNode.querySelector('.card-title').innerText
        const id = e.currentTarget.parentElement.parentNode.getAttribute('id')       
        const todo ={
            title : t,
            id : id
        }
        const fenetre = document.querySelector('#fenetre')
        const element = new productItems(todo)
        fenetre.prepend(element.item)
        this.#items.push(todo)
        this.onUpdate()

        document.querySelectorAll('.X').forEach((item)=>{
            item.addEventListener('click',(event)=>{
                element.remove(event)
                let n = fenetre.querySelectorAll('.item').length
                let shop = document.querySelector('#nombreShop')
                if(n>=0){
                    shop.innerText = n
                }
                let i = parseInt(event.currentTarget.parentElement.querySelector('.nombrePrix').innerHTML)
                let totale = fenetre.querySelector('.prixTotal')
                let totalePrix = parseInt(totale.innerText)
                totale.innerHTML = `${totalePrix - i} cfa`
                this.onUpdate()
                event.stopImmediatePropagation()
            })
        })
        let n = fenetre.querySelectorAll('.item').length
        let shop = document.querySelector('#nombreShop')
        if(n>=0){
            shop.innerText = n
        }
        let r = parseInt(e.currentTarget.parentElement.querySelector('.price').innerText)
        let totale = fenetre.querySelector('.prixTotal')
        totale.innerHTML = `${parseInt(totale.innerHTML) + r} cfa`

    }

    onUpdate(){
        localStorage.setItem('produits',JSON.stringify(this.#items))
    }

    
}

class productCard{

    #element

    constructor(product){
        const col = createElement('div',{
            class : "col",
            id : product.id
        })
        const card = createElement('div',{
            class : "card"
        })
        const img = createElement('img',{
            class : "card-img-top", 
            src: `image/${product.id}.png`, 
            alt : "Card image cap"
        })
        const body = createElement('div',{
            class : "card-body"
        })
        const title = createElement('h5',{
            class : "card-title"
        })
        title.innerText = product.name
        const description = createElement('div',{
            class : "card-text"
        })
        description.innerHTML = product.description
        const bottom = createElement('div',{
            class : "d-flex justify-content-around align-items-center mb-3"
        })
        const prix = createElement('div',{
            class : "price"
        })
        prix.innerHTML = product.prix
        const ajouter = createElement('a',{
            class : "btn btn-primary cardButton"
        })
        ajouter.innerHTML = 'ajouter au panier'

        bottom.append(prix)
        bottom.append(ajouter)
        body.append(title)
        body.append(description)
        card.append(img)
        card.append(body)
        card.append(bottom)
        col.append(card)
        this.#element = col
    }

    get element(){
        return this.#element
    }
}

export class productItems{

    #item
    constructor(product){
        const item = createElement('div',{
            class: "item scale",
            id : product.id
        })
        const imgItem = createElement('div',{
            class : "imgItem"
        })
        const img = createElement ('img',{
            src: `image/${product.id}.png`, 
            alt: "image" ,
            width: "60", 
            height: "61"
        })
        const gridItem = createElement('div',{
            class: 'gridItem'
        })
        const X = createElement('div',{
            class: 'X',
            onclick : "void(0)"
        })
        X.innerHTML = '<img src="image/X.svg" alt="Exit" width="9" height="9">'
        const productName =createElement('div',{
            class: 'productName'
        })
        productName.innerText = product.name
        const nombrePrix = createElement('div',{
            class: 'nombrePrix'
        })
        nombrePrix.innerText = product.prix


        imgItem.append(img)
        gridItem.append(X)
        gridItem.append(productName)
        gridItem.append(nombrePrix)
        item.append(imgItem)
        item.append(gridItem)
        this.#item = item
    }

    get item(){
        return this.#item
    }

    remove(e){
        e.preventDefault()
        const t = e.currentTarget.parentElement.parentNode
        t.remove()
    }

}