/**
 * Service worker
 * @author Nonato Dias
 */

let prefix__ = "finanpe";
let urlWS_ = 'psi-webdias.azurewebsites.net';
workbox.core.setCacheNameDetails({prefix: prefix__});


self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

/*********************************** */
/* expense MODULE */

let expenseModule = {
    store: {
        getall: {}
    },
    actions: {
        GET: {
            getall: async function(url, request, response){
                return response.clone().json().then((json_) => {
                    json_.status_offline = true;
                    return createResponse(200, json_)

                }).catch((e)=>{
                    console.error('error getall', e)
                    return response;
                })
            }
        },
        POST: {
            addexpense: function() {

            }
        }
    }
}

/*********************************** */
/* ROTAS */
let routesFromReq = {
    'expense': expenseModule
}


function createResponse(status, data){
    let blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
    let init = { 'status' : status || 200 , '' : '' };
    return new Response(blob,init);
}

/**
 * 
 * @param {*} searchParams 
 * @param {*} method 
 */
function getActionCallback(searchParams, method){
    let mtd_ = method ? method : 'GET';
    let routeFromReq_ = routesFromReq[searchParams.get('req')];

    //Has route ?
    if(routeFromReq_ && routeFromReq_.actions && routeFromReq_.actions[mtd_]){
        let actions_ = routeFromReq_.actions[mtd_];
        const a_ = searchParams.get('action');
        let act_ = actions_[a_];

        //Has action ?
        if(act_ instanceof Function){
            console.log('*********** metodo '+ mtd_, act_)
            return act_;
        }
    }
    return false;
}

/**
 * 
 * @param {*} param0 
 */
const matchWSGET = ({url, event}) => {
    if(url.host.includes(urlWS_)){
        let searchParams = url.searchParams;
        return getActionCallback(searchParams, 'GET') ? true : false;
    }
    return false;
};

workbox.routing.registerRoute(matchWSGET, workbox.strategies.staleWhileRevalidate({
    cacheName: prefix__+'-json',
    plugins: [
        new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
        {
            //cachedResponseWillBeUsed: async ({cacheName, request, matchOptions, cachedResponse, event}) => {
            /*cacheWillUpdate: async ({request, response, event})  => {
                let url = new URL(request.url);
                let searchParams = url.searchParams;
                let act_ = getActionCallback(searchParams, 'GET');
                if(act_){
                    return await act_(url, request, response);
                }
                return response;
            },*/
            cacheWillUpdate: async ({request, response, event})  => {
                return response.clone().json().then((json_) => {
                    json_.status_cached = true;
                    return createResponse(200, json_)
                }).catch((e)=>{
                    console.error('error status cache', e)
                    return response;
                })
            },
        }
    ],
}));

/******************************************************** */

/**
 * 
 * @param {*} param0 
 */
const matchWSPOST = ({url, event}) => {
    if(url.host.includes(urlWS_)){
        let searchParams = url.searchParams;
        return getActionCallback(searchParams, 'POST') ? true : false;
    }
    return false;
};

workbox.routing.registerRoute(matchWSPOST, workbox.strategies.networkOnly({
    plugins: [
        new workbox.backgroundSync.Plugin( //POST
            prefix__+'-bck_sync'
        )
    ],
}), 'POST');













/******************************************************** */

/**
 * GET routes
 */


/*
const matchWS = ({url, event}) => {
    return (url.host.includes('psi-webdias.azurewebsites.net'));
};

workbox.routing.registerRoute(matchWS, ({url, event, params}) => {
    let searchParams = url.searchParams;
    let routeFromReq_ = routesFromReq[searchParams.get('req')];

    //Has route ?
    if(routeFromReq_ && routeFromReq_.actions && routeFromReq_.actions.GET){
        let actions_ = routeFromReq_.actions.GET;
        const a_ = searchParams.get('action');
        let act_ = actions_[a_];
        let store_ = routeFromReq_.store[a_]

        //Has action ?
        if(act_ instanceof Function){
            return fetch(event.request).then((response) => {
                return response.json().then((json_)=>{ 
                    act_(json_)
                    return createResponseOK(json_);
                })

            }).catch(()=>{
                return createResponseOK(store_);
            })
        }
    }
    //else
    return fetch(event.request).then((response) => {
        return response;
    })
});

*/

/**
 * Post routes
 *//*
workbox.routing.registerRoute(matchWS, ({url, event, params}) => {
    let searchParams = url.searchParams;
    let routeFromReq_ = routesFromReq[searchParams.get('req')];

    //Has route ?
    if(routeFromReq_ && routeFromReq_.actions && routeFromReq_.actions.POST){
        let actions_ = routeFromReq_.actions.POST;
        let act_ = actions_[searchParams.get('action')];

        //Has action ?
        if(act_ instanceof Function){
            return fetch(event.request).then((response) => {
                return response.json().then((json_)=>{ 
                    act_(json_)
                    return createResponseOK(json_);
                })

            }).catch(()=>{
                return createResponseOK();
            })
        }
    }
    //else
    return fetch(event.request).then((response) => {
        return response;
    })
}, 'POST');
*/
/*
workbox.routing.registerRoute(matchWS, ({url, event, params}) => {
    let searchParams = url.searchParams;
    if(searchParams.get('req') === 'expense' && searchParams.get('action') === 'addexpense'){
        event.request.clone().json().then((json_) => {
            lastAddExpense = json_.data;
        });
        return fetch(event.request)
        .then((response) => {
            return response;

        }).catch(()=>{
            lastAddExpense.id = null;
            allExpenses_.expenses.unshift(lastAddExpense);
            return createResponseOK(allExpenses_);
        })
    }
    return fetch(event.request)
    .then((response) => {
        return response;
    })
}, 'POST');
*/