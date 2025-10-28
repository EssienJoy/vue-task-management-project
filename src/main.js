import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from "./router";
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import Toast, { POSITION, } from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'primeicons/primeicons.css';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
        },
    },
});
const vueQueryOptions = {
    queryClient,
};


const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin, vueQueryOptions);
app.use(Toast, {
    position: POSITION.TOP_CENTER,
    timeout: 2000,

});
app.mount('#app');

