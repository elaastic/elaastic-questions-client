import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { assignmentKeys } from "src/services/assignment.query";

export const queries = mergeQueryKeys(assignmentKeys)

export const defaultOptions = {
  staleTime: 1000 * 60 * 5, // 5 min
}
