import {
  AssignmentContent,
  AssignmentSummary,
} from "src/models/assignment.interface";
import { faker } from "@faker-js/faker/locale/fr";
import { Sequence, Statement } from "src/models/sequence.interface";

export async function fetchMyAssignments(): Promise<AssignmentSummary[]> {
  return mockMyAssignments().map((serverAssignmentSummary) => ({
    ...serverAssignmentSummary,
    lastUpdate: new Date(serverAssignmentSummary.lastUpdate),
  }));
}

export async function fetchAssignmentSummary(
  assignmentId: number
): Promise<AssignmentSummary> {
  return mockAssignmentSummary(assignmentId);
}

export async function fetchAssignmentContent(
  assignmentId: number
): Promise<AssignmentContent> {
  const nbSequences = faker.datatype.number(8);

  return {
    sequences: [...Array(nbSequences).keys()].map(() => mockSequence()),
  };
}

function mockMyAssignments(): AssignmentSummary[] {
  const nbAssignments = faker.datatype.number({ min: 3, max: 10 });
  return [...Array(nbAssignments).keys()].map(mockAssignmentSummary);
}

const mockAssignmentSummary: (id: number) => AssignmentSummary = (id) => ({
  id,
  lastUpdate: faker.date.between(
    "2020-01-01T00:00:00.000Z",
    "2030-01-01T00:00:00.000Z"
  ),
  title: faker.lorem.words(),
  nbSequence: faker.datatype.number(8),
});

const mockSequence: () => Sequence = () => ({
  id: faker.datatype.number(),
  statement: mockStatement(),
  activeInteractionIndex: Math.trunc(Math.random() * 3),
  phases: [], // TODO ***
  resultsArePublished: false,
  state: "IN_PROGRESS", // TODO ***
});

const mockStatement: () => Statement = () => ({
  title: faker.lorem.words(),
  content: faker.lorem.text(),
});
