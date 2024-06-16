
/* Recuperation du totale */
const totaleInStorage = localStorage.getItem('fenetre')
const totale = document.querySelector('#Totale').querySelector('small')
totale.insertAdjacentText('afterend',totaleInStorage)

/**
 * Traitement du formulaire 
*/
/* Declaration des expressions regulieres */
const expressPrenom = /^([A-Za-z\s]+)$/
const expressNom = /^([A-Za-z]+)\s*$/
const expressAdresse = /^.+$/
const expressNumb = /^([0-9]{9})$/
const expressMail = /^([a-z0-9\.]+)@([a-z\.]+)$/

/* Declaration des variables */
const submit = document.querySelector('#boutonFormValider')
const PrenomInput = document.querySelector('#PrenomInput')
const NomInput = document.querySelector('#NomInput')
const AdresseInput = document.querySelector('#AdresseInput')
const numberInput = document.querySelector('#numberInput')
const mailInput = document.querySelector('#mailInput')
const form = document.querySelector('#formulaire')

/* Declaration texts d'erreur */
const invalidePrenom = `veuillez saisir un prenom valide`
const invalideNom = `veuillez saisir un nom valide`
const invalideAdresse = `veuillez saisir une adresse valide`
const invalideNumber = `veuillez saisir un numero valide`
const invalideMail = `veuillez saisir un mail valide`

/* Les ecouteurs des evenements input */
PrenomInput.addEventListener('input',(e)=>{
    e.preventDefault()
    if(!expressPrenom.test(PrenomInput.value)){
        document.querySelector('#validPrenom').innerHTML = invalidePrenom
    }else{
        document.querySelector('#validPrenom').innerHTML = ``
    }
})
NomInput.addEventListener('input',(e)=>{
    e.preventDefault()
    if(!expressNom.test(NomInput.value)){
        document.querySelector('#validNom').innerHTML = invalideNom
    }else{
        document.querySelector('#validNom').innerHTML = ``
    }
})
AdresseInput.addEventListener('input',(e)=>{
    e.preventDefault()
    if(!expressAdresse.test(AdresseInput.value)){
        document.querySelector('#validAdresse').innerHTML = invalideAdresse
    }else{
        document.querySelector('#validAdresse').innerHTML = ``
    }
})
numberInput.addEventListener('input',(e)=>{
    e.preventDefault()
    if(!expressNumb.test(numberInput.value)){
        document.querySelector('#validNumber').innerHTML = invalideNumber
    }else{
        document.querySelector('#validNumber').innerHTML = ``
    }
})
mailInput.addEventListener('input',(e)=>{
    e.preventDefault()
    if(!expressMail.test(mailInput.value)){
        document.querySelector('#validMail').innerHTML = invalideMail
    }else{
        document.querySelector('#validMail').innerHTML = ``
    }
})

/* Validation formulaire */
submit.addEventListener('click',(e)=>{
    e.preventDefault()
    if(!expressPrenom.test(PrenomInput.value)||!expressNom.test(NomInput.value)||!expressAdresse.test(AdresseInput.value)||!expressNumb.test(numberInput.value)||!expressMail.test(mailInput.value)){

    }else{
        /*document.forms['formulaire'].submit()*/
        sendMail()
        sendMail2()
        form.reset()
    }
})

/* fonction de messarie electronique */
function sendMail(){
    var params = {
        PrenomInput : PrenomInput.value,
        Totale : parseInt(document.querySelector('#Totale').innerText),
        NomInput : NomInput.value,
        AdresseInput : AdresseInput.value,
        regionSelect : document.querySelector('#regionSelect').value,
        mailInput : mailInput.value,
        produits : localStorage.getItem('productname')
    }
    emailjs.send('service_ui4urr8','template_zpvlswj',params).then((res)=>{
        console.log(res)
        document.querySelector('#formulaire').remove()
        document.querySelector('#done').style.display ='grid'
    }).catch(err => console.log(err))
}
function sendMail2(){
    var params = {
        PrenomInput : PrenomInput.value,
        Totale : parseInt(document.querySelector('#Totale').innerText),
        NomInput : NomInput.value,
        AdresseInput : AdresseInput.value,
        regionSelect : document.querySelector('#regionSelect').value,
        mailInput : mailInput.value,
        produits : localStorage.getItem('productname')
    }
    emailjs.send('service_ui4urr8','template_ht6410h',params).then((res)=>{
        console.log(res)
    }).catch(err => console.log(err))
}