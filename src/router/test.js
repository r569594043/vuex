import Test from '@/pages/Test';

export default [
  {
    path: '/test',
    name: 'Test',
    component: Test,
    meta: {
        requireAuth: true,
    },
  },
]