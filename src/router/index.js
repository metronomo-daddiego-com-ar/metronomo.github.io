import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Songs from '../views/Songs.vue'
import Lists from '../views/Lists.vue'
import ListEdit from '../views/ListEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Metrónomo',
      component: Main,
      meta: {isNav: true}
    },
    {
      path: '/songs',
      name: 'Canciones',
      component: Songs,
      meta: {isNav: true}
    },
    {
      path: '/lists',
      name: 'Listas',
      component: Lists,
      meta: {isNav: true}
    },
    {
      path: '/lists/:index',
      name: 'Editando Lista',
      component: ListEdit,
      meta: {isNav: false}
    }
  ]
})

export default router
