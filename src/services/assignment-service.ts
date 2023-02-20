import { Assignment, AssignmentSummary } from "src/features/assignment/assignment.interface";
import { faker } from "@faker-js/faker/locale/fr";
import {
  pickRandomState,
  Sequence,
  Statement,
} from "src/features/assignment/sequence/sequence.interface";
import { Phase } from "src/models/phase";

export async function fetchMyAssignments(): Promise<AssignmentSummary[]> {
  return mockMyAssignments().map((serverAssignmentSummary) => ({
    ...serverAssignmentSummary,
    lastUpdate: new Date(serverAssignmentSummary.lastUpdate),
  }));
}

export async function fetchAssignment(
  assignmentId: number
): Promise<Assignment> {
  return mockAssignment(assignmentId);
}

function summarize(assignment: Assignment): AssignmentSummary {
  return {
    ...assignment,
    nbSequence: assignment.sequences.length,
  };
}

function mockMyAssignments(): AssignmentSummary[] {
  const nbAssignments = faker.datatype.number({ min: 3, max: 10 });
  return [...Array(nbAssignments).keys()]
    .map(faker.datatype.number)
    .map(mockAssignment)
    .map(summarize);
}

const mockAssignment: (id: number) => Assignment = (id) => ({
  id,
  title: faker.lorem.words(),
  lastUpdate: faker.date.between(
    "2020-01-01T00:00:00.000Z",
    "2030-01-01T00:00:00.000Z"
  ),
  sequences: [...Array(faker.datatype.number({ min: 3, max: 15 }))].map(
    mockSequence
  ),
});

const mockSequence: () => Sequence = () => ({
  id: faker.datatype.number(),
  statement: mockStatement(),
  activeInteractionIndex: Math.trunc(Math.random() * 3),
  phases: mockPhases(),
  resultsArePublished: false,
  state: pickRandomState(),
});

const mockStatement: () => Statement = () => ({
  title: faker.lorem.words(),
  content: faker.lorem.text(),
});

// TODO Randomize phase state
const mockPhases: () => Phase[] = () => ([
  {type: "RESPONSE_SUBMISSION", state: "CLOSED" },
  {type: "EVALUATION", state: "CLOSED" },
  {type: "READ", state: "CLOSED" },
])
