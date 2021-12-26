<template>
  <div class="todoList__container">
    <div class="header">
      <div>
        <h1 class="header__title">Todos</h1>
        <div class="todoInput__container">
          <input type="text" placeholder="New Todo" />
          <button>Add</button>
        </div>
      </div>
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
}

.header {
  background-color: #8c1aff;
  height: 200px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
  font-family: Arial, Helvetica, sans-serif;
  .header__title {
    margin: 0;
    color: #ffffff;
  }
}

.todoInput__container {
  input {
    padding: 8px;
  }

  button {
    margin-left: 5px;
    padding: 8px 15px;
  }
}

.todoList {
  width: 250px;
  margin: 50px auto 0 auto;
}
</style>