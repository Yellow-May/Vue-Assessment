<script setup lang="ts">
import { useLookup } from '@/hooks';
import { ref } from 'vue';

const { update_category } = defineProps<{
    update_category: (id: number | null) => void
}>()

const category = ref<any>(undefined)

const { isLoading, data } = useLookup('categories')

function handle_change(id: number | null) {
    category.value = id
    update_category(id)
}
</script>

<template>
    <div>
        <div class="mb-2 border-b pb-2 border-white flex items-center justify-between">
            <span class="block leading-none text-sm md:text-base font-semibold">Filter by
                Categories</span>

            <button class="text-sm text-red-600 font-semibold p-0 leading-none"
                @click="handle_change(null)">Reset</button>
        </div>

        <div v-if="isLoading" class="text-xs">
            loading...
        </div>

        <template v-else-if="data?.data">
            <div class="flex flex-wrap gap-3">
                <div v-for="cat in data.data" :key="cat.id"
                    class="flex items-center gap-1 text-xs md:text-sm leading-none">
                    <input type="radio" name="category" :id="cat.id" :checked="category === cat.id"
                        @input="() => handle_change(cat.id)" class="accent-gray-800 md:h-4 md:w-4">
                    <label :for="cat.id">{{ cat.name }}</label>
                </div>
            </div>
        </template>
    </div>
</template>