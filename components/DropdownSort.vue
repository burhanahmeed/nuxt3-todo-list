<template>
  <div class="relative">
    <div class="border border-gray-200 p-2 rounded-full w-11 h-11"  @click="isDialogOpen = !isDialogOpen">
      <IconsSwitchVertical class="cursor-pointer" />
    </div>
    <div class="bg-white rounded shadow-md absolute top-15" v-show="isDialogOpen">
      <ul>
        <li class="list border-t" @click="selectSort('terbaru')" data-cy="sort-selection">
          <div class="flex items-center space-x-4" :data-cy="sortBy === 'terbaru' && 'sort-selection-selected'">
            <IconsSortAscending data-cy="sort-selection-icon" class="text-primary" />
            <span data-cy="sort-selection-title">Terbaru</span>
          </div>
          <span v-if="sortBy === 'terbaru'">&#10003;</span>
        </li>
        <li class="list" @click="selectSort('terlama')" data-cy="sort-selection">
          <div class="flex items-center space-x-4" :data-cy="sortBy === 'terlama' && 'sort-selection-selected'">
            <IconsSortDescending data-cy="sort-selection-icon" class="text-primary" />
            <span data-cy="sort-selection-title">Terlama</span>
          </div>
          <span v-if="sortBy === 'terlama'">&#10003;</span>
        </li>
        <li class="list" @click="selectSort('a-z')" data-cy="sort-selection">
          <div class="flex items-center space-x-4" :data-cy="sortBy === 'a-z' && 'sort-selection-selected'">
            <IconsSortAscending data-cy="sort-selection-icon" class="text-primary" />
            <span data-cy="sort-selection-title">A - Z</span>
          </div>
          <span v-if="sortBy === 'a-z'">&#10003;</span>
        </li>
        <li class="list" @click="selectSort('z-a')" data-cy="sort-selection">
          <div class="flex items-center space-x-4" :data-cy="sortBy === 'z-a' && 'sort-selection-selected'">
            <IconsSortDescending data-cy="sort-selection-icon" class="text-primary" />
            <span data-cy="sort-selection-title">Z - A</span>
          </div>
          <span v-if="sortBy === 'z-a'">&#10003;</span>
        </li>
        <li class="list" @click="selectSort('unfinish')" data-cy="sort-selection">
          <div class="flex items-center space-x-4" :data-cy="sortBy === 'unfinish' && 'sort-selection-selected'">
            <IconsSwitchVertical data-cy="sort-selection-icon" class="text-primary" />
            <span data-cy="sort-selection-title">Belum Selesai</span>
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