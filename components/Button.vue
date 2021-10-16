<template>
  <button :disabled="loading" class="p-4 px-8 bg-primary rounded-4xl text-white text-xl">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
    }
  }
}
</script>

<style>

</style>