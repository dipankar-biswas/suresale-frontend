<script setup>
import { onMounted } from 'vue'
import { Modal, initFlowbite } from 'flowbite';

definePageMeta({
  middleware: ["auth"]
})

const auth = useAuthStore();
const token = useTokenStore();

onMounted(() => {
    initFlowbite();
})

useSeoMeta({
  title: 'My Dashboard - A Bangladeshi Local Marketplace',
  ogTitle: 'My Dashboard - A Bangladeshi Local Marketplace',
  description: 'Suresale - A Bangladeshi Local Marketplace',
  ogDescription: 'Suresale - A Bangladeshi Local Marketplace',
  ogImage: 'image',
  twitterCard: 'image',
})


const chatLists = ref('');
const getChatList = async() => {
    refreshNuxtData();
    
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/message`, {
                    method: 'OPTIONS',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                });
        if (error.value?.data?.message === 'Unauthenticated.') {
            token.removeToken();
        } else {
            chatLists.value = data.value.data.data;
        }
    }catch(error){
        console.log(error);
    }
}
getChatList();



const pdtreviews = ref([]);
const totalRating = ref(0);
const pdtReviews = async() => {
    refreshNuxtData();
    
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/review`,{
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        if (error.value?.data?.message === 'Unauthenticated.') {
            token.removeToken();
        } else {
            pdtreviews.value = data.value.data.data;
    
            let ratingSum = 0;
            for (let i = 0; i < pdtreviews.value?.length; i++) {
                ratingSum += pdtreviews.value[i].rating;
            }
            totalRating.value = ratingSum / pdtreviews.value?.length;
        }
    }catch(error){
        console.log(error);
    }
}
pdtReviews();


const allAds = ref([]);
const allAdsList = ref([]);
const AllAds = async() => {
    console.log('SDHFiusgf');
    refreshNuxtData();
    
    try{
        const { pending, data, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/profile/${auth?.user?.id}`,{
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        if (error.value?.data?.message === 'Unauthenticated.') {
            token.removeToken();
        } else {
            allAds.value = data.value;
            allAdsList.value = data.value?.product?.data;
        }
    }catch(error){
        console.log(error);
    }
}
AllAds();

</script>
<template>    
    <div class="content">
        <div class="max-w-screen-2xl flex gap-x-4 h-full mx-auto px-4 py-9">
            
            <UserSidebar></UserSidebar>

            <div class="w-[calc(100%-basis-72)] w-full">
                <div class="mx-auto w-full max-w-screen-2xl">
                    <div class="bg-gray-100 rounded-md px-4 py-5">
                        <h4 class="text-lg font-semibold mb-3">Overview</h4>
                        <div class="adses rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-5 gap-y-5">
                            <div class="bg-white rounded-md p-3">
                                <div class="flex justify-between">
                                    <div class="flex flex-col gap-y-3">
                                        <h4 class="text-md font-semibold">
                                            <span v-if="chatLists?.length > 0">{{ chatLists?.length }}</span>
                                            <span v-else>0</span>
                                        </h4>
                                        <h4 class="text-md font-semibold hover:text-blue-500"><nuxt-link to="/user/message">Chat</nuxt-link></h4>
                                    </div>
                                    <div class="flex flex-col gap-y-3">
                                        <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M4 3a1 1 0 0 0-1 1v8c0 .6.4 1 1 1h1v2a1 1 0 0 0 1.7.7L9.4 13H15c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1H4Z" clip-rule="evenodd"/>
                                            <path fill-rule="evenodd" d="M8 17.2h.1l2.1-2.2H15a3 3 0 0 0 3-3V8h2c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1h-1v2a1 1 0 0 1-1.7.7L14.6 18H9a1 1 0 0 1-1-.8Z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-white rounded-md p-3">
                                <div class="flex justify-between">
                                    <div class="flex flex-col gap-y-3">
                                        <h4 class="text-md font-semibold">
                                            <span v-if="pdtreviews?.length > 0">{{ pdtreviews?.length }}</span>
                                            <span v-else>0</span>
                                        </h4>
                                        <h4 class="text-md font-semibold">Reviews</h4>
                                    </div>
                                    <div class="flex flex-col gap-y-3">
                                        <div class="flex items-center gap-x-1">
                                            <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z"/>
                                            </svg>
                                            <span v-if="totalRating">{{ totalRating }}</span>
                                        </div>
                                        <h4 class="text-md font-semibold">Ratings</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gray-100 rounded-md px-4 py-5 mt-6">
                        <h4 class="text-lg font-semibold mb-3">Your Listings</h4>
                        <div class="adses rounded grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-5">
                            <div class="bg-white rounded-md p-3 flex flex-col gap-y-3">
                                <h4 class="text-md font-semibold">
                                    <span v-if="allAdsList?.length > 0">{{ allAdsList?.length }}</span>
                                    <span v-else>0</span>
                                </h4>
                                <h4 class="text-md font-semibold">Active and pending</h4>
                            </div>
                            <div class="bg-white rounded-md p-3 flex flex-col gap-y-3">
                                <h4 class="text-md font-semibold">0</h4>
                                <h4 class="text-md font-semibold">Sold</h4>
                            </div>
                            <div class="bg-white rounded-md p-3 flex flex-col gap-y-3">
                                <h4 class="text-md font-semibold">0</h4>
                                <h4 class="text-md font-semibold">Out of stock</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>