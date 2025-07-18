// tests/components/PrimeNavbar.spec.ts

import { vi } from "vitest";
import { mount } from "@vue/test-utils";
import type { MountingOptions } from "@vue/test-utils";
import PrimeNavbar from "../../src/components/PrimeNavbar.vue";
import { createTestingPinia } from "@pinia/testing";
import { createRouter, createWebHistory } from "vue-router";
import { registerGlobalPlugins } from "../setupTest";

describe("PrimeNavbar", () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function mountNavbar(options: MountingOptions<any> = {}) {
    return mount(PrimeNavbar, {
      ...options,
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: { user: { user: null } },
          }),
          router,
          { install: registerGlobalPlugins },
        ],
        ...(options.global || {}),
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  }

  it("renders Vacuum title button", () => {
    const wrapper = mountNavbar();
    expect(wrapper.text()).toContain("Vacuum");
  });

  it("shows Sign in when not logged in", () => {
    const wrapper = mountNavbar();
    expect(wrapper.text()).toContain("Sign in");
    expect(wrapper.text()).toContain("Sign up");
  });

  it("shows logout when logged in", () => {
    const wrapper = mountNavbar({
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: { user: { user: { name: "Ange" } } },
          }),
          router,
          { install: registerGlobalPlugins },
        ],
      },
    });
    expect(wrapper.text()).toContain("Logout");
  });
});
