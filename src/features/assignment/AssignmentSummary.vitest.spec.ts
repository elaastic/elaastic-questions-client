import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { describe, expect, it, Mock, vi } from "vitest";
import { mount } from "@vue/test-utils";
import AssignmentSummary from "src/features/assignment/AssignmentSummary.vue";
import { useSequenceList } from "src/features/assignment/sequence/sequence.query";
import { ref } from "vue";
import { AssignmentTestService } from "src/features/assignment/assignment.testService";

installQuasarPlugin();

describe("Component for displaying the summary of an assignment", () => {
  vi.mock("src/features/assignment/sequence/sequence.query", () => ({
    useSequenceList: vi.fn(),
  }));

  it("should displays an error message when an error occurs while loading asynchronously the assignment sequences", () => {
    const serverErrorMsg = "There is an error !";
    (useSequenceList as Mock).mockImplementation(() => ({
      status: ref("error"),
      error: ref(new Error(serverErrorMsg)),
    }));

    const wrapper = mount(AssignmentSummary, {
      props: {
        assignment: AssignmentTestService.giveMeAnAssignment(),
      },
      global: {
        mocks: { $tc: (msg: string) => msg },
      },
    });

    const errorPanel = wrapper.find("div.q-banner[role='alert']");
    expect(errorPanel.exists()).toBeTruthy();
    expect(errorPanel.text()).toContain(serverErrorMsg);
  });

  it("should displays a loading message while loading asynchronously the assignment sequences", () => {
    (useSequenceList as Mock).mockImplementation(() => ({
      status: ref("loading"),
    }));

    // TODO Factorize
    const wrapper = mount(AssignmentSummary, {
      props: {
        assignment: AssignmentTestService.giveMeAnAssignment(),
      },
      global: {
        mocks: { $tc: (msg: string) => msg },
      },
    });

    const loadingPanel = wrapper.find(".q-inner-loading");
    expect(loadingPanel.exists()).toBeTruthy();
    expect(loadingPanel.text()).toContain("assignment.loading")
  });

  it("should display the assignment title and its sequences when ready", () => {
    expect("TODO").toBeFalsy();
  })

  // TODO Should also check the title is displayed
});
