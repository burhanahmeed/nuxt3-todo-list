<template>
  <div class="container px-6 mx-auto">
    <div class="flex justify-between py-8">
      <div>
        <h1 class="text-4xl font-bold" data-cy="activity-title">Activity</h1>
      </div>
      <div data-cy="activity-add-button">
        <Button text="+ Tambah" @click="addData" />
      </div>
    </div>
    <div class="filled-component" v-if="groups && groups.length">
      <template v-for="gr in groups" :key="gr.id">
        <ActivityGroupCard :data="gr" class="m-2 inline-block" @init="fetchData" />
      </template>
    </div>
    <div class="empty-component" v-else data-cy="activity-empty-state">
      <div class="">
        <img
          class="mx-auto block"
          src="https://ivan-todo-devrank.netlify.app/static/media/empty-activity.75ec54ee.png"
          alt="image todo empty"
          loading="lazy"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getActivityGroupLists, addActivityGroup } from '@/services/dashboard';

export default {
  layout: 'default',
  setup() {
    const groups = ref(undefined);
    onMounted(async () => {
      fetchData();
    });

    const fetchData = async () => {
      try {
        const { data } = await getActivityGroupLists();
        groups.value = data;
      } catch (error) {
        console.log(error);
      }
    }

    const addData = async () => {
      await addActivityGroup({ title: 'New Activity' });
      fetchData();
    }

    return {
      groups,
      addData,
      fetchData
    }
  }
}
</script>

<style>

</style>