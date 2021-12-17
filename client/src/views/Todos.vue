<template>
  <div>
    <table>
      <tr v-for="(todo, index) in todos" :key="index" @click="goToTodo(todo)">
      <td> {{todo.name}} </td>
      <td> {{todo.completedTasks.length}} / {{todo.tasks.length}} </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {

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
        })
        .catch((err) => {
          console.log(err);
        });
    },

    goToTodo(todo){
      this.$router.push(`todo_tasks/${todo.id}`)
    }
  },

};
</script>

<style lang="scss" scoped>
</style>