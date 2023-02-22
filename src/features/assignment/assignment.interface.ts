import { TServerSequence } from "src/features/assignment/sequence/sequence.interface";
import * as t from "io-ts";

export const TServerAssignmentSummary = t.type({
  id: t.number,
  title: t.string,
  lastUpdated: t.string,
});

export type ServerAssignmentSummary = t.TypeOf<typeof TServerAssignmentSummary>;
export type AssignmentSummary = Omit<ServerAssignmentSummary, "lastUpdated"> & {
  lastUpdated: Date;
};

export const TServerAssignment = t.intersection([
  TServerAssignmentSummary,
  t.type({
    sequences: t.array(TServerSequence),
  }),
]);

export type ServerAssignment = t.TypeOf<typeof TServerAssignment>;
export type Assignment = Omit<ServerAssignment, "lastUpdated"> & {
  lastUpdated: Date;
};

export const ServerGetMyAssignment = t.array(TServerAssignmentSummary);
