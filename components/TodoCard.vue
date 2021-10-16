<template>
  <div class="p-6 bg-white shadow-lg rounded-xl text-gray-800">
    <div class="flex justify-between">
      <div class="flex items-center space-x-4">
        <input type="checkbox" :checked="todo.is_active">
        <div class="h-4 w-4 rounded-full bg-red-500"></div>
        <span>{{ todo.title }}</span>
      </div>
      <IconsTrash class="cursor-pointer"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const { data } = toRefs(props)

    const todo = computed(() => {
      return data && data.value || {};
    })

    return {
      todo
    }
  }
}
</script>

<style>

</style>