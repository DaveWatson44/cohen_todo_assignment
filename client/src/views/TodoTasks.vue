<template>
  <div>
    <table>
      <task-row v-for="(task, index) in tasks" :key="index" :task="task">
      </task-row>
    </table>
  </div>
</template>

<script>
import TaskRow from "@/components/TaskRow.vue";
export default {
  components: { TaskRow },
  props: {
    todoList: Object,
  },

  mounted() {
    this.getTasks();
  },
  data() {
    return {
      showDetails: false,
      tasks: [],
    };
  },

  methods: {
    getTasks() {
      this.$axios
        .get("/tasks", {
          params: {
            todoListId: this.$route.params.id,
          },
        })
        .then((resp) => {
          this.tasks = resp.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>