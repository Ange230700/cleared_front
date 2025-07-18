// tests/setupTest.ts

import { vi } from "vitest";

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Ripple from "primevue/ripple";

import Toast from "primevue/toast";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import Badge from "primevue/badge";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerGlobalPlugins(app: any) {
  app.use(PrimeVue);
  app.use(ToastService);
  app.directive("ripple", Ripple);

  app.component("PrimeToast", Toast);
  app.component("PrimeButton", Button);
  app.component("PrimeMenubar", Menubar);
  app.component("PrimeBadge", Badge);
  app.component("PrimeDataTable", DataTable);
  app.component("PrimeColumn", Column);
}
