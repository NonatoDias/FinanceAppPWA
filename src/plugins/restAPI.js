import axios from 'axios'
import { Loading } from 'quasar'

const baseUrl = 'https://psi-webdias.azurewebsites.net/'

let restAPI = {
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
        return new Promise((resolve, reject) => {
            axios.get(url).then(async (response) => {
                Loading.hide()
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
