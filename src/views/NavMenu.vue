<script setup>
import router from '../router/index.js'
const routes = router.getRoutes().filter(route => route.meta.isNav);
</script>
<template>
    <header class="container-flex button-group">
        <button v-for="route in routes"
        @click="router.push(route.path)"
        :class="router.currentRoute.value.path === route.path ? 'button-pressed' : ''">
            {{ route.name }}
        </button>
    </header>
</template>