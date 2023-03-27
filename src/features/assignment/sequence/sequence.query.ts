import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery } from "@tanstack/vue-query";
import { fetchSequenceDetail, fetchSequenceList } from "src/features/assignment/sequence/sequence.service";

export const sequenceKeys = createQueryKeys("Sequence", {
  list: (assignmentId: number) => ({
    queryKey: [assignmentId],
    queryFn: () => fetchSequenceList(assignmentId),
  }),
  detail: (assignmentId: number, sequenceIndex: number) => ({
    queryKey: [assignmentId, sequenceIndex],
    queryFn: () => fetchSequenceDetail(assignmentId, sequenceIndex),
  })
})

export function useSequenceList(assignmentId: number) {
  return useQuery(sequenceKeys.list(assignmentId))
}

export function useSequenceDetail(assignmentId: number, sequenceId: number) {
  return useQuery(sequenceKeys.detail(assignmentId, sequenceId))
}
