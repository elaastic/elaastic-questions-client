import { RouteRecordRaw } from "vue-router";
import { parseIntFromUrlParam } from "src/util/url";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/MyAssignmentListPage.vue"),
        meta: {
          home: true,
          titleKey: "assignment.myList",
        },
      },
      {
        path: "assignment/:assignmentId/summary",
        alias: "assignment/:assignmentId",
        name: "assignment-summary",
        component: () => import("pages/AssignmentSummaryPage.vue"),
        props: (route) => ({
          assignmentId: parseIntFromUrlParam(route.params.assignmentId),
        }),
        meta: {
          titleKey: "assignment.summary",
        },
      },
      {
        path: "assignment/:assignmentId/play",
        redirect: to => `/assignment/${to.params.assignmentId}/play/1`
      },
      {
        path: "assignment/:assignmentId/play/:sequenceIndex",
        name: "play-sequence",
        component: () => import("pages/SequencePlayPage.vue"),
        props: (route) => ({
          assignmentId: parseIntFromUrlParam(route.params.assignmentId),
          sequenceIndex: parseIntFromUrlParam(route.params.sequenceIndex),
        }),
        meta: {
          titleKey: "sequence.play",
        },
      },
      {
        path: "test/data",
        component: () => import("pages/TestDataPage.vue"),
        meta: {
          title: "Test Server API"
        }
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    name: "404",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
