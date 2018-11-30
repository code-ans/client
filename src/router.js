import Vue from 'vue'
import Router from './packages/router'
import Home from './views/Home'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'code',
        name: 'code',
        component: () => import('./views/Code')
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('./views/Tasks'),
        children: [
          {
            path: 'create',
            name: 'task create',
            component: () => import('./views/TaskDetail')
          },
          {
            path: ':id',
            name: 'task detail',
            component: () => import('./views/TaskDetail')
          }
        ]
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('./views/Test')
  }
]

export default new Router({
  routes
})
