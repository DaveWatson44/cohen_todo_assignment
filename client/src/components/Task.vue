<template>
  <div class="task__container">
    <div>
      <input
        :disabled="task.canEdit == false ? task.canEdit : canEdit"
        type="text"
        id="name"
        v-model="task.name"
        class="taskField taskName"
      />

      <input
        :disabled="task.canEdit == false ? task.canEdit : canEdit"
        type="date"
        id="dueDate"
        v-model="task.due_date"
        class="taskField taskDueDate"
      />
      <select
        :disabled="task.canEdit == false ? task.canEdit : canEdit"
        id="priority"
        v-model="task.priority"
        class="taskField taskPriority"
      >
        <option
          v-for="(priority, index) in priorities"
          :key="index"
          :value="priority"
        >
          {{ priority }}
        </option>
      </select>
      <input
        type="checkbox"
        v-model="task.is_completed"
        @change="updateTask(task)"
        class="taskField taskIsCompleted"
      />
      <button
        v-if="canEdit"
        :disabled="task.name.length < 1 || task.description.length < 1"
        @click="toggleEdit(task)"
        class="taskEditButton"
      >
        <font-awesome-icon :icon="['fas', 'edit']" />
      </button>
      <button v-else @click="updateTask(task)" class="taskSaveButton">
        <font-awesome-icon :icon="['fas', 'save']" />
      </button>
      <button @click="deleteTask(task.id)" class="taskDeleteButton">
        <font-awesome-icon style="color: red" :icon="['fas', 'trash-alt']" />
      </button>
    </div>
    <div>
      <textarea
        :disabled="task.canEdit == false ? task.canEdit : canEdit"
        type="text"
        id="description"
        v-model="task.description"
        class="taskField taskDescription"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
    priorities: Array,
  },

  data() {
    return {
      canEdit: true,
    };
  },

  methods: {
    toggleEdit(task) {
      if (task.is_completed == true) {
        return;
      } else {
        this.canEdit = !this.canEdit;
      }
    },

    updateTask(task) {
      this.$axios
        .put("/tasks", task)
        .then((resp) => {
          this.$emit("getTasksEmitted");
          console.log(resp.data);
          this.canEdit = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTask(taskId) {
      this.$axios
        .delete("/tasks", { params: { id: taskId } })
        .then((resp) => {
          console.log(resp);
          this.$emit("getTasksEmitted");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.task__container {
}

.taskName {
  border: none;
  border-bottom: 1px solid black;
  background-color: #ffffff;
}
</style>