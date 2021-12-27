<template>
  <div>
    <div class="header">
      <h1 class="todoTitle">{{ todoListName }}</h1>
    </div>
    <tasks
      class="todoTasks__container"
      :todoListId="todoListId"
      :todoListName="todoListName"
    ></tasks>
  </div>
</template>

<script>
import Tasks from "@/components/Tasks.vue";
export default {
  components: { Tasks },
  props: { todoListId: String, todoListName: String },
  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
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
}
</style>