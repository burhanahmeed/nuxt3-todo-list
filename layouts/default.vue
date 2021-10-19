<template>
  <div>
    <Head lang="'en-US'">
      <Title>To Do List App</Title>
      <Meta name="description" content="To Do List App" />
    </Head>
    <div class="bg-primary p-4 py-6 flex align-items" data-cy="header-background">
      <div class="container mx-auto">
        <h2 data-cy="header-title" class="text-2xl font-bold text-white">TO DO LIST APP</h2>
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