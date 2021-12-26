<template>
  <div class="task__container">
    <div @click="activateShowDetails">
      <div>
        <input
          :disabled="task.canEdit == false ? task.canEdit : canEdit"
          type="text"
          id="name"
          v-model="task.name"
          class="taskField taskName"
          placeholder="Task name."
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
        
      </div>
      <div v-show="showDetails" class="details__section">
        <textarea
          :disabled="task.canEdit == false ? task.canEdit : canEdit"
          type="text"
          id="description"
          v-model="task.description"
          class="taskField taskDescription"
          placeholder="Description"
        >
        </textarea>
      </div>
    </div>
    <div>
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
      showDetails: false,
    };
  },

  methods: {
    toggleEdit(task) {
      if (task.is_completed == true) {
        return;
      } else {
        console.log(this.showDetails);
        this.showDetails = true;
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
          this.showDetails = false;
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

    toggleShowDetails() {
      this.showDetails = !this.showDetails;
    },
    activateShowDetails() {
      if (this.canEdit) {
        this.toggleShowDetails();
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.task__container {
  display: flex;
  margin-top: 10px;
  &:nth-child(n+3){
    margin-top: 20px;
  }
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

.details__section{
  margin-top: 10px;
}
</style>