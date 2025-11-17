import { defineStore } from 'pinia'

export const urlApiStore = defineStore('url', {
    state: () => ({ url_api_store: null }),
    getters: {
        getUrlApi: (state) => state.url_api_store,
    },
    actions: {
        setUrlApi(url_api_store) {
            this.url_api_store = url_api_store
        },
        removeUrlApi() {
            this.url_api_store = null
        }
    },
})