/**
 * Service worker
 * @author Nonato Dias
 */

let prefix__ = "finanpe";
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
            getall: function(url, request, cachedResponse){
                // expenseModule.store.getall = json_;
                console.log(url + " ___________ 2 ___ ", request)
                return cachedResponse;
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


function createResponseOK(data){
    let blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
    let init = { 'status' : 200 , '' : '' };
    return new Response(blob,init);
}

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
            return act_;
        }
    }
    return false;
}

const matchWSGET = ({url, event}) => {
    if(url.host.includes('psi-webdias.azurewebsites.net')){
        let searchParams = url.searchParams;
        return getActionCallback(searchParams, 'GET') ? true : false;
    }
    return false;
};

workbox.routing.registerRoute(matchWSGET,
    workbox.strategies.staleWhileRevalidate({
      cacheName: prefix__+'-json',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
        {
            cachedResponseWillBeUsed: async ({cacheName, request, matchOptions, cachedResponse, event}) => {
                let url = new URL(request.url);
                let searchParams = url.searchParams;
                let act_ = getActionCallback(searchParams, 'GET');
                if(act_){
                    return act_(url, request, cachedResponse);
                }
                return cachedResponse;
            }
        }
        /*,
        new workbox.backgroundSync.Plugin( //POST
            prefix__+'-bck_sync'
        )*/
      ],
    }),
  );


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