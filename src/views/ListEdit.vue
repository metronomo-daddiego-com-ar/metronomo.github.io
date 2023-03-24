<script setup>
import ListEdit from '../components/ListEdit.vue';
import { useRoute } from 'vue-router'
const listIndex = useRoute().params.index
</script>
<template>
    <ListEdit :list-index="listIndex"/>
</template>