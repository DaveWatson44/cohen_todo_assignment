<template>
  <tr>
    <td>
      <input
        :disabled="task.canEdit == false ? task.canEdit : canEdit"
        type="text"
        id="name"
        v-model="task.name"
        @change="updateTask( task.id, task.name, 'name')"
      />
    </td>
    <td>
      <input
        :disabled="task.canEdit == false ? task.canEdit : canEdit"
        type="text"
        id="description"
        v-model="task.description"
        @change="updateTask( task.id, task.description, 'description')"
      />
    </td>
    <td>
      <input
        :disabled="task.canEdit == false ? task.canEdit : canEdit"
        type="date"
        id="dueDate"
        v-model="task.due_date"
        @change="updateTask( task.id, task.due_date, 'due_date')"
      />
    </td>
    <td>
      <select
        :disabled="task.canEdit == false ? task.canEdit : canEdit"
   
        id="priority"
        v-model="task.priority"
        @change="updateTask( task.id, task.priority, 'priority')"
      >
      <option v-for="(priority, index) in priorities" :key="index" :value="priority">{{ priority }}</option></select>
    </td>
    <td>
      <input type="checkbox" @change="updateTask( task.id, task.is_completed, 'is_completed')" v-model="task.is_completed">
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
      priorities: ['Low', 'Medium', 'High']
    };
  },

  methods: {
    toggleEdit() {
      this.canEdit = !this.canEdit;
    },

    updateTask(taskId, newTaskValue, taskKey) {
      let updatedTaskInfo = { id: taskId };
      updatedTaskInfo[taskKey] = newTaskValue;

      this.$axios
        .put("/tasks", updatedTaskInfo)
        .then((resp) => {
          this.$emit('getTasksEmitted');
          console.log(resp.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTask(taskId) {
      this.$axios
        .delete("/tasks", { params: { id: taskId } })
        .then((resp) => {
          console.log(resp)
          this.$emit('getTasksEmitted');
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