import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { describe, expect, it, Mock, vi } from "vitest";
import { mount } from "@vue/test-utils";
import AssignmentSummary from "src/features/assignment/AssignmentSummary.vue";
import { useSequenceList } from "src/features/assignment/sequence/sequence.query";
import { ref } from "vue";
import { AssignmentTestService } from "src/features/assignment/assignment.testService";
import PageTitle from "src/features/app/PageTitle.vue";
import SequenceSummary from "src/features/assignment/sequence/SequenceSummary.vue";

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
      ...mockI18n(),
    });

    const errorPanel = wrapper.find("div.q-banner[role='alert']");
    expect(errorPanel.exists()).toBeTruthy();
    expect(errorPanel.text()).toContain(serverErrorMsg);
  });

  it("should displays a loading message while loading asynchronously the assignment sequences", () => {
    (useSequenceList as Mock).mockImplementation(() => ({
      status: ref("loading"),
    }));

    const wrapper = mount(AssignmentSummary, {
      props: {
        assignment: AssignmentTestService.giveMeAnAssignment(),
      },
      ...mockI18n(),
    });

    const loadingPanel = wrapper.find(".q-inner-loading");
    expect(loadingPanel.exists()).toBeTruthy();
    expect(loadingPanel.text()).toContain("assignment.loading");
  });

  it("should display the assignment title and its sequences when ready", () => {
    (useSequenceList as Mock).mockImplementation(() => ({
      status: ref("success"),
      data: ref(AssignmentTestService.giveMeSomeSequences(3)),
    }));

    const assignment = AssignmentTestService.giveMeAnAssignment();
    const wrapper = mount(AssignmentSummary, {
      props: {
        assignment: assignment,
      },
      ...mockI18n(),
    });

    expect(wrapper.findComponent(PageTitle).exists()).toBeTruthy();
    expect(wrapper.findComponent(PageTitle).props()["title"]).toEqual(
      assignment.title
    );
    expect(wrapper.findAllComponents(SequenceSummary).length).toBe(3);
  });

  function mockI18n() {
    return {
      global: {
        mocks: { "$tc": (msg: string) => msg },
      },
    };
  }
});
