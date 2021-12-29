<template>
  <div>
    <div class="taskHeader__container">
      <div style="width: 0"></div>
      <button class="" @click="showSortMenu">
        <font-awesome-icon :icon="['fas', 'sort']" />
      </button>
      <button class="addTodoButton" @click="toggleAddTask">
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
    </div>

    <task
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      :priorities="priorities"
      @getTasksEmitted="getTasks()"
    ></task>
    <div v-if="startAddTask || tasks.length < 1" class="newTask__container">
      <task
        :task="newTask"
        :priorities="priorities"
        @taskAddedEmitted="resetTaskFields"
        @toggleAddTaskEmitted="toggleAddTask"
      ></task>
    </div>
  </div>
</template>

<script>
import Task from "@/components/Task.vue";
export default {
  components: { Task },
  props: { todoListId: String },
  mounted() {
    this.getTasks();
  },

  data() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const today = `${year}-${month}-${day}`;
    return {
      showDetails: false,
      tasks: [],
      newTask: {
        todoListId: this.todoListId,
        name: "",
        description: "",
        dueDate: today,
        priority: "Low",
        isCompleted: false,
        canEdit: false,
      },
      taskName: "",
      taskDescription: "",
      today: today,
      taskDueDate: today,
      taskPriority: "Low",
      priorities: ["Low", "Medium", "High"],
      taskIsCompleted: false,
      startAddTask: false,
    };
  },

  methods: {
    getTasks() {
      this.$axios
        .get("/tasks", {
          params: {
            todoListId: this.todoListId,
          },
        })
        .then((resp) => {
          let tasks = resp.data;

          this.tasks = tasks;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    toggleAddTask() {
      this.startAddTask = !this.startAddTask;
      this.resetTaskFields();
    },

    resetTaskFields() {
      this.newTask = {
        todoListId: this.todoListId,
        name: "",
        description: "",
        dueDate: this.today,
        priority: "Low",
        isCompleted: false,
        canEdit: false,
      };
      this.getTasks();
    },

    addTask() {
      if (
        this.taskName.length > 0 &&
        this.taskName.length <= 20 &&
        this.taskDescription.length > 1
      ) {
        this.$axios
          .post("/tasks", {
            todoListId: this.todoListId,
            name: this.taskName,
            description: this.taskDescription,
            dueDate: this.taskDueDate,
            priority: this.taskPriority,
            isCompleted: this.taskIsCompleted,
          })
          .then((resp) => {
            console.log(resp.data);
            (this.taskName = ""),
              (this.taskDescription = ""),
              (this.taskDueDate = this.today),
              (this.taskPriority = "Low"),
              this.getTasks();
            this.$nextTick(() => {
              this.$refs.taskName.focus();
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("cant submit");
      }
    },
    showSortMenu() {
      console.log("show sort");
    },
  },
};
</script>

<style lang='scss' scoped>
.taskHeader__container {
  display: flex;
  justify-content: flex-end;

  h2 {
    margin: 0;
  }

  button {
    padding: 5px 9px;
    background-color: #8c1aff;
    color: #ffffff;
    border: 1px solid #ffffff;
    &:hover {
      background-color: #ffffff;
      border: 1px solid #8c1aff;
      color: #8c1aff;
    }

    &:active {
      background-color: #8c1aff;
      color: #ffffff;
      border: 1px solid #ffffff;
    }
  }
}

.addTodoButton {
  margin-right: 5px;
}

th {
  text-align: left;
}

.newTask__container {
  margin-top: 20px;
}

.taskField {
  background-color: #ffffff;
  padding: 5px;
}

.taskName {
  border: none;
  outline: none;

  &:focus {
    border-bottom: 1px solid black;
  }
}

.taskDueDate {
  border: none;
  outline: none;
  &:focus {
    border-bottom: 1px solid black;
  }
}

.details__section {
  margin-top: 10px;
}
</style>