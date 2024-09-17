<template>
  <NuxtLayout>
    <v-app>
      <Header />
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>
<script setup>
import Header from '~/components/Header.vue';  // Import the header component
</script>