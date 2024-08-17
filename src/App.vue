<template>
  <NavBar />

  <!-- <RouterLink to="/">Notes</RouterLink>
  <RouterLink to="/stats">Stats</RouterLink> -->

  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup>

// Imports

  import NavBar from '@/components/layout/NavBar.vue'


</script>

<style>
@import 'bulma/css/bulma.min.css';


</style>

