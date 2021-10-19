<template>
  <div class="container px-8 mx-auto">
    <div class="flex justify-between py-8">
      <div class="flex items-center space-x-2">
        <IconsChevronLeft data-cy="todo-back-button" class="cursor-pointer font-bold" @click="$router.go(-1)" />
        <div style="max-width: 600px;" id="box">
          <h1 data-cy="todo-title" v-if="!isEdit" class="text-4xl font-bold no-click" @click="edit">{{ content.title }}</h1>
          <input v-else v-model="title" type="text" class="no-click bg-gray-100 border-b border-gray-800 w-72 outline-none text-4xl">
        </div>
        <IconsPencil data-cy="todo-title-edit-button" />
      </div>
      <div class="flex items-center space-x-2">
        <DropdownSort @sort="sortTodo" data-cy="todo-sort-button" />
        <Button data-cy="todo-add-button" text="+ Tambah" @click="openModal" />
        <Modal ref="modal" v-slot="{ close }">
          <div class="space-y-2" data-cy="modal-add">
            <div class="border-b border-gray-200 flex justify-between p-2">
              <h3 data-cy="modal-add-title" class="text-xl font-bold">Tambah List Item</h3>
              <span data-cy="modal-add-close-button" @click="close" class="text-xl cursor-pointer">&times;</span>
            </div>
            <div class="py-6 space-y-6">
              <div class="space-y-4">
                <label data-cy="modal-add-name-title" for="">Nama List Item</label>
                <input data-cy="modal-add-name-input" type="text" class="form-control h-10" v-model="form.title">
              </div>
              <div class="space-y-4">
                <label data-cy="modal-add-priority-title" for="">Priority</label>
                <div class="w-48">
                  <select name="" class="form-control h-10" id="" v-model="form.priority" data-cy="modal-add-priority-dropdown">
                    <option :value="i.id" v-for="i in priorities" :key="i.id" data-cy="modal-add-priority-item">
                      <div class="flex">
                        <span :class="i.color" class="h-4 w-4 rounded-full"></span>
                        <span>{{ i.name }}</span>
                      </div>
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="mx-auto w-full space-x-2 text-right border-t p-2 py-4">
              <button :disabled="!form.title" data-cy="modal-add-save-button" class="p-2 px-8 bg-blue-500 rounded-4xl text-white text-lg" @click="() => {addOne(); close();}">
                Simpan
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
    <div class="item-exist space-y-4" v-if="content.todo_items && content.todo_items.length">
      <template v-for="n in todoLists" :key="n.id">
        <TodoCard :data="n" @init="fetchData" />
      </template>
    </div>
    <div class="empty-component" v-else data-cy="todo-empty-state">
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
import { showActivityGroup, updateActivityGroup, addTodo } from '@/services/dashboard'
import { useRoute } from 'vue-router';
import { priority } from '@/config/constant';

export default {
  layout: 'default',
  setup() {
    const route = useRoute();

    const isEdit = ref(false);
    const content = ref({});
    const title = ref('');
    const modal = ref(null);
    const priorities = ref(priority);
    const form = ref({
      title: undefined,
      priority: 'high',
      activity_group_id: route.params.id,
    });

    onMounted(() => {
      document.addEventListener("click", (e) => {
        if (!box.contains(e.target) && isEdit.value) {
          updateActivityGroup(route.params.id, {
            title: title.value
          }).then(() => {
            isEdit.value = false;
            content.value.title = title.value;
          })
        }
      });
      fetchData();
    });

    const sort = ref('terbaru');
    const todoLists = computed(() => {
      const lists = content && content.value && content.value.todo_items || [];

      if (sort.value === 'terbaru') {
        return lists.sort((a, b) => new Date(a.id) < new Date(b.id) && 1 || -1)
      } else if (sort.value === 'terlama') {
        return lists.sort((a, b) => new Date(a.id) > new Date(b.id) && 1 || -1)
      } else if (sort.value === 'a-z') {
        return lists.sort((a, b) => a.title > b.title && 1 || -1)
      } else if (sort.value === 'z-a') {
        return lists.sort((a, b) => a.title < b.title && 1 || -1)
      } else if (sort.value === 'unfinish') {
        return lists.sort((a, b) => a.is_active > b.is_active && 1 || -1)
      }
    })

    const sortTodo = (val) => {
      sort.value = val;
    }

    const fetchData = async () => {
      try {
        const data = await showActivityGroup(route.params.id);
        content.value = data;
        title.value = content.value.title;
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

    const openModal = () => {
      modal.value.open();
    }

    const addOne = async () => {
      await addTodo(form.value);
      form.value = {
        title: undefined,
        priority: 'high',
        activity_group_id: route.params.id,
      }
      fetchData();
    }

    return {
      sortTodo,
      edit,
      closeEdit,
      isEdit,
      content,
      fetchData,
      title,
      todoLists,
      modal,
      openModal,
      priorities,
      addOne,
      form,
    }
  },
}
</script>

<style>
.form-control {
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  appearance: none;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>