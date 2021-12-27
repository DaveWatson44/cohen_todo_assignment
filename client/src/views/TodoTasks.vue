<template>
  <div >
    <div class="header">
      <h1 class="todoTitle">{{todoListName}}</h1>
    </div>
    <tasks class="todoTasks__container" :todoListId="todoListId" :todoListName="todoListName"></tasks>
  </div>
</template>

<script>
import Tasks from '@/components/Tasks.vue'
export default {
  components: {Tasks},
  props: {todoListId: String, todoListName: String},
  data() {
    return {
   
    };
  },

  methods: {
  
  },
};
</script>

<style lang="scss" scoped>

.todoTasks__container{
  margin: 20px auto 0 auto;
  width: 640px;
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  background-color: #8c1aff;
  font-family: Arial, Helvetica, sans-serif;
  height: 200px;
  margin: 0;
  color: #ffffff;
  display: flex;
  align-items: flex-end;

  .todoTitle{
    width: 640px;
    margin: 0 auto 10px auto;
  }

}
</style>