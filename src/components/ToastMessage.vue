<template>
  <transition name="fade">
    <div v-if="show" :class="['toast-message', type]">
      <p>{{ message }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ToastMessage',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success' // 'success' or 'error'
    }
  }
};
</script>

<style scoped>
.toast-message {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toast-message.success {
  background-color: #2ecc71; /* Green */
}

.toast-message.error {
  background-color: #e74c3c; /* Red */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
