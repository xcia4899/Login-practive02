<template>
  <div>
    <h1>Home View</h1>
    {{userStore.token}}
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
</script>

<style scoped lang="scss">

</style>