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
      name: 'metronome',
      component: Main,
      meta: {isNav: true}
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs,
      meta: {isNav: true}
    },
    {
      path: '/lists',
      name: 'songlists',
      component: Lists,
      meta: {isNav: true}
    },
    {
      path: '/lists/:index',
      name: 'editing_songlist',
      component: ListEdit,
      meta: {isNav: false}
    }
  ]
})

export default router
