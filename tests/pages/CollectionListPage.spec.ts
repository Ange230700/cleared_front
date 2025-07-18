// tests\pages\CollectionListPage.spec.ts

import { mount } from "@vue/test-utils";
import CollectionListPage from "../../src/pages/CollectionListPage.vue";
import { createTestingPinia } from "@pinia/testing";
import { registerGlobalPlugins } from "../setupTest";

const fakeCollections = [
  {
    collection_id: 1,
    collection_date: "2024-07-15",
    collection_place: "Paris",
    volunteers: [
      {
        volunteer_id: 1,
        volunteer_name: "Ange",
        volunteer_email: "ange@example.com",
        role: "admin",
      },
    ],
    garbages: [{ garbage_type: "Plastic", quantity_kg: 12.3 }],
  },
];

describe("CollectionListPage", () => {
  it("renders collections in the table", async () => {
    const wrapper = mount(CollectionListPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              collection: {
                collections: fakeCollections,
                loading: false,
                error: null,
              },
              user: {
                user: { role: "admin" }, // <-- Provide user with 'admin' role if needed
              },
            },
          }),
          { install: registerGlobalPlugins }, // <--- THIS IS IMPORTANT!
        ],
      },
    });

    expect(wrapper.text()).toContain("Collections");
    expect(wrapper.text()).toContain("Paris");
    expect(wrapper.text()).toContain("Ange");
    expect(wrapper.text()).toContain("Plastic: 12.3kg");
  });
});
