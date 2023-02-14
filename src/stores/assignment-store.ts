import { defineStore } from "pinia";
import { Assignment } from "src/models/assignment.interface";
import { NotFoundError } from "src/models/error";

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
      return (assignmentId: number): Assignment | undefined => {
        if (!state.metadata.initialized) {
          return undefined;
        }

        const assignment = state.myAssignmentMap.get(assignmentId);

        if (!assignment) {
          throw new NotFoundError(
            `There is no assignment with id=${assignmentId}`
          );
        }

        return assignment;
      };
    },
  },
  actions: {
    async loadSequences(assignmentId: number) {
      const assignment = this.myAssignmentMap.get(assignmentId);

      if (!assignment) {
        throw new NotFoundError(
          `The is no assignment for id='${assignmentId}'`
        );
      }

      // TODO Handle errors
      // const data = await assignmentService.getSequences(assignmentId);

      // assignment.sequences = {
      //   status: "Loaded",
      //   value: data.reduce(
      //     (acc: DefaultSequence[], sequenceData: ServerSequenceData) => {
      //       acc.push(
      //         new DefaultSequence({
      //           id: sequenceData.id,
      //           statement: {
      //             title: sequenceData.title,
      //             content: sequenceData.content,
      //           },
      //           state: pickRandomState(),
      //           phases: [
      //             { type: "RESPONSE_SUBMISSION", state: "DONE" },
      //             { type: "EVALUATION", state: "ACTIVE" },
      //             { type: "READ", state: "CLOSED" },
      //           ],
      //           activeInteractionIndex: sequenceData.activeInteractionIndex,
      //           resultsArePublished: sequenceData.resultsArePublished,
      //         })
      //       );
      //
      //       return acc;
      //     },
      //     []
      //   ),
      // };
    },
  },
});
