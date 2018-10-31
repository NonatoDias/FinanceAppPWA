importScripts("precache-manifest.89a8b2bda06f7e801c8c3165eaebae38.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");

/**
 * Service worker
 * @author Nonato Dias
 */

workbox.core.setCacheNameDetails({prefix: "finanpe"});


self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
