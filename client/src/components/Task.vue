<template>
  <div class="task__container">
    <div class="taskDetails__container">
      <div class="taskInformation__container" @click="activateShowDetails">
        <input
          type="checkbox"
          v-model="task.is_completed"
          @change="updateTask(task)"
          class="taskField taskIsCompleted"
        />
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
      <div class="taskButton__container">
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
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>
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
  margin-top: 10px;
  background-color: #ffffff;
  padding: 5px;
  &:nth-child(n + 3) {
    margin-top: 20px;
  }
}

.taskDetails__container {
  display: flex;
  justify-content: space-between;
}

.taskInformation__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
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

.taskButton__container {
  height: 29px;

  button {
    height: 100%;
    background-color: #ffffff;
    border: 1px solid #8c1aff;
    color: #8c1aff;
    width: 30px;

    &:hover {
      background-color: #8c1aff;
      color: #ffffff;
      border: 1px solid #ffffff;
    }

    &:active {
      background-color: #ffffff;
      color: #8c1aff;
      border: 1px solid #ffffff;
    }
  }
}

.details__section {
  margin-top: 10px;

  textarea {
    box-sizing: border-box;
    resize: none;
    width: 100%;
    height: 100px;
  }
}
</style>