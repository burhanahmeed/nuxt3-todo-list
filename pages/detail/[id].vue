<template>
  <div class="container px-8 mx-auto">
    <div class="flex justify-between py-8">
      <div class="flex items-center space-x-2">
        <IconsChevronLeft class="cursor-pointer font-bold" @click="$router.go(-1)" />
        <div>
          <h1 v-if="!isEdit" class="text-4xl font-bold no-click" @click="edit">{{ content.title }}</h1>
          <input v-else :value="content.title" type="text" class="no-click bg-gray-100 border-b border-gray-800 w-72 outline-none text-4xl">
        </div>
        <IconsPencil />
      </div>
      <div class="flex items-center space-x-2">
        <DropdownSort />
        <Button text="+ Tambah" />
      </div>
    </div>
    <div class="item-exist space-y-4" v-if="content.todo_items && content.todo_items.length">
      <template v-for="n in content.todo_items" :key="n.id">
        <TodoCard :data="n" />
      </template>
    </div>
    <div class="empty-component" v-else>
      <div class="">
        <img
          class="mx-auto block"
          src="https://ivan-todo-devrank.netlify.app/static/media/empty-item.a0b4b794.png"
          alt="image todo empty"
          loading="lazy"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { showActivityGroup } from '@/services/dashboard'
import { useRoute } from 'vue-router';

export default {
  layout: 'default',
  setup() {
    const route = useRoute();
    const isEdit = ref(false);
    const content = ref({});

    onMounted(() => {
      // document.addEventListener('click', (evt) => {
      //   isEdit.value = false;
      // });
      fetchData();
    });

    const fetchData = async () => {
      try {
        const data = await showActivityGroup(route.params.id);
        content.value = data;
      } catch (error) {
        console.log(error);
      }
    }

    const edit = () => {
      setTimeout(() => {
        isEdit.value = true;
      }, 300);
    }

    const closeEdit = () => {
      isEdit.value = false;
    }

    return {
      edit,
      closeEdit,
      isEdit,
      content,
    }
  },
}
</script>

<style>

</style>