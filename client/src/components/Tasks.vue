<template>
  <div>
    <div class="taskHeader__container">
      <h2>Tasks</h2>
      <button class="addTodoButton" @click="initAddTask">
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
    <div v-if="startAddTask || tasks.length < 1">
      <input type="text" id="name" v-model="taskName" ref="taskName" />
      <textarea type="text" id="description" v-model="taskDescription">
      </textarea>
      <input type="date" id="dueDate" v-model="taskDueDate" />
      <select id="priority" v-model="taskPriority">
        <option
          v-for="(priority, index) in priorities"
          :key="index"
          :value="priority"
        >
          {{ priority }}
        </option>
      </select>
      <input type="checkbox" v-model="taskIsCompleted" />
      <button
        :disabled="taskName < 1 || taskDescription < 1"
        @click="addTask()"
      >
        <font-awesome-icon :icon="['fas', 'save']" />
      </button>
      <button @click="startAddTask = !startAddTask">
        <font-awesome-icon style="color: red" :icon="['fas', 'trash-alt']" />
      </button>
    </div>
  </div>
</template>

<script>
import Task from "@/components/Task.vue";
export default {
  components: { Task },
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
      taskName: "",
      taskDescription: "",
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
            todoListId: this.$route.params.id,
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

    initAddTask() {
      this.startAddTask = !this.startAddTask;
      this.$nextTick(() => {
        this.$refs.taskName.focus();
      });
    },

    addTask() {
      if (
        this.taskName.length > 0 &&
        this.taskName.length <= 20 &&
        this.taskDescription.length > 1
      ) {
        this.$axios
          .post("/tasks", {
            todo_list_id: this.$route.params.id,
            name: this.taskName,
            description: this.taskDescription,
            due_date: this.taskDueDate,
            priority: this.taskPriority,
            is_completed: this.taskIsCompleted,
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
  },
};
</script>

<style lang='scss' scoped>
.taskHeader__container {
  display: flex;
  justify-content: space-between;

  h2 {
    margin: 0;
  }
}

th {
  text-align: left;
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
</style>