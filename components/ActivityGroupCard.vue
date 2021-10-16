<template>
  <nuxt-link :to="`/detail/${activity.id}`">
    <div class="p-6 bg-white shadow-lg rounded-xl text-gray-800" style="width: 230px; height: 230px;">
      <div style="height: 170px;" class="cursor-pointer">
        <h3 class="font-bold text-xl">{{ activity.title }}</h3>
      </div>
      <div class="flex justify-between">
        <span>{{ formatDate(activity.created_at) }}</span>
        <IconsTrash class="cursor-pointer" />
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { dateFormat } from '@/utils';
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const activity = computed(() => {
      return (data && data.value) || {};
    });

    const formatDate = (date) => {
      return dateFormat(date);
    }

    return {
      activity,
      formatDate,
    }
  }
}
</script>

<style>

</style>