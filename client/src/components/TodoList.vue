<template>
  <div>
    <div class="todoHeader__container">
      <h1 class="header__title">Todos</h1>
      <div class="todoInput__container">
        <input
          type="text"
          placeholder="New Todo"
          v-model="newTodoName"
          @keyup.enter="addTodo"
          ref="todoInput"
        />
        <button class="addTodo__button" @click="addTodo">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
      </div>
      <p class="error" v-if="showNameTakenError">This name is already taken.</p>
      <p class="error" v-if="showExceedsLengthError">This name is too long.</p>
      <p class="error" v-if="showNoNameError">Please enter a name.</p>
    </div>
    <div v-if="showNoTodosMessage" class="noTodosText__container">
      <h2>There are no todo lists.</h2>
    </div>
    <div v-else class="todosTable__container">
      <table class="todos__container">
        <tr v-for="(todo, index) in todos" :key="index" class="todo__row">
          <td class="todo__cell">
            <span
              :class="[
                'todoInfo__container',
                todo.completedTasks.length == todo.tasks.length &&
                todo.tasks.length != 0
                  ? 'finishedTodo'
                  : '',
              ]"
            >
              <span class="todo__name" @click="goToTodo(todo)">{{
                todo.name
              }}</span>
              <span
                >{{ todo.completedTasks.length }} /
                {{ todo.tasks.length }}</span
              >
            </span>

            <button @click="deleteTodo(todo)" class="todoDelete__button">
              <font-awesome-icon :icon="['fas', 'times']" />
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: { reloadTodoList: Boolean },
  mounted() {
    this.getTodos();
  },

  data() {
    return {
      todos: [],
      addNewTodo: false,
      newTodoName: "",
      showNameTakenError: false,
      showExceedsLengthError: false,
      showNoNameError: false,
      canSubmit: false,
      showNoTodosMessage: false,
    };
  },

  watch: {
    reloadTodoList() {
      if (this.reloadTodoList == true) {
        this.getTodos();
        this.$emit("resetReloadTodoListEmitted");
      }
    },

    newTodoName() {
      if (this.newTodoName.length > 0 && this.newTodoName.length <= 50) {
        this.canSubmit = true;
      } else {
        this.canSubmit = false;
      }
    },
  },

  methods: {
     emitShowAlert(payload) {
      this.$emit("showAlertEmitted", {
        alertTextColor: payload.alertTextColor,
        alertBgColor: payload.alertBgColor,
        alertMessage: payload.alertMessage,
      });
    },
    getTodos() {
      console.log("getting todos");
      this.$axios
        .get("/todos_info")
        .then((resp) => {
          let todos = resp.data;
          if (todos.length < 1) {
            this.showNoTodosMessage = true;
          } else {
            this.showNoTodosMessage = false;
            let sortedTodos = todos.sort(
              (todoOne, todoTwo) => todoOne.isCompleted - todoTwo.isCompleted
            );
            this.todos = sortedTodos;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    goToTodo(todo) {
      this.$router.push({
        name: "TodoTasks",
        params: { todoListId: todo.id.toString(), todoListName: todo.name },
      });
    },

    addTodo() {
      this.showNameTakenError = false;
      this.showExceedsLengthError = false;
      this.showNoNameError = false;
      console.log()
      if (this.canSubmit) {
        this.$axios
          .post("/todo_lists", { name: this.newTodoName })
          .then((resp) => {
            console.log(resp.data);
            this.addNewTodo = !this.addNewTodo;
            this.getTodos();
            this.newTodoName = "";
          })
          .catch((err) => {
            console.log(err);
            this.showNameTakenError = !this.showNameTakenError;
          });
      } else {
        if (this.newTodoName.length == 0) {
          this.showNoNameError = !this.showNoNameError;
        } else if (this.newTodoName.length > 50) {
          this.showExceedsLengthError = !this.showExceedsLengthError;
        } else{
          console.log('something else is wrong')
          console.log(this.showNoNameError)
          console.log(this.showExceedsLengthError)
          console.log(this.showNameTakenError)
        }
      }
    },

    deleteTodo(todo) {
      if (todo.tasks.length > 0) {
        this.$emit("showDeleteTodoEmitted", { todo: todo });
      } else {
        this.$axios
          .delete("/todo_lists", {
            params: {
              id: todo.id,
              tasks: todo.tasks,
            },
          })
          .then((resp) => {
            console.log(resp.data);
            this.getTodos();
          })
          .catch((err) => {
            console.log(err);
            this.emitShowAlert({alertMessage: "Cannot delete. Please refresh the page and try again."});
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.todoHeader__container {
  font-family: Arial, Helvetica, sans-serif;
}

.header__title {
  margin: 0;
  padding-bottom: 10px;
}

.todoInput__container {
  display: flex;
  justify-content: space-between;
  input {
    padding: 8px;
    width: 72%;
  }

  button {
    padding: 8px 15px;
  }

  .addTodo__button {
    color: #8c1aff;
    border: 1px solid #ffffff;

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
}

.todoHeader {
  display: flex;
  justify-content: space-between;
}

.todos__title {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.addTodoButton {
  color: green;
  background-color: #ffffff;
  &:hover {
    color: #ffffff;
    background-color: green;
  }
  &:active {
    color: green;
    background-color: #ffffff;
  }
}

.todosTable__container {
  color: black;
  margin-top: 70px;
  padding-bottom: 50px;
}

.todos__container {
  width: 100%;
}

.todo__row {
  background-color: white;

  &:hover {
    background-color: #faf5f5;
    cursor: pointer;
  }
}
.todo__cell {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.todoInfo__container {
  display: flex;
  justify-content: space-between;
  width: 70%;
}

.todo__name {
  overflow: hidden;
  width: 80px;
  height: 20px;
  &:hover {
    color: #8c1aff;
  }
}

.todoDelete__button {
  background-color: transparent;
  border: none;
  &:hover {
    color: #8c1aff;
  }
}

.addTodo__input {
  width: 120px;
}

.error {
  font-size: 0.8em;
  margin: 3px 0 0 5px;
}

.finishedTodo {
  background: repeating-linear-gradient(180deg, black 0%, black 100%);
  background-size: 100% 2px;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.5;
}

.noTodosText__container {
  margin-top: 100px;
  color: #8c1aff;
}
</style>