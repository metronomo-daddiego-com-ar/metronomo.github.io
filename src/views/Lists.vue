<script setup>
import Lists from '../components/Lists.vue'
import { useStore } from "../stores/store.js"

const store = useStore()
store.currentTitle = 'Listas'
</script>
<template>
  <Lists/>
</template>