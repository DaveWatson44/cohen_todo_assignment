<template>
  <div class="task__container">
    <div class="taskDetails__container">
      <div class="taskInformation__container" @click="activateShowDetails">
        <div style="display: flex; align-items: center">
          <input
            type="checkbox"
            v-model="task.isCompleted"
            @change.stop="updateTask(task)"
            class="taskField taskIsCompleted"
            @click="stopProp"
          />
          <input
            :disabled="task.isNew == true ? false : isDisabled"
            type="text"
            id="name"
            v-model="task.name"
            class="taskField taskName"
            placeholder="Task name."
            ref="taskName"
          />
        </div>

        <input
          :disabled="task.isNew == true ? false : isDisabled"
          type="date"
          id="dueDate"
          v-model="task.dueDate"
          class="taskField taskDueDate"
        />
        <select
          :disabled="task.isNew == true ? false : isDisabled"
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
          v-if="task.isNew == true ? false : isDisabled"
          :disabled="task.name.length < 1 || task.description.length < 1"
          @click="toggleEdit(task)"
          class="taskEditButton"
        >
          <font-awesome-icon :icon="['fas', 'edit']" />
        </button>
        <button v-else @click="task.isNew == true ? addTask(task) : updateTask(task)" class="taskSaveButton">
          <font-awesome-icon :icon="['fas', 'save']" />
        </button>
        <button @click="task.isNew == true ? emitToggleAddTask() : deleteTask(task.id)" class="taskDeleteButton">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>
    </div>
    <select
      :disabled="task.isNew == true ? false : isDisabled"
      id="priority"
      v-model="task.priority"
      class="taskField taskPriorityMobile"
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
      :disabled="task.isNew == true ? false : isDisabled"
      type="date"
      id="dueDate"
      v-model="task.dueDate"
      class="taskField taskDueDateMobile"
    />
    <div v-show="showDetails || task.isNew == true" class="details__section">
      <textarea
        :disabled="task.isNew == true ? false : isDisabled"
        type="text"
        id="description"
        v-model="task.description"
        class="taskField taskDescription"
        placeholder="Description"
      >
      </textarea>
    </div>

    <div class="taskButtonMobile__container">
      <button
        v-if="task.isNew == true ? false : isDisabled"
        :disabled="task.name.length < 1 || task.description.length < 1"
        @click="toggleEdit(task)"
        class="taskEditButton"
      >
        <font-awesome-icon :icon="['fas', 'edit']" />
      </button>
      <button v-else @click="task.isNew == true ? addTask(task) : updateTask(task)" class="taskSaveButton">
        <font-awesome-icon :icon="['fas', 'save']" />
      </button>
      <button @click="task.isNew == true ? emitToggleAddTask() : deleteTask(task.id)" class="taskDeleteButton">
        <font-awesome-icon :icon="['fas', 'times']" />
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

  mounted(){
    if(this.task.isNew == true){
      this.$refs.taskName.focus();
    }
  },

  data() {
    return {
      isDisabled: true,
      showDetails: false,
    };
  },

  methods: {
    toggleEdit(task) {
      if (task.isCompleted == true) {
        return;
      } else {
        console.log(this.showDetails);
        this.showDetails = true;
        this.isDisabled = !this.isDisabled;
      }
    },

    stopProp(e){
      e.stopPropagation();
    },

    updateTask(task) {
      this.$axios
        .put("/tasks", task)
        .then((resp) => {
          this.$emit("getTasksEmitted");
          console.log(resp.data);
          this.isDisabled = true;
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
      if (this.isDisabled) {
        this.toggleShowDetails();
      }
    },

    emitToggleAddTask(){
      this.$emit('toggleAddTaskEmitted');
    },

addTask(task) {
      if (
        task.name.length > 0 &&
        task.name.length <= 20 &&
        task.description.length > 1
      ) {
        this.$axios
          .post("/tasks", {
            todoListId: task.todoListId,
            name: task.name,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            isCompleted: task.isCompleted,
          })
          .then((resp) => {
            console.log(resp.data);
            this.$emit('taskAddedEmitted');
         
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
  width: 95%;
  justify-content: space-between;

  @media screen and (min-width: 450px) {
    justify-content: space-between;
    width: 80%;
  }
}

.taskField {
  background-color: #ffffff;
  padding: 5px;
}

.taskName {
  border: none;
  outline: none;
  width: 80px;
  &:focus {
    border-bottom: 1px solid black;
  }
  @media screen and (min-width: 500px) {
    }
}

.taskDueDate {
  border: none;
  outline: none;
  display: none;
  &:focus {
    border-bottom: 1px solid black;
  }
  @media screen and(min-width: 630px) {
    display: block;
  }
}

.taskDueDateMobile {
  display: block;
  border: none;
  outline: none;
  &:focus {
    border-bottom: 1px solid black;
  }
  @media screen and(min-width: 630px) {
    display: none;
  }
}

.taskPriority {
  display: none;
  // width: 20px;
  @media screen and (min-width: 270px) {
    display: block;
  }
}

.taskPriorityMobile {
  display: block;
  margin: 10px 0;
  @media screen and (min-width: 270px) {
    display: none;
  }
}

.taskButton__container {
  height: 25px;
  display: none;
  @media screen and(min-width: 450px) {
    height: 29px;
    display: block;
  }
}
button {
  height: 100%;
  background-color: #ffffff;
  border: 1px solid #8c1aff;
  color: #8c1aff;
  width: 26px;

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

  @media screen and(min-width: 460px) {
    width: 30px;
  }
}

.taskButtonMobile__container {
  height: 25px;
  display: flex;
  justify-content: flex-end;

  @media screen and(min-width: 450px) {
    display: none;
    height: 29px;
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