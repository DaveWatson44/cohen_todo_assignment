<template>
  <div class="todoList__container">
    <todo-list class="todoList"></todo-list>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList.vue";
export default {
  components: { TodoList },
};
</script>

<style lang="scss" scoped>
.todoList__container {
  margin-top: 100px;
}

.todoList {
  width: 250px;
  margin: 0 auto;
  
}
</style>