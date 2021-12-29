<template>
  <div>
    <div class="taskHeader__container">
      <h2>Tasks</h2>
      <button class="addTodoButton" @click="initAddTask">
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
    </div>
    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Due Date</th>
        <th>Priority</th>
        <th>Finished</th>
      </tr>
      <task-row
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        @getTasksEmitted="getTasks()"
      >
      </task-row>

      <tr v-if="startAddTask || tasks.length < 1">
        <td>
          <input type="text" id="name" v-model="taskName" ref="taskName" />
        </td>
        <td>
          <input type="text" id="description" v-model="taskDescription" />
        </td>
        <td>
          <input type="date" id="dueDate" v-model="taskDueDate" />
        </td>
        <td>
          <select id="priority" v-model="taskPriority">
            <option
              v-for="(priority, index) in priorities"
              :key="index"
              :value="priority"
            >
              {{ priority }}
            </option>
          </select>
        </td>
        <td>
          <input type="checkbox" v-model="taskIsCompleted" />
        </td>

        <button :disabled="taskName < 1 || taskDescription < 1"  @click="addTask()" >
          <font-awesome-icon :icon="['fas', 'save']"/>
        </button>
        <button @click="startAddTask = !startAddTask">
          <font-awesome-icon
            style="color: red"
            :icon="['fas', 'trash-alt']"
            
          />
        </button>
      </tr>
    </table>
  </div>
</template>

<script>
import TaskRow from "@/components/TaskRow.vue";
export default {
  components: { TaskRow },
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
      taskId: null,
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
            todoListId: this.$route.params.id,
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