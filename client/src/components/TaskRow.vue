<template>
  <tr>
    <td>
      <input :disabled="canEdit" type="text" id="name" v-model="task.name"
      @change="updateTask(task.name, 'name')" />
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
        type="text"
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
    <button @click="toggleEdit">Edit</button>
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

    updateTask(newTaskValue, taskKey){
        let updatedTaskInfo = {'id': this.$route.params.id};
        updatedTaskInfo[taskKey] = newTaskValue
        this.$axios
        .put("/tasks", updatedTaskInfo)
        .then((resp) => {
          this.todos = resp.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style lang='scss' scoped>
</style>