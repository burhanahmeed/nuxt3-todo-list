<template>
  <!-- Modal Background -->
  <div v-show="showModal" class="fixed text-gray-500 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0" x-transition:enter="transition ease duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition ease duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0">
      <!-- Modal -->
      <div v-show="showModal" :style="customStyle" class="bg-white rounded-xl shadow-2xl p-6 sm:w-10/12 mx-10" x-transition:enter="transition ease duration-100 transform" x-transition:enter-start="opacity-0 scale-90 translate-y-1" x-transition:enter-end="opacity-100 scale-100 translate-y-0" x-transition:leave="transition ease duration-100 transform" x-transition:leave-start="opacity-100 scale-100 translate-y-0" x-transition:leave-end="opacity-0 scale-90 translate-y-1">
        <slot :close="close" />
      </div>
  </div>
</template>

<script>
export default {
  props: {
    customStyle: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    const showModal = ref(false)

    const close = () => {
      showModal.value = false;
    }

    const open = () => {
      showModal.value = true;
    }

    return {
      showModal,
      close,
      open,
    }
  }
}
</script>

<style>

</style>