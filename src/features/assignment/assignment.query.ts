import { createQueryKeys } from "@lukemorales/query-key-factory";
import { fetchAssignment, fetchMyAssignments } from "src/services/assignment-service";
import { useQuery } from "@tanstack/vue-query";
import { defaultOptions } from "src/config/queries";

export const assignmentKeys = createQueryKeys("Assignment", {
  myList: {
    queryKey: null,
    queryFn: fetchMyAssignments
  },
  detail: (assignmentId: number) => ({
    queryKey: [assignmentId],
    queryFn: () =>fetchAssignment(assignmentId)
  }),
});

export function useMyAssignments() {
  return useQuery({
    ...assignmentKeys.myList,
    ...defaultOptions
  })
}

export function useAssignmentDetail(assignmentId: number) {
  return useQuery({
    ...assignmentKeys.detail(assignmentId),
    ...defaultOptions
  })
}


