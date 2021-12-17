<template>
  <div>
    <!-- <todo-list v-for="(todoList, index) in todos" :key="index" :todoList="todoList"></todo-list> -->
    <table>
      <tr v-for="(todo, index) in todos" :key="index" @click="goToTodo(todo)">
      <td> {{todo.name}} </td>
      <td> {{todo.completedTasks.length}} / {{todo.tasks.length}} </td>
      </tr>
    </table>
  </div>
</template>

<script>
// import TodoList from "@/components/TodoList.vue";
export default {
  // components: { TodoList },

  mounted() {
    this.getTodos();
  },

  data() {
    return {
      todos: [],
    };
  },

  methods: {
    getTodos() {
      this.$axios
        .get("/todos_info")
        .then((resp) => {
          this.todos = resp.data;
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    goToTodo(e){
      console.log(e)
    }
  },

};
</script>

<style lang="scss" scoped>
</style>