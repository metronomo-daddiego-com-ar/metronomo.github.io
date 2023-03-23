<script setup>
import Songs from '../components/Songs.vue';
import { useStore } from "../stores/store.js"

const store = useStore()
store.currentTitle = 'Canciones'
</script>
<template>
  <Songs/>
</template>