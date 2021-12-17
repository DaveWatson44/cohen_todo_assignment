<template>
  <tr>
    <td>
      <input
        :disabled="canEdit"
        type="text"
        id="name"
        v-model="task.name"
        @change="updateTask(task.name, 'name')"
      />
    </td>
    <td>
      <input
        :disabled="canEdit"
        type="text"
        id="description"
        v-model="task.description"
        @change="updateTask(task.description, 'description')"
      />
    </td>
    <td>
      <input
        :disabled="canEdit"
        type="date"
        id="dueDate"
        v-model="task.due_date"
        @change="updateTask(task.due_date, 'due_date')"
      />
    </td>
    <td>
      <input
        :disabled="canEdit"
        type="text"
        id="priority"
        v-model="task.priority"
        @change="updateTask(task.priority, 'priority')"
      />
    </td>
    <button>
      <font-awesome-icon :icon="['fas', 'edit']" @click="toggleEdit" />
    </button>
    <button>
      <font-awesome-icon
        style="color: red"
        :icon="['fas', 'trash-alt']"
        @click="deleteTask(task.id)"
      />
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
    };
  },

  methods: {
    toggleEdit() {
      this.canEdit = !this.canEdit;
    },

    updateTask(newTaskValue, taskKey) {
      let updatedTaskInfo = { id: this.$route.params.id };
      updatedTaskInfo[taskKey] = newTaskValue;

      this.$axios
        .put("/tasks", updatedTaskInfo)
        .then((resp) => {
          this.todos = resp.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTask(taskId) {
      this.$axios
        .delete("/tasks", { params: { id: taskId } })
        .then((resp) => {
          this.todos = resp.data;
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