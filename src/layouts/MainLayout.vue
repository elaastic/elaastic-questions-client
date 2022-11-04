<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-elaastic text-white q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="img:src/assets/elaastic_picto_rvb.png"
          aria-label="Menu"
          size="20px"
          to="/"
        />

        <q-toolbar-title class="full-width">{{ title }}</q-toolbar-title>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat>
            <q-avatar size="26px">
              <img
                src="https://cdn.quasar.dev/img/boy-avatar.png"
                alt="Account"
              />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const title = computed(() => {
  return route.meta.title ?? 'elaastic';
});
</script>

<style type="text/css" scoped>
.bg-elaastic {
  background-color: #4f7691;
}
</style>
