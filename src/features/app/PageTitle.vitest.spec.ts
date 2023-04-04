import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import PageTitle from "src/features/app/PageTitle.vue";

installQuasarPlugin();

describe("Page title", () => {
  const title = "Any page title";

  it("displays a simple title", () => {
    const wrapper = shallowMount(PageTitle, {
      props: { title },
    });
    expect(wrapper.find("h1").text()).toMatch(title);
    expect(wrapper.find("q-icon-stub").exists()).toBeFalsy();
  });

  it("displays a title with its icon", () => {
    const icon = "help"
    const wrapper = shallowMount(PageTitle, {
      props: { title, icon },
    });
    expect(wrapper.find("h1").text()).toMatch(title);
    expect(wrapper.find("q-icon-stub").attributes("name")).toMatch(icon);
  });
});
