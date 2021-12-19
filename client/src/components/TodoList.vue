<template>
  <div>
    <div class="todoHeader">
      <h2 class="todos__title">Todos</h2>
      <button class="addTodoButton" @click="initAddTodo">
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
    </div>
    <div class="todosTable__container">
      <table class="todos__container">
        <tr v-for="(todo, index) in todos" :key="index" class="todo__row">
          <td class="name__cell">
            <span class="todo__name" @click="goToTodo(todo)">{{
              todo.name
            }}</span>
          </td>
          <td>{{ todo.completedTasks.length }} / {{ todo.tasks.length }}</td>
          <td class="trashIcon__cell">
            <button>
              <font-awesome-icon
                class="trashIcon"
                :icon="['fas', 'trash-alt']"
                @click="deleteTodo(todo)"
              />
            </button>
          </td>
        </tr>
        <tr v-show="addNewTodo">
          <td>
            <input
              class="addTodo__input"
              type="text"
              placeholder="List name"
              v-model="newTodoName"
              @keyup.enter="addTodo"
              ref="todoInput"
            />
            <p class="error" v-if="showNameTakenError">
              This name is already in another todo.
            </p>
            <p class="error" v-if="showExceedsLengthError">
              This name is too long.
            </p>
            <p class="error" v-if="showNoNameError">Please enter a name.</p>
          </td>
        </tr>
      </table>
    </div>
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
      addNewTodo: false,
      newTodoName: "",
      showNameTakenError: false,
      showExceedsLengthError: false,
      showNoNameError: false,
      canSubmit: false,
    };
  },

  watch: {
    newTodoName() {
      if (this.newTodoName.length > 0 && this.newTodoName.length <= 20) {
        this.canSubmit = true;
      } else {
        this.canSubmit = false;
      }
    },
  },

  methods: {
    getTodos() {
      this.$axios
        .get("/todos_info")
        .then((resp) => {
          this.todos = resp.data;
          console.log(this.todos);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    goToTodo(todo) {
      this.$router.push(`todo_tasks/${todo.id}`);
    },

    initAddTodo() {
      this.addNewTodo = !this.addNewTodo;
      this.$nextTick(() => {
        this.$refs.todoInput.focus();
      });
    },

    addTodo() {
      this.showNameTakenError = false;
      this.showExceedsLengthError = false;
      this.showNoNameError = false;
      if (this.canSubmit) {
        this.$axios
          .post("/todo_lists", { name: this.newTodoName })
          .then((resp) => {
            console.log(resp.data);
            this.addNewTodo = !this.addNewTodo;
            this.getTodos();
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
        }
      }
    },

    deleteTodo(todo) {
      this.$axios
        .delete("/todo_lists", {
          params: {
            id: todo.id,
          },
        })
        .then((resp) => {
          console.log(resp.data);
          this.getTodos();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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
  margin-top: 10px;
  height: 700px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.todos__container {
  //   border: 1px solid black;
  padding: 20px !important;
  width: 100%;
  border-collapse: collapse;
}

.todo__row {
  background-color: lightgrey;
  height: 30px;
  &:hover {
    background-color: darkgrey;
    cursor: pointer;
  }
}

.name__cell {
  width: 150px;
}

.todo__name {
  &:hover {
    color: #ffffff;
  }
}

.trashIcon__cell {
  text-align: right;
}

.trashIcon {
  &:hover {
    color: red;
  }
}

.addTodo__input {
  width: 120px;
}

.error {
  color: red;
  font-size: 0.8em;
  margin: 3px 0 0 5px;
}
</style>