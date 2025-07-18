<!-- README.md -->

# Vacuum

A beautiful, responsive web application for managing and tracking environmental cleanup events, built with **Vue 3**, **TypeScript**, and **PrimeVue**. **Vacuum** allows volunteers, organizers, and admins to register, sign in, join or coordinate cleanup events, and monitor collective impact on waste collection. The project prioritizes usability, accessibility, and a delightful user experience.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

---

## Table of Contents

<!-- * [Demo](#demo) -->
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Running the Project](#running-the-project)
* [Project Structure](#project-structure)
* [Features](#features)
* [Testing](#testing)
* [Environment Variables](#environment-variables)
<!-- * [License](#license) -->

<!-- ---

## Demo

Live demo coming soon. To test locally, see below. -->

---

## Tech Stack

**Frontend:**

* [Vue 3](https://vuejs.org/) with `<script setup>` SFCs
* [TypeScript](https://www.typescriptlang.org/)
* [PrimeVue](https://www.primefaces.org/primevue/) (UI kit)
* [Pinia](https://pinia.vuejs.org/) (state management)
* [Vue Router](https://router.vuejs.org/)
* [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS)
* [PrimeUIX Themes](https://primeuix.com/)
* [Vite](https://vitejs.dev/) (development & build)
* [Axios](https://axios-http.com/) (API calls)

**Testing:**

* [Vitest](https://vitest.dev/) (unit/integration tests)
* [@vue/test-utils](https://test-utils.vuejs.org/)
* [@pinia/testing](https://pinia.vuejs.org/cookbook/testing.html)

---

## Getting Started

### Prerequisites

* Node.js (>=20.x)
* [Backend API](https://github.com/Ange230700/cleared_back) running locally or remotely (see backend README)

### Installation

```bash
git clone https://github.com/Ange230700/cleared_front.git
cd cleared_front
npm install
```

---

## Running the Project

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

---

## Project Structure

```
├── src
│   ├── components      # Shared and page-level UI components (PrimeVue)
│   ├── pages           # Application pages/views (CollectionListPage, etc.)
│   ├── stores          # Pinia stores (user, collection, etc.)
│   ├── composables     # Custom Vue composables (hooks)
│   ├── router          # Route definitions & guards
│   ├── styles.ts       # Custom theme definitions
│   ├── types           # TypeScript types/interfaces
│   ├── App.vue         # Root component
│   └── main.ts         # App entry point
├── tests
│   ├── components      # Component tests
│   ├── pages           # Page tests
│   └── setupTest.ts    # Global test setup/plugins
├── public
│   └── ...
├── package.json
└── ...
```

---

## Features

* **Authentication:** Register, login, and logout with JWT-based sessions. Role-based UI (admin/volunteer).
* **Dashboard:** Overview of all collection events and statistics.
* **Collections Management:**

  * View upcoming and past cleanup events
  * Add, edit, or delete collections (admin only)
  * Assign or view participating volunteers
  * Track garbage types and quantities collected per event
* **Volunteer Directory:** List, add, or update volunteer information (admin only)
* **Responsive Design:** Mobile-friendly layout, accessible controls, and dark mode support
* **Instant Feedback:** Toast notifications for all actions and errors
* **Theming:** Customizable look and feel with Tailwind & PrimeUIX

---

## Testing

Run the complete test suite:

```bash
npm test
```

All core business logic, UI components, and store logic are covered with [Vitest](https://vitest.dev/).

---

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

```env
VITE_API_BASE_URL=http://localhost:3001
```

You can point to any valid backend instance.

<!-- ---

## License

MIT License -->

<!-- --- -->

<!-- If you want to add Contributing, Deployment, or Contact, let me know! -->

<!-- --- -->

- **Project Link:** [https://github.com/yourusername/cleared\_front](https://github.com/yourusername/cleared_front)
- **Backend API:** [https://github.com/Ange230700/cleared\_back](https://github.com/Ange230700/cleared_back)
- **API docs:** [https://cleared-back.onrender.com/api/docs/](https://cleared-back.onrender.com/api/docs/)
