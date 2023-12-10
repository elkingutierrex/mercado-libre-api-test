const { Router }    = require('express');
const fetch         = require('node-fetch')
const router        = Router();
const urlBase       = 'https://api.mercadolibre.com/';

function getQueryString( query ){
    if( !query ){
        return false 
    }
    let queryString = (JSON.stringify(query)); 
    queryString = queryString.replace(/"/g, '');
    queryString = queryString.replace(/{/g, '');
    queryString = queryString.replace(/}/g, '');
    queryString = queryString.replace(/,/g,'&');
    queryString = queryString.replace(/:/g,'=');
    return queryString;
}

router.get('/getItemsByQuery', async(req, res) => {
    const queryString = getQueryString( req.query ); 

    if ( !queryString || !req.query.q){
     const msgError = {
            "message": "No se recibio el nombre del producto a buscar",
            "error": "not_found",
            "status": 404,
        }
        return await res.json( msgError );
    }

    try{
        const response = await fetch(`${urlBase}sites/MLA/search?${queryString}`);
        const item = await response.json(); 
        await res.json(item);
    }catch(err){
        await res.json(err)
    }
 

})

router.get('/getItemById', async(req, res) => {
    const id = req.query.id.toString();    
    if ( !id ){
        const msgError = {
            "message": "No se recibio id del item a buscar",
            "error": "not_found",
            "status": 404,
        }
        return await res.json( msgError );
    }

    try{
        const response = await fetch(`${urlBase}items/${id}`);
        const item = await response.json(); 
        await res.json(item);
    }catch(err){
        await res.json(err)
    }
})

router.get('/getDescriptionItemById', async(req, res) => {
    const id = req.query.id.toString();
    if ( !id ){
        const msgError = {
            "message": "No se recibio id del item a buscar",
            "error": "not_found",
            "status": 404,
        }
        return await res.json( msgError );
    }

    try{
        const response = await fetch(`${urlBase}items/${id}/description`); 
        const item = await response.json();
        await res.json(item);
    }catch(err){
        await res.json(err);
    }   
})

module.exports = router;
