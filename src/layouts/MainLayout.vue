<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-elaastic text-white q-py-xs" height-hint="58">
      <q-toolbar>
        <q-icon
          v-if="isHomePage"
          flat
          dense
          round
          name="img:src/assets/elaastic_picto_rvb.png"
          size="34px"
        />
        <q-btn
          v-else
          flat
          dense
          round
          icon="arrow_back_ios"
          aria-label="Menu"
          @click="$router.go(-1)"
        />

        <q-toolbar-title class="full-width"
          ><span id="layout-title">{{ title }}</span></q-toolbar-title
        >

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
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const route = useRoute();
const i18n = useI18n();

const title = computed(() => {
  return route.meta.titleKey ?
    i18n.t(route.meta.titleKey as string)
    : route.meta.title ?? "elaastic";
});

const isHomePage = computed(() => {
  return route.meta.home;
});
</script>

<style type="text/css" scoped>
.bg-elaastic {
  background-color: #4f7691;
}
</style>
