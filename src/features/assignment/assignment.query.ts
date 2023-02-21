import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  fetchAssignment,
  fetchMyAssignments,
} from "src/features/assignment/assignment.service";
import { useQuery } from "@tanstack/vue-query";

export const assignmentKeys = createQueryKeys("Assignment", {
  myList: {
    queryKey: null,
    queryFn: fetchMyAssignments,
  },
  detail: (assignmentId: number) => ({
    queryKey: [assignmentId],
    queryFn: () => fetchAssignment(assignmentId),
  }),
});

export function useMyAssignments() {
  return useQuery(assignmentKeys.myList);
}

export function useAssignmentDetail(assignmentId: number) {
  return useQuery(assignmentKeys.detail(assignmentId));
}
