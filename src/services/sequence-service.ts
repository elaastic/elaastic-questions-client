import { Phase } from "src/models/phase";
import { Sequence } from "src/features/assignment/sequence/sequence.interface";

export function getActivePhase(sequence: Sequence): Phase | null {
  return sequence.activeInteractionIndex !== undefined
    ? sequence.phases[sequence.activeInteractionIndex]
    : null;
}
