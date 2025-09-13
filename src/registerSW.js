import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm("Ada versi baru aplikasi. Reload sekarang?")) {
            updateSW(true)
        }
    },
    onOfflineReady() {
        console.log("Aplikasi siap digunakan secara offline")
    },
})