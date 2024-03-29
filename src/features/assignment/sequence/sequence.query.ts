import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery } from "@tanstack/vue-query";
import { fetchSequenceList } from "src/features/assignment/sequence/sequence.service";

export const sequenceKeys = createQueryKeys("Sequence", {
  assignment: (assignmentId: number) => ({
    queryKey: [assignmentId, "sequences"],
    queryFn: () => fetchSequenceList(assignmentId),
  }),
});

export function useSequenceList(assignmentId: number) {
  return useQuery(sequenceKeys.assignment(assignmentId));
}

/**
 *
 * @param assignmentId
 * @param sequenceIndex (note : index starts from one)
 */
export function useSequence(assignmentId: number, sequenceIndex: number) {
  return useQuery({
    ...sequenceKeys.assignment(assignmentId),
    select: (sequences) => {
      if (sequences.length < sequenceIndex) {
        throw new Error(
          `There is no sequence for index "${sequenceIndex}" in assignment "${assignmentId}"`
        );
      }

      return sequences[sequenceIndex - 1];
    },
  });
}
