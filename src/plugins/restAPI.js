import axios from 'axios'
import { Loading } from 'quasar'

const baseUrl = 'https://psi-webdias.azurewebsites.net/'
let onStatus = null // Definido em App.vue

let _statusEvent_ = function (statusCode, statusMsg) {
    if (onStatus instanceof Function && statusCode !== undefined && statusCode !== null) {
        onStatus(statusCode, statusMsg)
    }
}

let restAPI = {
    setOnStatus: function (cb) { // Definido em App.vue
        onStatus = cb
    },
    /**
     *
     * @param {*} opt
     * req:
     * action:
     * hasSession: true
     */
    get: function (opt) {
        let query = ''
        if (opt.hasSession !== false) {
            const st = localStorage.getItem('sessionToken')
            query = '&st=' + st
        }

        Loading.show()
        let url = baseUrl + '?req=' + opt.req + '&action=' + opt.action + query
        if (opt.data) {
            let p_ = Object.keys(opt.data).reduce((acc, k) => { return acc + k + '=' + opt.data[k] + '&' }, '')
            url += '&' + p_.slice(0, -1)
        }
        return new Promise((resolve, reject) => {
            axios.get(url).then(async (response) => {
                Loading.hide()
                _statusEvent_(response.data ? response.data.status_code : null, response.data ? response.data.status_msg : null)
                resolve(response.data)
            }).catch((e) => {
                Loading.hide()
                reject(e)
            })
        })
    },
    post: function (opt) {
        let query = ''
        if (opt.hasSession !== false) {
            const st = localStorage.getItem('sessionToken')
            query = '&st=' + st
        }

        Loading.show()
        let url = baseUrl + '?req=' + opt.req + '&action=' + opt.action + query
        return new Promise((resolve, reject) => {
            axios.post(url, {data: opt.data}).then(async (response) => {
                Loading.hide()
                _statusEvent_(response.data ? response.data.status_code : null, response.data ? response.data.status_msg : null)
                resolve(response.data)
            }).catch((e) => {
                Loading.hide()
                reject(e)
            })
        })
    }
}

export default ({ Vue }) => {
  Vue.prototype.$restAPI = restAPI
}
