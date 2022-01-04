<template>
  <div class="todoAlert__container">
    <p class="message">{{ message }}</p>
    <div class="button__container">
      <button @click="emitHideAlert" class="okayButton">
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.setColors();
  },

  props: {
    message: String,
    bgColor: String,
    textColor: String,
  },
  methods: {
    setColors() {
      const todoAlert = document.getElementsByClassName(
        "todoAlert__container"
      )[0];
      const message = document.getElementsByClassName("message")[0];
      todoAlert.style.backgroundColor = this.color || "#ff6666";
      message.style.color = this.textColor || "#ffffff";
    },
    emitHideAlert() {
      this.$emit("hideAlertEmitted");
    },
  },
};
</script>

<style lang="scss" scoped>
.todoAlert__container {
  width: 90%;
  position: absolute;
  margin-right: auto;
  margin-left: auto;
  left: 0;
  right: 0;
  top: 160px;
  z-index: 10;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;

  @media screen and (min-width: 500px) {
    width: 500px;
  }

  .message {
    margin: 0;
    width: 80%;
  }
}

.okayButton {
  padding: 5px 9px;
  background-color: #d9d9d9;
  color: #ffffff;
  border: none;
  background-color: transparent;
  &:hover {
    color: #d9d9d9;
  }

  &:active {
    color: #ffffff;
  }
}
</style>