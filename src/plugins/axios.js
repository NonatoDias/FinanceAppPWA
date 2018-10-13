import axios from 'axios'

const wsConfig = {
  baseUrl: 'https://psi-webdias.azurewebsites.net/'
}

export default ({ Vue }) => {
  Vue.prototype.$wsConfig = wsConfig
  Vue.prototype.$axios = axios
}
