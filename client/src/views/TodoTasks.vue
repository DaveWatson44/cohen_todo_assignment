<template>
  <div class="todoTasksView__container">
    <todo-alert
      v-if="showAlert"
      :bgColor="alertBgColor"
      :message="alertMessage"
      :textColor="alertTextColor"
      @hideAlertEmitted="hideTodoAlert"
    ></todo-alert>
    <div class="header">
      <h1 class="todoTitle">{{ todoListName }}</h1>
    </div>
    <todo-tasks
      class="todoTasks__container"
      :todoListId="todoListId"
      :todoListName="todoListName"
      @showAlertEmitted="showTodoAlert"
    ></todo-tasks>
  </div>
</template>

<script>
import TodoTasks from "@/components/TodoTasks.vue";
import TodoAlert from "@/components/TodoAlert.vue";
export default {
  components: { TodoTasks, TodoAlert },
  props: { todoListId: String, todoListName: String },
  data() {
    return {
      showAlert: false,
      alertMessage: "",
      alertTextColor: "",
      alertBgColor: "",
    };
  },

  methods: {
    showTodoAlert(payload) {
      this.alertMessage = payload.alertMessage;
      this.alertTextColor = payload.alertTextColor;
      this.alertBgColor = payload.alertBgColor;
      this.showAlert = true;
    },
    hideTodoAlert() {
      this.showAlert = false;
    },
  },
};
</script>

<style lang="scss" scoped>

.todoTasksView__container{
  position: relative;
}

.todoTasks__container {
  margin: 20px auto 0 auto;
  font-family: Arial, Helvetica, sans-serif;
  width: 90%;

  @media screen and (min-width: 320px) {
    width: 250px;
  }
  @media screen and (min-width: 430px) {
    width: 65%;
  }
  @media screen and (min-width: 630px) {
    width: 640px;
  }
}

.header {
  background-color: #8c1aff;
  font-family: Arial, Helvetica, sans-serif;
  height: 200px;
  margin: 0;
  color: #ffffff;
  display: flex;
  align-items: flex-end;

  .todoTitle {
    margin: 0 auto 10px auto;
    width: 90%;
    overflow: hidden;
    font-size: 1em;
    @media screen and (min-width: 320px) {
      width: 250px;
      font-size: 1.5em;
    }
    @media screen and (min-width: 430px) {
      width: 65%;
      font-size: 1.8em;
    }
    @media screen and (min-width: 630px) {
      width: 640px;
    }
  }
}
</style>