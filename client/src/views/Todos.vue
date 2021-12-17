<template>
  <div>
    <table>
      <tr v-for="(todo, index) in todos" :key="index" >
        <td @click="goToTodo(todo)">{{ todo.name }}</td>
        <td>{{ todo.completedTasks.length }} / {{ todo.tasks.length }}</td>
        <td>
        
          <button>
            <font-awesome-icon
            style="color: red;"
              :icon="['fas', 'trash-alt']"
              @click="deleteTodo(todo)"
            />
          </button>
        </td>
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

    goToTodo(todo) {
      this.$router.push(`todo_tasks/${todo.id}`);
    },

    deleteTodo(todo) {
      console.log(todo);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>