importScripts("precache-manifest.c7b4794a9956532f909ada58e76e5a1a.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");

/**
 * Service worker
 * @author Nonato Dias
 */

const cfg = {
    prefix: "finanpe",
    hostWS: 'psi-webdias.azurewebsites.net',
    urlWS: 'https://psi-webdias.azurewebsites.net/',
    timeoutSync: 2 * 60 * 1000
}

workbox.core.setCacheNameDetails({prefix: cfg.prefix});
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


/****************************************************
 *               OFFLINE REQUESTS                   *
 ****************************************************/
let routesFromReq = {
    'expense': {
        actions: {
            GET: {
                'getall': true
            },
            POST: {
                'addexpense': true
            }
        }
    },
    'category': {
        actions: {
            GET: {
                'getall': true
            }
        }
    }
}

function hasOfflineRoute_(searchParams, method){
    let mtd_ = method ? method : 'GET';
    let req_ = routesFromReq[searchParams.get('req')];
    let act_ = searchParams.get('action');

    if(req_ && act_ && req_.actions && req_.actions[mtd_] && req_.actions[mtd_][act_]){
        return true;
    }
    return false;
}

function createResponse(status, data){
    let blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
    let init = { 'status' : status || 200 , '' : '' };
    return new Response(blob,init);
}

/****************************************************
 *                  GET REQUESTS                    *
 ****************************************************/

/**
 * 
 * @param {*} param0 
 */
const matchWSGET = ({url, event}) => {
    if(url.host.includes(cfg.hostWS)){
        let searchParams = url.searchParams;
        return hasOfflineRoute_(searchParams, 'GET');
    }
    return false;
};

/**
 * Strategy staleWhileRevalidate
 */
workbox.routing.registerRoute(matchWSGET, workbox.strategies.staleWhileRevalidate({
    cacheName: cfg.prefix+'-json',
    plugins: [
        new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
        {
            cacheWillUpdate: async ({request, response, event})  => {
                return response.clone().json().then((json_) => {
                    if(json_.status_code == 200){
                        json_.status_cached = true;
                        return createResponse(200, json_)
                    }
                    return null;
                    
                }).catch((e)=>{
                    console.error('error status cache', e)
                    return response;
                })
            },
        }
    ],
}));

/****************************************************
 *                 POST REQUESTS                    *
 ****************************************************/
/**
 * 
 * @param {*} param0 
 */
const matchWSPOST = ({url, event}) => {
    if(url.host.includes(cfg.hostWS)){
        let searchParams = url.searchParams;
        return hasOfflineRoute_(searchParams, 'POST');
    }
    return false;
};

const queue = new workbox.backgroundSync.Queue(cfg.prefix+'-bck_sync', {
    maxRetentionTime: 30 * 24 * 60 // Retry for max n minutes
});

/**
 * Strategy networkOnly
 */
workbox.routing.registerRoute(matchWSPOST, workbox.strategies.networkOnly({
    plugins: [
        {
            fetchDidFail: async ({originalRequest, request, error, event}) => {
                queue.addRequest(request);
            }
        }
    ],
}), 'POST');


/****************************************************
 *                  SYNCHRONIZING                   *
 ****************************************************/
let loopInterval_ = null;

function loop_(){
    clearTimeout(loopInterval_)

    loopInterval_ = setTimeout(()=>{
        // console.log('\nSincronizando com ws '+ new Date() +' ... ');
        fetch(cfg.urlWS + '?req=api&action=sync').then(function(resp_){
            return resp_.json().then(function(json) {
                queue.replayRequests().then(()=>{
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

    }, cfg.timeoutSync)
} 

loop_();

