<template>
  <div>
    <todo-list :todos="todos"></todo-list>
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
          console.log(resp.data)
        })
        .catch();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>