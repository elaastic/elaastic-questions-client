<template>
  <page-title icon="book" :title="assignment.title" />

  <q-banner class="bg-negative" v-if="assignment.statements.length === 0">
    There is no question in this assignment.
  </q-banner>

  <template v-else>
    <div class="q-pa-sm flex flex-center">
      Question n°
      <q-pagination
        class="q-ml-sm"
        v-model="currentQuestionIndex"
        :max="assignment.statements.length"
      />
    </div>

    <div>
      {{ assignment.statements[currentQuestionIndex - 1].title }}
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAssignmentStore } from 'stores/assignment-store';
import { useRoute } from 'vue-router';
import { parseIntFromUrlParam } from 'src/util/url';
import { Assignment } from 'src/models/assignment.interface';
import PageTitle from 'components/commons/PageTitle.vue';
const assignmentStore = useAssignmentStore();
const route = useRoute();

const assignment = computed((): Assignment => {
  const assignmentId = parseIntFromUrlParam(route.params.assignmentId);
  const assignment = assignmentStore.get(assignmentId);

  if (!assignment) {
    throw Error(`There is no assignment with id=${assignmentId}`); // TODO 404
  }

  return assignment;
});

const currentQuestionIndex = ref(1);
</script>

<style scoped></style>
