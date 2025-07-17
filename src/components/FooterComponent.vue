<!-- src\components\FooterComponent.vue -->

<template>
  <footer class="bg-surface-50 py-4 dark:bg-surface-950">
    <div class="container mx-auto text-center">
      <p>&copy; {{ currentYear }} V∅ID. All rights reserved.</p>
      <p>
        See the GitHub repositories:
        <a
          href="https://github.com/Ange230700/cleared_front"
          target="_blank"
          class="underline"
        >
          https://github.com/Ange230700/cleared_front</a
        >
        for the frontend and
        <a
          href="https://github.com/Ange230700/cleared_back"
          target="_blank"
          class="underline"
        >
          https://github.com/Ange230700/cleared_back</a
        >
        for the backend.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
