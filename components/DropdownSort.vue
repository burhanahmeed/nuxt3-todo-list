<template>
  <div class="relative">
    <div class="border border-gray-200 p-2 rounded-full w-11 h-11"  @click="isDialogOpen = !isDialogOpen">
      <IconsSwitchVertical class="cursor-pointer" />
    </div>
    <div class="bg-white rounded shadow-md absolute top-15" v-show="isDialogOpen">
      <ul>
        <li class="list border-t" @click="selectSort('terbaru')">
          <div class="flex items-center space-x-4">
            <IconsSortAscending class="text-primary" />
            <span>Terbaru</span>
          </div>
          <span v-if="sortBy === 'terbaru'">&#10003;</span>
        </li>
        <li class="list" @click="selectSort('terlama')">
          <div class="flex items-center space-x-4">
            <IconsSortDescending class="text-primary" />
            <span>Terlama</span>
          </div>
          <span v-if="sortBy === 'terlama'">&#10003;</span>
        </li>
        <li class="list" @click="selectSort('a-z')">
          <div class="flex items-center space-x-4">
            <IconsSortAscending class="text-primary" />
            <span>A - Z</span>
          </div>
          <span v-if="sortBy === 'a-z'">&#10003;</span>
        </li>
        <li class="list" @click="selectSort('z-a')">
          <div class="flex items-center space-x-4">
            <IconsSortDescending class="text-primary" />
            <span>Z - A</span>
          </div>
          <span v-if="sortBy === 'z-a'">&#10003;</span>
        </li>
        <li class="list" @click="selectSort('unfinish')">
          <div class="flex items-center space-x-4">
            <IconsSwitchVertical class="text-primary" />
            <span>Belum Selesai</span>
          </div>
          <span v-if="sortBy === 'unfinish'">&#10003;</span>
        </li>
      </ul>  
    </div>
  </div>
</template>

<script>
export default {
  emits: ['sort'],
  setup(_, { emit }) {
    const sortBy = ref('terbaru');
    const isDialogOpen = ref(false);

    const selectSort = (value) => {
      emit('sort', value);
      sortBy.value = value;
      isDialogOpen.value = false;
    }

    return {
      selectSort,
      sortBy,
      isDialogOpen,
    }
  }
}
</script>

<style scoped>
.list {
  @apply
    flex justify-between
    p-4 px-4 
    border-b border-r border-l border-gray-200
    cursor-pointer
    w-48
    hover:bg-gray-200;
}
</style>