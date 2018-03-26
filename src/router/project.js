import Project from '@/pages/Project';

export default [
  {
    path: '/project',
    name: 'project',
    component: Project,
    meta: {
      requireAuth: true,
    },
  },
]
