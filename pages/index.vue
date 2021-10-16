<template>
  <div class="container px-6 mx-auto">
    <div class="flex justify-between py-8">
      <div>
        <h1 class="text-4xl font-bold">Activity</h1>
      </div>
      <div>
        <Button text="+ Tambah" @click="addData" />
      </div>
    </div>
    <div class="filled-component" v-if="groups && groups.length">
      <template v-for="gr in groups" :key="gr.id">
        <ActivityGroupCard :data="gr" class="m-2 inline-block" />
      </template>
    </div>
    <div class="empty-component" v-else>
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
      const { data } = await getActivityGroupLists();
      groups.value = data;
    }

    const addData = async () => {
      await addActivityGroup({ title: 'New Activity' });
      fetchData();
    }

    return {
      groups,
      addData,
    }
  }
}
</script>

<style>

</style>