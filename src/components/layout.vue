<script setup lang="ts">
import userSection from './user-section.vue';
</script>

<template>
    <div class="h-full flex flex-col gap-0.5">
        <header class="w-full h-14 min-h-14 md:h-20 md:min-h-20 bg-orange-200 border-b">
            <div class="h-full px-2.5 md:px-5 max-w-[1680px] mx-auto flex justify-between items-center">
                <router-link :to="{ name: 'home' }" class="text-base md:text-2xl font-bold">HZC
                    Technologies</router-link>

                <user-section />
            </div>
        </header>

        <router-view />
    </div>
</template>