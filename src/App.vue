<script setup>
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
</script>

<template>
    <router-view />
    <vue-query-devtools />
</template>