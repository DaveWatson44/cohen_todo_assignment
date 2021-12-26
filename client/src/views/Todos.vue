<template>
  <div class="todoList__container">
    <div class="header">
      
    </div>
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
  color: #ffffff;
}

.header {
  background-color: #8c1aff;
  height: 200px;
  margin: 0;

}


.todoList {
  width: 250px;
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>