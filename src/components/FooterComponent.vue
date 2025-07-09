<!-- src\components\FooterComponent.vue -->

<template>
  <footer class="bg-surface-50 py-4 dark:bg-surface-950">
    <div class="container mx-auto text-center">
      <p>&copy; {{ currentYear }} Vacuum. Tous droits réservés.</p>
      <p>
        Voir les dépôts GitHub :
        <a
          href="https://github.com/Ange230700/cleared_front"
          target="_blank"
          class="underline"
        >
          https://github.com/Ange230700/cleared_front</a
        >
        pour le front-end et
        <a
          href="https://github.com/Ange230700/cleared_back"
          target="_blank"
          class="underline"
        >
          https://github.com/Ange230700/cleared_back</a
        >
        pour le back-end.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped>
/* Vous pouvez ajouter ici des styles supplémentaires si besoin */
</style>
