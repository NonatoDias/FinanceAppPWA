/**
 * DataStorage
 * @author NONATO DIAS
 */

function OfflineStorage () {
    this.storage_ = localStorage
    this.name = 'data-d19049c8e5282c88c532022972332871820a3cd4'
    this.model_ = {}
}

OfflineStorage.prototype = {
    _load_: function () {
        let item = this.storage_.getItem(this.name)
        if (!item) {
            this.model_ = {}
            this._persist_()
        } else {
            this.model_ = JSON.parse(item)
        }
    },
    _persist_: function () {
        let json_ = JSON.stringify(this.model_)
        this.storage_.setItem(this.name, json_)
    },
    get: function (key, defaultValue) {
        this._load_()
        return key ? this.model_[key] ? this.model_[key] : defaultValue : this.model_
    },
    set: function (key, value) {
        this.model_[key] = value
        this._persist_()
    },
    update: function (key, callback, defaultValue) {
        let oldObj = this.get(key, defaultValue)
        if (callback instanceof Function) {
            let newObj = callback(oldObj)
            if (newObj) {
                this.set(key, newObj)
            }
        }
    }
}

/******************/
// Run
let offStg = new OfflineStorage()
offStg._load_()

export default ({ Vue }) => {
    Vue.prototype.$offlineStorage = offStg
}
