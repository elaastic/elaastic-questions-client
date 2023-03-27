import * as t from "io-ts";
import {
  SequenceIcon,
  TServerSequence,
  ClientSequence,
  convertSequence,
} from "src/features/assignment/sequence/sequence.interface";
import { Phase } from "src/features/assignment/sequence/phase/phase.interface";
import { api } from "boot/axios";
import { validateData } from "src/util/data";

// TODO Check if we need a SequenceSummary
export async function fetchSequenceList(
  assignmentId: number
): Promise<ClientSequence[]> {
  const response = await api.get(
    `/learner/assignment/${assignmentId}/sequences`
  );

  const decoded = t.array(TServerSequence).decode(response.data);
  return validateData(decoded).map(convertSequence);
}

export function getActivePhase(sequence: ClientSequence): Phase | null {
  return sequence.activeInteractionIndex
    ? sequence.phases[sequence.activeInteractionIndex - 1]
    : null;
}

export function sequenceIcons(sequence: ClientSequence): SequenceIcon[] {
  switch (sequence.state) {
    case "NOT_STARTED":
      return ["not_started"];

    case "IN_PROGRESS":
      switch (getActivePhase(sequence)?.type) {
        case "RESPONSE":
          return ["edit"];

        case "EVALUATION":
          return ["forum"];

        case "RESULT":
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

function doneSequenceIcon(sequence: ClientSequence): SequenceIcon[] {
  return sequence.resultsArePublished ? ["bar_chart"] : ["lock"];
}
