import { defineStore } from 'pinia';
import { Assignment, Sequence } from 'src/models/assignment.interface';
import axios from 'axios';

interface AssignmentStoreState {
  metadata: {
    initialized: boolean;
    loading: boolean;
    error: null | Error;
  };

  myAssignmentMap: Map<number, Assignment>;
}

export const useAssignmentStore = defineStore('assignment', {
  state: (): AssignmentStoreState => ({
    metadata: {
      initialized: false,
      loading: false,
      error: null,
    },
    myAssignmentMap: new Map<number, Assignment>(),
  }),
  getters: {
    getAll: (state) => {
      return Array.from(state.myAssignmentMap.values());
    },
    get: (state) => {
      return (assignmentId: number) => state.myAssignmentMap.get(assignmentId);
    },
  },
  actions: {
    async loadMyAssignments() {
      this.metadata.loading = true;
      this.metadata.error = null;

      try {
        const response = await axios.post<FakedAssignmentData[]>(
          'http://schematic-ipsum.herokuapp.com',
          {
            type: 'object',
            properties: {
              title: { type: 'string', ipsum: 'title' },
              lastUpdate: { type: 'string', format: 'date-time' },
            },
          },
          {
            params: { n: 15 },
          }
        );

        this.myAssignmentMap = response.data.reduce(
          (
            acc: Map<number, Assignment>,
            data: FakedAssignmentData,
            index: number
          ) => {
            acc.set(index, {
              ...data,
              id: index,
              sequences: 'NotLoadedYet',
              lastUpdate: new Date(data.lastUpdate),
              nbSequence: Math.random() * (20 - 3) + 3,
            });
            return acc;
          },
          new Map()
        );
      } catch (e: unknown) {
        // TODO Handle error
        this.metadata.error = Error(e?.toString());
      } finally {
        this.metadata.loading = false;
        this.metadata.initialized = true;
      }
    },
    async loadSequences(assignmentId: number) {
      const assignment = this.myAssignmentMap.get(assignmentId);

      if (!assignment) {
        throw new Error(`The is no assignment for id='${assignmentId}'`);
      }

      const response = await axios.post<FakedSequenceData[]>(
        'http://schematic-ipsum.herokuapp.com',
        {
          type: 'object',
          properties: {
            id: { type: 'integer', ipsum: 'id' },
            title: { type: 'string', ipsum: 'title' },
            content: { type: 'string', format: 'paragraph' },
          },
        },
        {
          params: { n: assignment.nbSequence },
        }
      );

      assignment.sequences = response.data.reduce(
        (acc: Sequence[], sequenceData: FakedSequenceData) => {
          acc.push({
            id: sequenceData.id,
            statement: {
              title: sequenceData.title,
              content: sequenceData.content,
            },
          });
          return acc;
        },
        []
      );
    },
  },
});

interface FakedAssignmentData {
  title: string;
  lastUpdate: string;
}

interface FakedSequenceData {
  id: number;
  title: string;
  content: string;
}
