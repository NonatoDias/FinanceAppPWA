
const routes = [
  {
    path: '/login',
    component: () => import('layouts/empty/EmptyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/login/login.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/main/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/dashboard/DashOne.vue') }
    ]
  },
  {
    path: '/profile',
    component: () => import('layouts/main/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user/profile/Profile.vue') }
    ]
  },
  {
    path: '/alerts',
    component: () => import('layouts/main/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/alerts/all/alerts-all.vue') }
    ]
  },
  {
    path: '/category-all',
    component: () => import('layouts/main/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/category/all/category-all.vue') }
    ]
  },
  {
    path: '/my-goals',
    component: () => import('layouts/main/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/goals/myGoals/goals-mygoals.vue') }
    ]
  },
  {
    path: '/reports',
    component: () => import('layouts/main/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/reports/reports.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
