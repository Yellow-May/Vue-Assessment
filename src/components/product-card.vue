<script setup lang="ts">
import { Product } from '@/types';

defineProps<{
    product: Product
}>()
</script>

<template>
    <router-link :to="{ name: 'products.show', params: { id: product.id } }"
        class="shadow-xl w-11/12 max-w-full md:w-[240px] h-[280px] bg-gray-50 rounded-lg overflow-hidden flex flex-col">
        <!-- image area -->
        <div class="h-[160px] bg-gray-200 bg-center bg-cover bg-no-repeat"
            :style="{ backgroundImage: `url(${product.image})` }" />

        <div class="p-3 text-sm flex flex-col justify-between flex-grow">
            <div class="flex flex-col gap-1">
                <!-- product name -->
                <span class="truncate block font-bold text-base">
                    {{ product.name }}
                </span>

                <!-- product category -->
                <span class="text-sm">
                    {{ product.category.name }}
                </span>
            </div>

            <div class="flex justify-between items-center">
                <span v-if="product.quantity > 0" class="text-green-600">In Stock</span>
                <span v-else class="text-red-500">Out of Stock</span>
                <span class="font-medium">{{ '$' + product.price.toLocaleString() }}</span>
            </div>
        </div>
    </router-link>
</template>