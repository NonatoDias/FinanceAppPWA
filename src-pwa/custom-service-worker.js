/**
 * Service worker
 * @author Nonato Dias
 */

let prefix__ = "finanpe";
let hostWS_ = 'psi-webdias.azurewebsites.net';
let urlWS_ = 'https://'+hostWS_+'/';
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
    if(url.host.includes(hostWS_)){
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
    if(url.host.includes(hostWS_)){
        let searchParams = url.searchParams;
        return getActionCallback(searchParams, 'POST') ? true : false;
    }
    return false;
};

const queue = new workbox.backgroundSync.Queue(prefix__+'-bck_sync', {
    maxRetentionTime: 30 * 24 * 60 // Retry for max n minutes
});

workbox.routing.registerRoute(matchWSPOST, workbox.strategies.networkOnly({
    plugins: [
        {
            fetchDidFail: async ({originalRequest, request, error, event}) => {
                queue.addRequest(request);
            }
        }
    ],
}), 'POST');


/************************************************************* */
let loopInterval_ = null;

function loop_(){
    clearTimeout(loopInterval_)

    loopInterval_ = setTimeout(()=>{
        console.log('\nSincronizando com ws '+ new Date() +' ... ');
        fetch(urlWS_ + '?req=api&action=sync').then(function(resp_){
            return resp_.json().then(function(json) {
                queue.replayRequests().then(()=>{
                    console.log('   ok replayed')
                    loop_();
                }).catch(()=>{
                    console.error('   error replayed')
                    loop_();
                })
            })
        }).catch(()=>{
            console.error('NOT sync, maybe offline')
            loop_();
        })

    }, 60 * 1000)
}

loop_();
