<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'

defineProps<{
    is_loading: boolean
    heading: string
}>()
</script>

<template>
    <main class="flex-grow overflow-y-auto w-full md:flex md:gap-1 product-form">
        <div class="max-w-[758px] mx-auto w-full p-5 pb-7 md:pb-12 flex flex-col items-center gap-5">

            <div class="pb-1 border-b border-gray-400 w-full flex items-center justify-center gap-3">
                <button class="flex items-center leading-none" type="button" title="go back" @click="$router.back()">
                    <arrow-left :size="20" />
                </button>

                <h2 class="md:text-xl font-bold text-center ">{{ heading }}</h2>
            </div>

            <slot />
        </div>

        <div v-if="is_loading"
            class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-25">
            <div class="py-4 px-10 max-w-full rounded-lg bg-white flex flex-col gap-1 items-center justify-center">
                <span class="text-xl font-semibold">Submitting...</span>
                <span>Do not close this page!</span>
            </div>
        </div>
    </main>
</template>

<style>
.product-form form {
    @apply w-full md:w-auto;
}

.product-form form .group {
    @apply md:w-[420px] md:max-w-[420px];
}
</style>