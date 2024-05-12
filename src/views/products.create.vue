<script setup lang="ts">
import { useCategoriesInForm, useFetch } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { PER_PAGE, query_keys } from '@/constants';
import VsToast from '@vuesimple/vs-toast';
import ProductFormLayout from '@/components/product-form.layout.vue';

const router = useRouter();
const fetch = useFetch();
const queryClient = useQueryClient();
const { options } = useCategoriesInForm()

// form fields
const image = ref(undefined);
const name = ref('');
const category = ref(undefined);
const price = ref('10');
const quantity = ref('2');
const description = ref('');

// payload transformation
const submit_handler = async () => {
    const formdata = new FormData();
    if (image.value?.[0]) formdata.append('image', (image.value?.[0] as any).file);
    if (name.value) formdata.append('name', name.value);
    if (category.value) formdata.append('category_id', category.value);
    if (price.value) formdata.append('price', price.value);
    if (quantity.value) formdata.append('quantity', quantity.value);
    if (description.value) formdata.append('description', description.value)
    mutation.mutate(formdata)
}

// mutation
const mutation = useMutation({
    mutationFn: async (values: FormData) => {
        return await fetch.post('api/products', values, { headers: { 'Content-Type': "multipart/form-data" } })
    },
    onSuccess() {
        VsToast.show({
            title: 'Submission Success',
            message: 'Product created successfully',
            variant: 'success',
            position: 'bottom-center'
        })
        queryClient.invalidateQueries({ queryKey: [query_keys.PRODUCTS_DATA_KEY, PER_PAGE, 1, '', undefined] })
        router.replace({ name: 'home' })
    },
    onError(error: any) {
        VsToast.show({
            title: 'Submission Error',
            message: error.response.data.message,
            variant: 'error',
            position: 'bottom-center'
        })
    },
})
</script>

<template>
    <product-form-layout :is_loading="mutation.isPending.value" heading="Add New Product">
        <!-- Create Product form -->
        <form-kit type="form" @submit="submit_handler">
            <form-kit type="file" name="image" id="image" label="Product Image" :multiple="false"
                validation="required|file_size_rule" help="Select 4x3 image for better viewing, Max size of 2mb"
                v-model="image" accept="image/*" />

            <form-kit type="text" name="name" id="name" label="Product Name" placeholder="Enter name"
                validation="required|length:5,100" help="Full name of Product" v-model="name" />

            <form-kit type="select" label="Category" name="category" id="category" placeholder="Select a category"
                :options="options" validation="required" help="Select product category" v-model="category" />

            <form-kit type="number" label="Price" name="price" id="price" placeholder="Enter price" prefix-icon="dollar"
                min="1" validation="required|number|min:1" help="Enter price of product in dollars" v-model="price" />

            <form-kit type="number" label="Quantiy" name="quantiy" id="quantity" placeholder="Enter quantity" max="100"
                min="1" validation="required|number|min:1|max:100|between:1,100" help="Total number of product in stock"
                v-model="quantity" />

            <form-kit type="textarea" label="Description" name="description" id="description"
                placeholder="Enter description" validation="required|length:10,255"
                help="Enter brief description of product" v-model="description" />
        </form-kit>
    </product-form-layout>
</template>