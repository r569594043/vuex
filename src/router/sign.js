import Signin from '@/pages/Signin';

export default [
  {
    path: '/sign/in',
    name: 'signin',
    component: Signin,
    props: (route) => ({ redirect: route.query.redirect })
  },
  {
    path: '/sign/out',
    name: 'signout',
    component: Signin,
  },
]
