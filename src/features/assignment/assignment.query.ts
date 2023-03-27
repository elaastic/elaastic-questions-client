import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  fetchMyAssignments,
} from "src/features/assignment/assignment.service";
import { useQuery } from "@tanstack/vue-query";

export const assignmentKeys = createQueryKeys("Assignment", {
  myList: {
    queryKey: null,
    queryFn: fetchMyAssignments,
  },
});

export function useMyAssignments() {
  return useQuery(assignmentKeys.myList);
}

export function useAssignment(assignmentId: number) {
  return useQuery({
    ...assignmentKeys.myList,
    select: (myAssignments) => myAssignments.find(
      (assignment) => assignment.id === assignmentId
    )
  });
}
