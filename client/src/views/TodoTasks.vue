<template>
  <div class="todoTasks__container">
    <todo-tasks ></todo-tasks>
  </div>
</template>

<script>
import TodoTasks from '@/components/TodoTasks.vue'
export default {
  components: {TodoTasks},
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
  margin: 0 auto;
  width: 800px;
}
</style>