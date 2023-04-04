<template>
  <page-title icon="menu_book" :title="assignment.title" />

  <app-data-loader :status="status" :error="error" :loading-message="$t('assignment.loading', 1)">
    <assignment-content
      :assignment="assignment"
      :sequences="sequences"
      v-if="sequences"
    />
  </app-data-loader>
</template>

<script setup lang="ts">
import { PropType, Ref } from "vue";
import PageTitle from "src/features/app/PageTitle.vue";
import { Assignment } from "src/features/assignment/assignment.interface";
import { useSequenceList } from "src/features/assignment/sequence/sequence.query";
import AssignmentContent from "src/features/assignment/AssignmentContent.vue";
import { ClientSequence } from "src/features/assignment/sequence/sequence.interface";
import AppDataLoader from "src/features/app/AppDataLoader.vue";

const props = defineProps({
  assignment: {
    type: Object as PropType<Assignment>,
    required: true,
  },
});

const { status, error, data } = useSequenceList(props.assignment.id);

const sequences: Ref<ClientSequence[]> | Ref<undefined> = data;
</script>

<style scoped></style>
