import {
  Assignment,
  ServerAssignment,
  ServerGetMyAssignment,
} from "src/features/assignment/assignment.interface";
import { api } from "boot/axios";
import { validateData } from "src/util/data";

export async function fetchMyAssignments(): Promise<Assignment[]> {
  const response = await api.get("/learner/assignments");

  const decoded = ServerGetMyAssignment.decode(response.data);
  const validated = validateData(decoded);

  return validated.map((assignment: ServerAssignment) => ({
    ...assignment,
    lastUpdated: new Date(assignment.lastUpdated),
  }));
}
