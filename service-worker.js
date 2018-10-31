importScripts("precache-manifest.1db56a07b473840d08ee75d914bba585.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");

/**
 * Service worker
 * @author Nonato Dias
 */

workbox.core.setCacheNameDetails({prefix: "finanpe"});


self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


function createResponseOK(data){
    let blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
    let init = { 'status' : 200 , '' : '' };
    return new Response(blob,init);
}


/**
 * Listagem de despesas
 * @param {*} param0 
 */
const matchWS = ({url, event}) => {
    return (url.host.includes('psi-webdias.azurewebsites.net'));
};

let allExpenses_ = {
    status_code: 200,
    status_msg: 'Ok.',
    total: 0,
    expenses: [{id: 37, value: 20.99, description: 'Teste offline', date: '30/10/2018'}]
};

const handlerWS = ({url, event, params}) => {
    let searchParams = url.searchParams;
    if(searchParams.get('req') === 'expense' && searchParams.get('action') === 'getall'){
        return fetch(event.request)
        .then((response) => {
            return response.json().then((json_)=>{ 
                allExpenses_ = json_;
                return createResponseOK(allExpenses_);
            })

        }).catch(()=>{
            return createResponseOK(allExpenses_);
        })
    }
    return fetch(event.request)
    .then((response) => {
        return response;
    })
};

workbox.routing.registerRoute(matchWS, handlerWS);
