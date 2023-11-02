<script setup lang="ts">
const paths = ['laodGeojson']
</script>

<template>
  <div v-for="path in paths" :key="path">
    <router-link :to="path">{{ path }}</router-link>
  </div>
</template>
