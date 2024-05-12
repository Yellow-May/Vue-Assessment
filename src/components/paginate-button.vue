<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
defineProps<{
    id: string;
    disabled?: boolean;
    active?: boolean;
}>()

</script>

<template>
    <button type="button" :title="id" :disabled="disabled" @click="$emit('change', +id)"
        :class="twMerge('h-8 w-8 min-w-8 md:h-10 md:w-10 md:min-w-10 bg-orange-50 text-gray-800 rounded-full font-medium flex items-center justify-center text-xs md:text-sm disabled:bg-gray-200', active ? 'bg-orange-600 text-white' : '')">
        <slot />
    </button>
</template>