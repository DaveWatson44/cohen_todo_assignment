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
    path: '/todo_tasks/:todoListId/:todoListName',
    name: 'TodoTasks',
    component: TodoTasks,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
