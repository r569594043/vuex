import ChargeOff from '@/pages/ChargeOff';

export default [
  {
    path: '/charge-off',
    name: 'charge-off',
    component: ChargeOff,
    meta: {
      requireAuth: true,
    },
  },
]
