<script setup lang="ts">
import { instance } from '@/config/axios';
import { useFetch } from '@/hooks';
import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useCookies } from 'vue3-cookies';
import { useRouter } from 'vue-router';
import { AUTH_DURATION, cookie_keys } from '@/constants';
import VsToast from '@vuesimple/vs-toast';

const router = useRouter();
const fetch = useFetch();
const { cookies } = useCookies();

const email = ref('');
const password = ref('');

const mutation = useMutation({
    mutationFn: async (values: any) => {
        await instance.get('sanctum/csrf-cookie')
        const res = await fetch.post('api/login', values)
        return res;
    },
    onSuccess(data) {
        // save auth details in cookies for 24 hours
        // refer to constant/index.ts to change duration
        cookies.set(cookie_keys.AUTH_USER_KEY, data.data.data.user, AUTH_DURATION)
        cookies.set(cookie_keys.AUTH_TOKEN_KEY, data.data.data.token, AUTH_DURATION)
        VsToast.show({
            title: 'Login Success',
            message: 'Authentication Successful',
            variant: 'success',
            position: 'bottom-center'
        })
        router.replace({ name: 'home' })
    },
    onError(error: any) {
        VsToast.show({
            title: 'Login Error',
            message: error.response.data.message,
            variant: 'error',
            position: 'bottom-center'
        })
    }
})

const submit_handler = async () => {
    const values = {
        email: email.value, password: password.value,
    }
    mutation.mutate(values)
}

</script>

<template>
    <div class="min-h-full flex flex-col justify-center items-center py-5 bg-orange-100">
        <div class="max-w-[480px] w-11/12 bg-white rounded-lg">
            <h1 class="font-bold md:text-2xl p-5 border-b w-full border-b-orange-200">Admin Login</h1>
            <div class="p-5">
                <form-kit type="form" :submit-label="mutation.isPending.value ? 'Logging In...' : 'Login'"
                    @submit="submit_handler">
                    <form-kit type="email" label="Email" name="email" id="email" placeholder="admin@example.com"
                        validation="required|email" v-model="email" :disabled="mutation.isPending.value" />

                    <form-kit type="password" label="Password" name="password" id="password" placeholder="************"
                        validation="required|password" v-model="password" :disabled="mutation.isPending.value" />
                </form-kit>
            </div>
        </div>

        <div v-if="mutation.isPending.value"
            class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-25">
            <div class="py-4 px-10 max-w-full rounded-lg bg-white flex flex-col gap-1 items-center justify-center">
                <span class="text-xl font-semibold">Logging In...</span>
                <span>Please wait!</span>
            </div>
        </div>
    </div>.value
</template>

<style scoped>
form {
    @apply w-full md:w-auto;
}

form .group {
    @apply md:w-full md:max-w-[unset];
}
</style>