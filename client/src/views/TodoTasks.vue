<template>
  <div class="todoTasks__container">
    <tasks ></tasks>
  </div>
</template>

<script>
import Tasks from '@/components/Tasks.vue'
export default {
  components: {Tasks},
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
  width: 640px;
}
</style>