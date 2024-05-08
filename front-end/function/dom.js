export function createElement(tagName,attributes={}){
    const element = document.createElement(tagName)
    for(const [attribute,valeur] of Object.entries(attributes)){
        if(valeur!==null){
            element.setAttribute(attribute,valeur)
        }
    }
    return element
}