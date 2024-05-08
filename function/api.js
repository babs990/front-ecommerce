export async function fetchJson(url , option = {}){
    const headers = { Accept : 'application/json',...option.headers}
    const r = await fetch (url,{...option,headers})
    if(r.ok){
        return r.json()
    }
    throw new Error('Erreur serveur' , {cause : r})
}