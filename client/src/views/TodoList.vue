<template>
  <div class="todoList__container">
    <todo-alert
      v-if="showAlert"
      :bgColor="alertBgColor"
      :message="alertMessage"
      :textColor="alertTextColor"
      @hideAlertEmitted="hideTodoAlert"
    ></todo-alert>
    <div v-if="showDeleteTodoAlert" class="overlay" @click="toggleShowDeleteTodoAlert"></div>
    <div v-if="showDeleteTodoAlert" class="deleteTodoAlert">
      <p>Delete todo and all it's tasks?</p>
      <div class="deleteAlertButton__container">
        <button class="cancelButton" @click="toggleShowDeleteTodoAlert">
          Cancel
        </button>
        <button class="deleteButton" @click="deleteTodo">Delete</button>
      </div>
    </div>
    <div class="header"></div>
    <todo-list
      :reloadTodoList="reloadTodoList"
      class="todoList"
      @resetReloadTodoListEmitted="resetReloadTodoList"
      @showDeleteTodoEmitted="initTodoDeletion"
      @showAlertEmitted="showTodoAlert"
    ></todo-list>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList.vue";
import TodoAlert from "@/components/TodoAlert.vue";

export default {
  components: { TodoList, TodoAlert },
  data() {
    return {
      showDeleteTodoAlert: false,
      todo: {},
      reloadTodoList: false,
      showAlert: false,
      alertMessage: "",
      alertTextColor: "",
      alertBgColor: "",
      
    };
  },
  methods: {
    showTodoAlert(payload) {
      this.alertMessage = payload.alertMessage;
      this.alertTextColor = payload.alertTextColor;
      this.alertBgColor = payload.alertBgColor;
      this.showAlert = true;
    },
    hideTodoAlert() {
      this.showAlert = false;
    },
    initTodoDeletion(payload){
      const todo = payload.todo;
      this.todo = todo;
      this.toggleShowDeleteTodoAlert();
    },
    toggleShowDeleteTodoAlert() {
      this.showDeleteTodoAlert = !this.showDeleteTodoAlert;
    },
    resetReloadTodoList() {
      this.reloadTodoList = false;
    },
    deleteTodo() {
      this.$axios
        .delete("/todo_lists", {
          params: {
            id: this.todo.id,
            tasks: this.todo.tasks,
          },
        })
        .then((resp) => {
          console.log(resp.data);
          this.reloadTodoList = true;
          this.showDeleteTodoAlert = !this.showDeleteTodoAlert;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
}

.deleteTodoAlert {
  height: 150px;
  width: 90%;
  background-color: #ffffff;
  position: absolute;
  z-index: 2;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 100px;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    text-align: center;
    margin: 50px 0 0 0;
  }

  @media screen and (min-width: 350px) {
    width: 300px;
  }
}

.deleteAlertButton__container {
  margin: 0 10px 10px auto;
}

button {
  background-color: #ffffff;
  border: 1px solid #8c1aff;
  color: #8c1aff;
  padding: 5px 10px;

  &:nth-child(n + 1) {
    margin-left: 5px;
  }

  &:hover {
    background-color: #8c1aff;
    color: #ffffff;
    border: 1px solid #ffffff;
  }

  &:active {
    background-color: #ffffff;
    color: #8c1aff;
    border: 1px solid #ffffff;
  }
}

.todoList__container {
  color: #ffffff;
}

.header {
  background-color: #8c1aff;
  height: 200px;
  margin: 0;
}

.todoList {
  width: 90%;
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 300px) {
    width: 250px;
  }
}
</style>