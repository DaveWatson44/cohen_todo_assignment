import Vue from 'vue'
import VueRouter from 'vue-router'
import Todos from '@/views/Todos.vue'
import TodoTasks from '@/views/TodoTasks.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todos',
    component: Todos
  },
  {
    path: '/todo_tasks/:id',
    name: 'TodoTasks',
    component: TodoTasks
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
