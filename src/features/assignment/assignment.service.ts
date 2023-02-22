import {
  AssignmentSummary,
  TServerAssignment,
  ServerAssignmentSummary,
  ServerGetMyAssignment,
  Assignment,
} from "src/features/assignment/assignment.interface";
import { faker } from "@faker-js/faker/locale/fr";
import { Sequence } from "src/features/assignment/sequence/sequence.interface";
import { Phase } from "src/features/assignment/sequence/phase/phase.interface";
import { api } from "boot/axios";
import { Statement } from "src/features/assignment/sequence/statement.interface";
import { validateData } from "src/util/data";

export async function fetchMyAssignments(): Promise<AssignmentSummary[]> {
  const response = await api.get("/learner/assignments");

  const decoded = ServerGetMyAssignment.decode(response.data);
  const validated = validateData(decoded)

  return validated.map((assignment: ServerAssignmentSummary) => ({
    ...assignment,
    lastUpdated: new Date(assignment.lastUpdated),
  }));
}

export async function fetchAssignment(
  assignmentId: number
): Promise<Assignment> {
  const response = await api.get(`/learner/assignments/${assignmentId}`);

  const decoded = TServerAssignment.decode(response.data);
  const validated = validateData(decoded)

  // TODO parse Date in a more elegant way
  return {
    ...validated,
    lastUpdated: new Date(validated.lastUpdated),
  };
}

function mockMyAssignments(): AssignmentSummary[] {
  const nbAssignments = faker.datatype.number({ min: 3, max: 10 });
  return [...Array(nbAssignments).keys()]
    .map(faker.datatype.number)
    .map(mockAssignment);
}

const mockAssignment: (id: number) => Assignment = (id) => ({
  id,
  title: faker.lorem.words(),
  lastUpdated: faker.date.between(
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
  state: "beforeStart", // TODO *** pickRandomState(),
});

const mockStatement: () => Statement = () => ({
  title: faker.lorem.words(),
  content: faker.lorem.text(),
});

// TODO Randomize phase state
const mockPhases: () => Phase[] = () => [
  { type: "RESPONSE", state: "CLOSED" },
  { type: "EVALUATION", state: "CLOSED" },
  { type: "READ", state: "CLOSED" },
];
