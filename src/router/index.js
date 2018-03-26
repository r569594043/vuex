import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Index';
import test from './test';
import sign from './sign';
import store from '@/store';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            requireAuth: true,
        },
    },
    ...test,
    ...sign,
];

const router = new Router({
  routes,
});

router.beforeEach((to, from, next) => {
    // if (to.matched.some(r => r.meta.requireAuth)) {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.getters['sign/token']) {
            next();
        } else {
            store.dispatch('sign/restoreToken').then(function(token) {
                if(token) {
                    next();
                } else {
                    next({
                        path: '/sign/in',
                        query: {redirect: to.fullPath}
                    });
                }
            }).catch((ex) => {
                console.error(ex);
                next({
                    path: '/sign/in',
                    query: {redirect: to.fullPath}
                });
            });
        }
    } else {
        next();
    }
});

export default router;