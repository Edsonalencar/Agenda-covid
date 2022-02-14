import { createRouter, createWebHistory } from 'vue-router'

const lazyLoad = (view: string) => {
  return () => import(`../views/${view}.vue`)
}

const routes = [
  {
    path: '/',
    meta: { title: 'Redirect' },
    redirect: '/login',
  },
  {
    path: '/teste',
    meta: { title: 'TesteGraficos' },
    component: lazyLoad('testeGraficos'),
  },
  {
    path: '/login',
    meta: { title: 'Login' },
    component: lazyLoad('Login'),
  },
  {
    path: '/register',
    meta: { title: 'Register' },
    component: lazyLoad('Register'),
  },
  {
    path: '/register/email',
    meta: { title: 'Register Email' },
    component: lazyLoad('RegisterEmail'),
  },
  {
    path: '/transparencia',
    meta: { title: 'Transparencia' },
    component: lazyLoad('Transparencia'),
  },
  {
    path: '/agendamentos',
    meta: { title: 'Agendamentos' },
    component: lazyLoad('Agendamentos'),
  },
  {
    path: '/agendar',
    meta: { title: 'Agendar' },
    component: lazyLoad('Agendar'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: lazyLoad('NotFound'),
  },
]

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
})
