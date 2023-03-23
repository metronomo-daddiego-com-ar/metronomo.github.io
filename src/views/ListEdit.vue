<script setup>
import ListEdit from '../components/ListEdit.vue';
import { useRoute } from 'vue-router'
import { useStore } from "../stores/store.js"

const store = useStore()
const listIndex = useRoute().params.index
store.currentTitle = "Editando " + store.lists[listIndex].name
</script>
<template>
    <ListEdit :list-index="listIndex"/>
</template>