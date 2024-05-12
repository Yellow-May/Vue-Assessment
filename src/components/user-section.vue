<script setup lang="ts">
import { ref } from 'vue';
import { useAuth, logout } from '@/hooks';

const { user, token } = useAuth();
const is_open = ref(false);

async function handle_logout() {
    await logout(token)
    is_open.value = false;
}

</script>
<template>
    <div class="relative z-20">
        <div v-if="is_open" class="fixed top-0 left-0 bg-black bg-opacity-5 w-full h-full -z-10"
            @click="is_open = false" />

        <div class="flex items-center gap-2" @click="is_open = !is_open">
            <img src="https://api.dicebear.com/6.x/fun-emoji/svg?seed=Mario" alt="admin"
                class="h-8 w-8 md:w-12 md:h-12 rounded-full" />
            <span class="font-bold text-sm">{{ user?.name }}</span>
        </div>


        <div v-if="is_open" class="absolute" :style="{ top: '110%', right: 0 }">
            <div class="bg-white w-32 shadow">
                <button type="button" class="text-xs p-2 w-full h-full text-left" @click="handle_logout">
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>