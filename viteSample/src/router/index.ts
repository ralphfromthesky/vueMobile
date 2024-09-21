import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'
import Profile from '../views/Profile.vue'
import ComponentA from '../components/ComponentA.vue'
import ComponentB from '../components/ComponentB.vue'
import templateRefs from '../views/templateRefs.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/compA',
      name: 'compA',
      component: ComponentA
    },
    {
      path: '/compB',
      name: 'compB',
      component: ComponentB
    },
    {
      path: '/temp',
      name: 'temp',
      component: templateRefs
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
      component: About

    }
  ]
})

export default router
