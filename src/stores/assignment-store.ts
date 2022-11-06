import { defineStore } from 'pinia';
import { Assignment } from 'src/models/assignment.interface';
import axios from 'axios';

interface AssignmentStoreState {
  metadata: {
    loading: boolean;
    error: null | Error;
  };

  myAssignmentMap: Map<number, Assignment>;
}

export const useAssignmentStore = defineStore('assignment', {
  state: (): AssignmentStoreState => ({
    metadata: {
      loading: false,
      error: null,
    },
    myAssignmentMap: new Map<number, Assignment>(),
  }),
  getters: {
    getAll: (state) => {
      return state.myAssignmentMap.values();
    },
    get: (state) => {
      return (assignmentId: number) => state.myAssignmentMap.get(assignmentId);
    },
  },
  actions: {
    async loadData() {
      this.metadata.loading = true;
      this.metadata.error = null;

      try {
        const response = await axios.post<FakedAssignmentData[]>(
          'http://schematic-ipsum.herokuapp.com',
          {
            type: 'object',
            properties: {
              id: { type: 'integer', ipsum: 'id' },
              title: { type: 'string', ipsum: 'title' },
              lastUpdate: { type: 'string', format: 'date-time' },
            },
          },
          {
            params: { n: 15 },
          }
        );

        this.myAssignmentMap = response.data.reduce(
          (acc: Map<number, Assignment>, data: FakedAssignmentData) => {
            acc.set(data.id, {
              ...data,
              sequences: 'NotLoadedYet',
              lastUpdate: new Date(data.lastUpdate),
            });
            return acc;
          },
          new Map()
        );

        console.info(this.myAssignmentMap);
      } catch (e: unknown) {
        // TODO Handle error
        this.metadata.error = Error(e?.toString());
      } finally {
        this.metadata.loading = false;
      }
    },
  },
});

interface FakedAssignmentData {
  id: number;
  title: string;
  lastUpdate: string;
}
