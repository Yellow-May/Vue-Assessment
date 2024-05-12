<script setup lang="ts">
import { useFetch } from '@/hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';
import { ChevronLeft } from 'lucide-vue-next'
import { ref } from 'vue';
import { PER_PAGE, query_keys } from '@/constants';
import VsToast from '@vuesimple/vs-toast';

const route = useRoute()
const router = useRouter();
const fetch = useFetch();
const queryClient = useQueryClient();
const is_open = ref(false);

const { isLoading, isFetching, data, isError, error } = useQuery({
    queryKey: ["PRODUCT.DETAIL", route.params.id],
    queryFn: async () => {
        const res = await fetch.get('api/products/' + route.params.id)
        return res.data
    },
    retry: 1,
    staleTime: Infinity,
})

const mutation = useMutation({
    mutationFn: async () => {
        return await fetch.delete('api/products/' + route.params.id);
    },
    onSuccess() {
        VsToast.show({
            title: 'Deletion Success',
            message: 'Product deleted successfully',
            variant: 'info',
            position: 'bottom-center'
        })
        queryClient.invalidateQueries({ queryKey: [query_keys.PRODUCTS_DATA_KEY, PER_PAGE, 1, '', undefined] })
        router.replace({ name: 'home' })
    },
    onError(error: any) {
        VsToast.show({
            title: 'Deletion Error',
            message: error.response.data.message,
            variant: 'error',
            position: 'bottom-center'
        })
    },
});

function handleClose() {
    !mutation.isPending.value ? is_open.value = false : null
}
</script>

<template>
    <main class="flex-grow overflow-y-auto w-full md:flex md:gap-1">
        <div class="max-w-[758px] w-full mx-auto px-5 py-5 pb-7">
            <div class="mb-5 flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <button class="flex items-center leading-none" type="button" title="go back"
                        @click="$router.back()">
                        <chevron-left :size="20" />
                    </button>
                    <h2 class="md:text-xl font-bold">Product Details</h2>
                </div>

                <div v-if="data?.data && !isLoading" class="flex justify-center gap-2">
                    <router-link :to="{ name: 'products.edit', params: { id: route.params.id } }"
                        class="text-xs h-6 md:text-sm md:h-8 bg-orange-400 text-white px-3 md:px-5 rounded flex items-center justify-center">
                        Edit
                    </router-link>
                    <button type="button" @click="is_open = true"
                        class="text-xs h-6 md:text-sm md:h-8 bg-red-500 text-white px-3 md:px-5 rounded flex items-center justify-center">
                        Delete
                    </button>
                </div>
            </div>

            <div v-if="isLoading || isFetching" class="grid md:grid-cols-2 gap-5">
                <div>
                    <v-skeleton type="text" width="320px" height="270px" />
                </div>

                <div class="flex flex-col gap-2 w-full">
                    <div v-for="i in 5" :key="i">
                        <v-skeleton type="text" width="40px" height="7px" />
                        <v-skeleton type="text" width="200px" height="10px" />
                    </div>
                </div>
            </div>

            <div v-else-if="isError && error" class="flex flex-col justify-center items-center gap-4 py-10">
                <span class="text-2xl font-bold text-red-500">There was an Error</span>
                <span>{{ (error as any).response?.data.message ?? error?.message }}</span>

                <div>
                    <router-link :to="{ name: 'home', replace: true }"
                        class="text-white bg-orange-500 px-5 h-12 rounded flex items-center justify-center">Back
                        Home</router-link>
                </div>
            </div>

            <div v-else-if="data?.data" class="grid md:grid-cols-2 gap-5">
                <!-- image -->
                <div>
                    <div class="h-[300px] bg-gray-400 bg-cover bg-center bg-no-repeat"
                        :style="{ backgroundImage: `url(${data.data.image})` }" />
                </div>

                <div class="space-y-4">
                    <div class="flex flex-col gap-1">
                        <span class="text-gray-500 font-medium text-xs">Name:</span> <span
                            class="font-semibold block leading-none">{{ data.data.name }}</span>
                    </div>

                    <div class="flex flex-col gap-1">
                        <span class="text-gray-500 font-medium text-xs">Category:</span> <span
                            class="font-semibold block leading-none">{{ data.data.category.name }}
                        </span>
                    </div>

                    <div class="flex flex-col gap-1">
                        <span class="text-gray-500 font-medium text-xs">In Stock:</span> <span
                            class="font-semibold block leading-none">{{ data.data.quantity }}
                        </span>
                    </div>

                    <div class="flex flex-col gap-1">
                        <span class="text-gray-500 font-medium text-xs">Price:</span> <span
                            class="font-semibold block leading-none">{{ '$' + data.data.price }}
                        </span>
                    </div>

                    <div class="flex flex-col gap-1">
                        <span class="text-gray-500 font-medium text-xs">Description:</span> <span
                            class="font-semibold block leading-none">{{ data.data.description }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <div v-if="is_open" class="fixed z-20 top-0 left-0 w-full h-full flex items-center justify-center">
        <div class="fixed -z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50" @click="handleClose" />
        <div class="bg-white p-5 rounded-md max-w-[90%] w-[360px] flex flex-col gap-5 leading-none">
            <span class="block font-bold text-xl text-center">Delete Product?</span>
            <span class="block font-semibold text-red-700 text-center">This cannot be reversed! Are you sure??</span>
            <div class="grid grid-cols-2 gap-3 h-8 text-sm font-medium">
                <button type="button" :disable="mutation.isPending.value" @click="handleClose"
                    class="border rounded border-orange-500 text-orange-500 bg-gray-50">Cancel</button>
                <button type="button" :disable="mutation.isPending.value" class="bg-red-700 text-white rounded"
                    @click="mutation.mutate">
                    {{ mutation.isPending.value ? 'Deleting...' : 'Delete' }}
                </button>
            </div>
        </div>
    </div>
</template>