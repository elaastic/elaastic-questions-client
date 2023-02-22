import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery } from "@tanstack/vue-query";
import { fetchSequenceDetail } from "src/features/assignment/sequence/sequence.service";

// TODO Merge sequenceKeys with assignmentKeys
export const sequenceKeys = createQueryKeys("Sequence", {
  detail: (assignmentId: number, sequenceIndex: number) => ({
    queryKey: [sequenceIndex],
    queryFn: () => fetchSequenceDetail(assignmentId, sequenceIndex),
  })
})

export function useSequenceDetail(assignmentId: number, sequenceId: number) {
  return useQuery(sequenceKeys.detail(assignmentId, sequenceId))
}
