<script setup>
import Metronome from '../components/Metronome.vue';
import { useStore } from "../stores/store.js"

const store = useStore()
store.currentTitle = 'Metrónomo'
</script>
<template>
  <Metronome />
</template>