import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/Index';
import sign from './sign';
import project from './project';
import template from './template';
import chargeOff from './chargeOff';
import store from '@/store';
import * as types from '@/store/mutation-types';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        // props: (route) => ({ redirect: route.query.redirect }),
    },
    ...sign,
    ...project,
    ...template,
    ...chargeOff,
];

store.dispatch('sign/restoreSign');

const router = new Router({
  routes,
});

router.beforeEach((to, from, next) => {
    // if (to.matched.some(r => r.meta.requireAuth)) {
    if (to.meta.requireAuth && !store.getters['sign/signed']) {
        store.commit('sign/' + types.SHOW_SIGN_IN_MODAL);
        next({
            path: '/',
            // query: {redirect: to.fullPath}
        });
    } else {
        next();
    }
});

export default router;
