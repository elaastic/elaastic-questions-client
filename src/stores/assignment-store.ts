import { defineStore } from "pinia";
import {
  Assignment,
  ServerAssignmentData,
  ServerSequenceData,
} from "src/models/assignment.interface";
import {
  DefaultSequence,
  pickRandomState,
} from "src/models/sequence.interface";
import { assignmentService } from "src/services/assignment-service";

interface AssignmentStoreState {
  metadata: {
    initialized: boolean;
    loading: boolean;
    error: null | Error;
  };

  myAssignmentMap: Map<number, Assignment>;
}

export const useAssignmentStore = defineStore("assignment", {
  state: (): AssignmentStoreState => ({
    metadata: {
      initialized: false,
      loading: false,
      error: null,
    },
    myAssignmentMap: new Map<number, Assignment>(),
  }),
  getters: {
    getAll: (state) => {
      return Array.from(state.myAssignmentMap.values());
    },
    get: (state) => {
      return (assignmentId: number) => state.myAssignmentMap.get(assignmentId);
    },
  },
  actions: {
    async loadMyAssignments() {
      this.metadata.loading = true;
      this.metadata.error = null;

      try {
        const data = await assignmentService.getMyAssignments();

        this.myAssignmentMap = data.reduce(
          (
            acc: Map<number, Assignment>,
            data: ServerAssignmentData,
            index: number
          ) => {
            acc.set(index, {
              ...data,
              id: index,
              sequences: "NotLoadedYet",
              lastUpdate: new Date(data.lastUpdate),
              nbSequence: Math.random() * (20 - 3) + 3,
            });
            return acc;
          },
          new Map()
        );
      } catch (e: unknown) {
        // TODO Handle error
        this.metadata.error = Error(e?.toString());
      } finally {
        this.metadata.loading = false;
        this.metadata.initialized = true;
      }
    },
    async loadSequences(assignmentId: number) {
      const assignment = this.myAssignmentMap.get(assignmentId);

      if (!assignment) {
        throw new Error(`The is no assignment for id='${assignmentId}'`);
      }

      assignment.sequences = "Loading";

      // TODO Handle errors
      const data = await assignmentService.getSequences(assignmentId);

      assignment.sequences = data.reduce(
        (acc: DefaultSequence[], sequenceData: ServerSequenceData) => {
          acc.push(
            new DefaultSequence({
              id: sequenceData.id,
              statement: {
                title: sequenceData.title,
                content: sequenceData.content,
              },
              state: pickRandomState(),
              interactions: [
                { type: "RESPONSE_SUBMISSION" },
                { type: "EVALUATION" },
                { type: "READ" },
              ],
              activeInteractionIndex: sequenceData.activeInteractionIndex,
              resultsArePublished: sequenceData.resultsArePublished,
            })
          );

          return acc;
        },
        []
      );
    },
  },
});
