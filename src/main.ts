// src\main.ts

import "primeicons/primeicons.css";
import { createApp } from 'vue'
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import Ripple from "primevue/ripple";
import Aura from "@primeuix/themes/aura";

import ToastService from "primevue/toastservice";

import Toast from "primevue/toast";
import Button from "primevue/button";
import { Form, FormField } from "@primevue/forms";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Password from "primevue/password";
import Textarea from "primevue/textarea";
import Menubar from "primevue/menubar";
import Badge from "primevue/badge";
import Avatar from "primevue/avatar";
import Chip from "primevue/chip";
import Checkbox from "primevue/checkbox";
import ProgressSpinner from "primevue/progressspinner";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import App from '~/src/App.vue'
import router from "~/src/router";

import axios from "axios";
import "~/src/axios-interceptor";

axios.defaults.baseURL = "/";
axios.defaults.withCredentials = true;

async function bootstrap() {
    const app = createApp(App);
    const pinia = createPinia();
    app.use(PrimeVue, {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: "system",
        },
      },
    });
    app.directive("ripple", Ripple);
  
    app.use(ToastService);
  
    app.component("PrimeToast", Toast);
    app.component("PrimeButton", Button);
    app.component("PrimeForm", Form);
    app.component("PrimeFormField", FormField);
    app.component("PrimeInputText", InputText);
    app.component("PrimeMessage", Message);
    app.component("PrimePassword", Password);
    app.component("PrimeTextarea", Textarea);
    app.component("PrimeMenubar", Menubar);
    app.component("PrimeBadge", Badge);
    app.component("PrimeAvatar", Avatar);
    app.component("PrimeChip", Chip);
    app.component("PrimeCheckbox", Checkbox);
    app.component("PrimeProgressSpinner", ProgressSpinner);
    app.component("PrimeDialog", Dialog);
    app.component("PrimeDataTable", DataTable);
    app.component("PrimeColumn", Column);
  
    // app.component("PrimeNavbar", PrimeNavbar);
    // app.component("FooterComponent", FooterComponent);
  
    app.use(pinia);
    app.use(router);
    app.mount("#app");
  }
  
  bootstrap();
  
