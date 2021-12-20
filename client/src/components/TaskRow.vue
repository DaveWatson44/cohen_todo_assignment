<template>
  <tr>
    <td>
      <input
        :disabled="task.canEdit == false ? task.canEdit : canEdit"
        type="text"
        id="name"
        v-model="task.name"
      />
    </td>
    <td>
      <input
        :disabled="task.canEdit == false ? task.canEdit : canEdit"
        type="text"
        id="description"
        v-model="task.description"
      />
    </td>
    <td>
      <input
        :disabled="task.canEdit == false ? task.canEdit : canEdit"
        type="date"
        id="dueDate"
        v-model="task.due_date"
      />
    </td>
    <td>
      <select
        :disabled="task.canEdit == false ? task.canEdit : canEdit"
        id="priority"
        v-model="task.priority"
      >
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
      <input
        type="checkbox"
        v-model="task.is_completed"
        @change="updateTask(task)"
      />
    </td>
    <button
      v-if="canEdit"
      :disabled="task.name.length < 1 || task.description.length < 1"
      @click="toggleEdit(task)"
    >
      <font-awesome-icon :icon="['fas', 'edit']" />
    </button>
    <button v-else @click="updateTask(task)">
      <font-awesome-icon :icon="['fas', 'save']" />
    </button>
    <button @click="deleteTask(task.id)">
      <font-awesome-icon style="color: red" :icon="['fas', 'trash-alt']" />
    </button>
  </tr>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      canEdit: true,
      priorities: ["Low", "Medium", "High"],
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
</style>