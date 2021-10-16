<template>
  <div>
    <div class="bg-primary p-4 py-6 flex align-items">
      <div class="container mx-auto">
        <h2 class="text-2xl font-bold text-white">To Do List App</h2>
      </div>
    </div>
    <div class="bg-gray-100" style="min-height: calc(100vh - 82px)">
      <slot />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>