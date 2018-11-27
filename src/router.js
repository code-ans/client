import Vue from 'vue'
import Router from './packages/router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      components: {
        default: () => import('./views/Home'),
        topbar: () => import('./views/Topbar')
      },
      children: [
        {
          path: 'code',
          name: 'code',
          component: () => import('./views/Code')
        },
        {
          path: 'tasks',
          name: 'tasks',
          component: () => import('./views/Tasks')
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: {
        default: () => import('./views/Test')
      }
    }
  ]
})
