<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useFetch, useDebounce } from '@/hooks';
import { Plus } from 'lucide-vue-next';
import { PER_PAGE, query_keys } from '@/constants';
import ProductCard from '@/components/product-card.vue';
import Paginate from '@/components/paginate.vue';
import categoriesFilter from '@/components/categories-filter.vue';

const fetch = useFetch();

const page = ref(1);
const total_pages = ref(undefined);
const q = ref('');
const debounced_q = ref('');
const category = ref<any>(undefined);

function update_category(id: number | null) {
    category.value = id
}

useDebounce(q, (new_val) => {
    debounced_q.value = new_val;
    page.value = 1;
})

watch(category, () => {
    page.value = 1;
})

const { isLoading, isFetching, data } = useQuery({
    queryKey: [query_keys.PRODUCTS_DATA_KEY, PER_PAGE, page, debounced_q, category],
    queryFn: async () => {
        let params: any = {
            page: page.value,
            per_page: PER_PAGE,
        }

        // search param is not empty
        if (q.value) params = { ...params, q: debounced_q.value };

        // add category filter is selected
        if (category.value) params = { ...params, category: category.value }

        const res = await fetch.get('api/products', {
            params
        });

        return res.data
    },
    staleTime: Infinity // set staletime to Infinity to avoid refetching of data unless manually triggered
})

watch(data, (new_data) => {
    if (new_data) {
        total_pages.value = new_data.data.last_page
    }
})
</script>

<template>

    <main class="flex-grow overflow-y-auto w-full md:flex md:gap-1">
        <!-- Side Filter -->
        <aside class="md:w-[280px] md:min-w-[280px] bg-orange-200 px-5 py-3">
            <div class="mb-5">
                <input type="search" name="" id=""
                    class="w-full bg-white h-8 px-3 outline-orange-400 text-sm md:text-base" placeholder="Search..."
                    v-model="q">
            </div>

            <categories-filter :update_category="update_category" />
        </aside>

        <!-- Display Products -->
        <section class="overflow-y-auto flex-grow px-5 py-5">
            <div class="pb-10">
                <div class="mb-5 flex items-center justify-between">
                    <h2 class="md:text-xl font-semibold">Products:Management</h2>
                    <router-link :to="{ name: 'products.create' }"
                        class="bg-orange-500 text-white px-3 md:px-5 rounded h-8 md:h-10 leading-none text-xs md:text-sm flex items-center justify-center gap-1 md:gap-2">
                        <plus :size="18" />
                        <span class="leading-none">Add New</span>
                    </router-link>
                </div>

                <div v-if="isLoading || isFetching" class="min-h-[400px] md:min-h-[500px]">
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                        <div v-for="i in 4" :key="i" class="w-full md:w-[240px] p-3 border rounded shadow">
                            <div class="flex flex-col gap-3 items-center">
                                <v-skeleton type="avatar" />
                                <div class="w-full flex flex-col justify-start items-start">
                                    <v-skeleton type="text" width="200px" height="10px" />
                                    <v-skeleton type="text" width="70px" height="6px" />
                                </div>

                                <div class="flex justify-between items-center w-full">
                                    <v-skeleton type="text" width="40px" height="6px" />
                                    <v-skeleton type="text" width="40px" height="6px" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else-if="data?.data">
                    <div v-if="data.data.data.length > 0"
                        class="min-h-[400px] md:min-h-[500px] grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                        <div v-for="product in data.data.data" :key="product.id" class="flex justify-center">
                            <product-card :product="product" />
                        </div>
                    </div>
                    <div v-else>
                        <span class="text-sm md:text-base">No Product Records Found!</span>
                    </div>
                </div>

                <div v-if="total_pages && total_pages > PER_PAGE" class="py-10 flex justify-center">
                    <paginate :page="page" :per_page="PER_PAGE" :total_pages="total_pages" @change="p => page = p" />
                </div>
            </div>
        </section>
    </main>

</template>