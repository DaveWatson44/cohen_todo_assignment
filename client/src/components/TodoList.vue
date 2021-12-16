<template>
  <div>
    <table>
      <tr>
        <td>{{ todoList.name }}</td>
        <td>{{tasks}}</td>
        <td>delete</td>
      </tr>
    </table>
    <button></button>
  </div>
</template>

<script>
export default {
  props: {
    todoList: Object,
  },

  mounted() {
    this.getTasks();
  },

  data(){
    return{
      tasks: [],
    }
  },

  methods: {
    getTasks() {
      this.$axios
        .get("/tasks", {params: {
          todoListId: this.todoList.id
        }})
        .then((resp) => {
          this.tasks = resp.data;
          console.log(resp.data);
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