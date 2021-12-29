import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todos',
    component: () => import(/* webpackChunkName: "todos" */ '../views/Todos.vue')
  },
  {
    path: '/todo_tasks/:todoListId/:todoListName',
    name: 'TodoTasks',
    component: () => import(/* webpackChunkName: "todoTasks" */ '../views/TodoTasks.vue'),
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
