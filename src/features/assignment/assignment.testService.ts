import { Assignment } from "src/features/assignment/assignment.interface";
import { ClientSequence } from "src/features/assignment/sequence/sequence.interface";

function giveMeAnAssignment(): Assignment {
  return {
    id: 123,
    lastUpdated: new Date(),
    title: "An assignment",
  };
}

function giveMeSomeSequences(nb: number): ClientSequence[] {
  return Array.from(Array(nb).keys()).map((i) => ({
    activeInteractionIndex: undefined,
    id: i,
    phases: [],
    resultsArePublished: false,
    state: "NOT_STARTED",
    statement: {
      content: `content ${i}`,
      title: `statement ${i}`,
    },
  }));
}

export const AssignmentTestService = {
  giveMeAnAssignment,
  giveMeSomeSequences,
}
