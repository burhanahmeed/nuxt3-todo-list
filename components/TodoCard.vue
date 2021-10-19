<template>
  <div class="p-6 bg-white shadow-lg rounded-xl text-gray-800" data-cy="todo-item">
    <div class="flex justify-between">
      <div class="flex items-center space-x-4">
        <input
          data-cy="todo-item-checkbox"
          type="checkbox"
          :checked="!todo.is_active"
          @click="updateStatus(!todo.is_active)"
        >
        <div class="h-4 w-4 rounded-full" :class="`${color}`" data-cy="todo-item-priority-indicator"></div>
        <span :class="`${!todo.is_active && 'line-through'}`" data-cy="todo-item-title">{{ todo.title }}</span>
        <span data-cy="todo-item-edit-button"></span>
      </div>
      <IconsTrash class="cursor-pointer" @click="openTrashModal" data-cy="todo-item-delete-button" />
      <Modal ref="modal" v-slot="{ close }" :customStyle="{ maxWidth: '450px' }">
        <div class="text-center space-y-4" data-cy="modal-delete">
          <img class="mx-auto" src="https://ivan-todo-devrank.netlify.app/static/media/icon-alert.8a9d9385.svg" alt="alert" data-cy="modal-delete-icon">
          <div class="">
            Apakah Anda yakin menghapus item <strong>"{{ todo.title }}"</strong>?
          </div>
          <div class="mx-auto w-full space-x-2">
            <button class="p-2 px-8 bg-gray-200 rounded-4xl text-black text-lg" @click="() => {close(); isModalOpen = false;}">
              Batal
            </button>
            <button class="p-2 px-8 bg-red-500 rounded-4xl text-white text-lg" @click="() => {deleteOne(); close();}">
              Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { priority } from '@/config/constant';
import { updateTodo, deleteTodo } from '@/services/dashboard';
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['init'],
  setup(props, { emit }) {
    const { data } = toRefs(props)
    const modal = ref(null)
    const isModalOpen = ref(false)

    // onMounted(() => {
    //   document.addEventListener("click", (e) => {
    //     if (!box.contains(e.target) && isModalOpen.value) {
    //       isModalOpen.value = false;
    //       modal.value.close();
    //     }
    //   });
    // })

    const todo = computed(() => {
      return data && data.value || {};
    })

    const color = computed(() => {
      const obj = priority.find((el) => el.id === todo.value.priority)
      if (obj) {
        return obj.color
      }

      return null
    })

    const updateStatus = async (value) => {
      await updateTodo(todo.value.id, {
        priority: todo.value.priority,
        is_active: value
      });

      emit('init');
    }

    const openTrashModal = () => {
      modal.value.open();
      isModalOpen.value = true;
    }

    const deleteOne = async () => {
      await deleteTodo(todo.value.id);
      isModalOpen.value = false;
      emit('init');
    }

    return {
      deleteOne,
      todo,
      updateStatus,
      color,
      openTrashModal,
      modal,
    }
  }
}
</script>

<style>

</style>