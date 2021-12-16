<template>
  <div>
    <todo-list v-for="(todoList, index) in todos" :key="index" :todoList="todoList"></todo-list>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList.vue";
export default {
  components: { TodoList },

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
        .get("/todo_lists")
        .then((resp) => {
          this.todos = resp.data;
          console.log(resp.data)
        })
        .catch((err) => {
          console.log(err)
        });
    },

 
  },
};
</script>

<style lang="scss" scoped>
</style>