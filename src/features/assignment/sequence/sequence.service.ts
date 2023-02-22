import {
  ClientSequenceState,
  convertSequenceState,
  Sequence,
  SequenceIcon,
  TServerSequence
} from "src/features/assignment/sequence/sequence.interface";
import { Phase } from "src/features/assignment/sequence/phase/phase.interface";
import { api } from "boot/axios";
import { isLeft } from "fp-ts/Either";
import { PathReporter } from "io-ts/PathReporter";

export async function fetchSequenceDetail(
  assignmentId: number,
  sequenceIndex: number
): Promise<Sequence> {
  const response = await api.get(
    `/learner/assignment/${assignmentId}/sequences/${sequenceIndex}`
  );

  const decoded = TServerSequence.decode(response.data);

  // TODO Should be factorized
  if(isLeft(decoded)) {
    throw Error(
      `Could not validate data: ${PathReporter.report(decoded).join("\n")}`
    );
  }

  return decoded.right
}

export function getActivePhase(sequence: Sequence): Phase | null {
  return sequence.activeInteractionIndex
    ? sequence.phases[sequence.activeInteractionIndex - 1]
    : null;
}

export function pickRandomState(): ClientSequenceState {
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
  switch (convertSequenceState(sequence.state)) {
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

function doneSequenceIcon(sequence: Sequence): SequenceIcon[] {
  return sequence.resultsArePublished ? ["bar_chart"] : ["lock"];
}
