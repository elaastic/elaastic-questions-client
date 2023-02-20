import { Sequence, SequenceIcon, SequenceState } from "src/features/assignment/sequence/sequence.interface";
import { getActivePhase } from "src/services/sequence-service";

export function pickRandomState(): SequenceState {
  const x = Math.trunc(Math.random() * 4);

  switch (x) {
    case 0:
      return "NOT_STARTED";
    case 1:
      return "IN_PROGRESS";
    case 2:
      return "PAUSED";
    default:
      return "DONE";
  }
}

export function sequenceIcons(sequence: Sequence): SequenceIcon[] {
  switch (sequence.state) {
    case "NOT_STARTED":
      return ["not_started"];

    case "IN_PROGRESS":
      switch (getActivePhase(sequence)?.type) {
        case "RESPONSE_SUBMISSION":
          return ["edit"];

        case "EVALUATION":
          return ["forum"];

        case "READ":
          return doneSequenceIcon(sequence);

        default:
          return [];
      }

    case "PAUSED":
      return ["pause"];

    case "DONE":
      return doneSequenceIcon(sequence);
  }
}

function doneSequenceIcon(sequence: Sequence): SequenceIcon[] {
  return sequence.resultsArePublished ? ["bar_chart"] : ["lock"];
}
