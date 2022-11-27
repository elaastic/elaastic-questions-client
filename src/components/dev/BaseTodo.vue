<template>
  <q-banner dense rounded :class="color">
    <template v-slot:avatar>
      <q-icon name="schedule" color="primary" />
    </template>
    Le composant "<span class="text-weight-bold">{{ name }}</span
    >" n'est pas encore implémenté.
  </q-banner>
</template>

<script setup lang="ts">
defineProps({
  name: String,
  color: {
    type: String,
    default: "white",
  },
});
</script>
<style scoped></style>
