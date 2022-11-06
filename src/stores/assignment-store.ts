import { defineStore } from 'pinia';
import { Assignment } from 'src/models/assignment.interface';
import axios from 'axios';

interface AssignmentStoreState {
  metadata: {
    loading: boolean;
    error: null | Error;
  };

  myAssignmentList: Assignment[]; // TODO Use a Map
}

export const useAssignmentStore = defineStore('assignment', {
  state: (): AssignmentStoreState => ({
    metadata: {
      loading: false,
      error: null,
    },
    myAssignmentList: [],
  }),
  getters: {
    get: (state) => {
      return (assignmentId: number) =>
        state.myAssignmentList.find(
          (assignment: Assignment) => assignment.id === assignmentId
        );
    },
  },
  actions: {
    async loadData() {
      this.metadata.loading = true;
      this.metadata.error = null;

      try {
        const response = await axios.post(
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

        this.myAssignmentList = response.data.map((data: any) => {
          return {
            ...data,
            sequences: [],
            lastUpdate: new Date(data.lastUpdate),
          };
        });
      } catch (e: unknown) {
        // TODO Handle error
        this.metadata.error = Error(e?.toString());
      } finally {
        this.metadata.loading = false;
      }
    },
  },
});
