<template>
    <div class="p-6 bg-white shadow-lg rounded-xl text-gray-800" style="width: 230px; height: 230px;">
      <nuxt-link :to="`/detail/${activity.id}`" data-cy="activity-item">
        <div style="height: 170px;" class="cursor-pointer" data-cy="activity-item-title">
          <h3 class="font-bold text-xl">{{ activity.title }}</h3>
        </div>
      </nuxt-link>
      <div class="flex justify-between">
        <span data-cy="activity-item-date">{{ formatDate(activity.created_at) }}</span>
        <IconsTrash data-cy="activity-item-delete-button" class="cursor-pointer" @click="openTrashModal" />
        <Modal ref="modal" v-slot="{ close }" :customStyle="{ maxWidth: '450px' }">
          <div class="text-center space-y-4" data-cy="modal-delete">
            <img class="mx-auto" src="https://ivan-todo-devrank.netlify.app/static/media/icon-alert.8a9d9385.svg" alt="alert" data-cy="modal-delete-icon">
            <div class="">
              Apakah Anda yakin menghapus activity <strong>"{{ activity.title }}"</strong>?
            </div>
            <div class="mx-auto w-full space-x-2">
              <button class="p-2 px-8 bg-gray-200 rounded-4xl text-black text-lg" @click="close">
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
import { dateFormat } from '@/utils';
import { deleteActivityGroup } from '@/services/dashboard';

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['init'],
  setup(props, { emit }) {
    const { data } = toRefs(props);
    const modal = ref(null);

    const activity = computed(() => {
      return (data && data.value) || {};
    });

    const formatDate = (date) => {
      return dateFormat(date);
    }

    const deleteOne = async () => {
      await deleteActivityGroup(activity.value.id);
      emit('init');
    }

    const openTrashModal = () => {
      modal.value.open();
    }

    return {
      deleteOne,
      activity,
      formatDate,
      openTrashModal,
      modal,
    }
  }
}
</script>

<style>

</style>