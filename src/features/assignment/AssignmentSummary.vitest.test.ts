import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import AssignmentSummary from "./AssignmentSummary.vue";

installQuasarPlugin();

describe("Assignment Summary component", () => {
  it("should displays a warning message for empty assignment", () => {
    const wrapper = mount(AssignmentSummary, {
      props: {
        assignment: {
          id: 0,
          lastUpdated: new Date(),
          title: "Test assignment",
          sequences: [],
        },
      },
    });

    expect(wrapper.text()).toContain(
      "There is no sequence in this assignment."
    );
  });
});
