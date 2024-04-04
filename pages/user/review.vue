<script setup>
import { onMounted } from 'vue'
import { Modal, initFlowbite } from 'flowbite';

definePageMeta({
  middleware: ["auth"]
})

onMounted(() => {
    initFlowbite();
})
useSeoMeta({
  title: 'Reviews - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})


const common = useCommonFun();

// =======================================
// Product Reviews
const pdtreviews = ref([]);
const pdtReviews = async() => {
    refreshNuxtData();
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/review`,{
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        pdtreviews.value = data.value.data.data;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
pdtReviews();

</script>
<template>    
    <div class="content">
        <div class="max-w-screen-2xl flex gap-x-4 h-full mx-auto px-4 py-9">
            
            <UserSidebar></UserSidebar>

            <div class="w-[calc(100%-basis-72)] w-full">
                <div class="mx-auto w-full max-w-screen-2xl">

                    <div class="bg-gray-100 rounded-md px-4 py-5 mt-6">
                        <h4 class="text-lg font-semibold mb-3">Reviews</h4>
                        <div class="adses rounded grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-5">
                            <div v-for="(rvw,index) of pdtreviews" :key="rvw.id" class="flex max-w-full bg-white border border-gray-200 rounded-lg shadow ease-in-out duration-300 hover:shadow-lg hover:scale-y-105 dark:bg-gray-800 dark:border-gray-700">
                                <div class="relative">
                                    <nuxt-link :to="`/ads-details/${rvw?.product?.id}`">
                                        <img class="h-full w-40 rounded-s-md object-cover" v-if="rvw?.product?.picture != ''" :src="useRuntimeConfig().public.imageUrl+'/'+rvw?.product?.picture[0].replaceAll('public','storage')" alt="Ads" />
                                        <img class="h-full w-40 rounded-s-md object-cover" v-else src="assets/images/dummy-image.jpg" alt="Ads" />
                                    </nuxt-link>
                                </div>
                                <div class="px-3 py-1.5 w-full">
                                    <h4 class="mb-2 text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                                        <nuxt-link :to="`/ads-details/${rvw?.product?.id}`">{{ common.parseText(rvw?.product?.title,30) }}</nuxt-link>
                                    </h4>
                                    <h5 class="mb-1 text-xs font-semibold tracking-tight text-gray-900 dark:text-white">
                                        {{ rvw?.user?.name }}
                                    </h5>
                                    <p class="text-sm mb-1">
                                        {{ common.parseText(rvw?.comment,40) }}
                                    </p>
                                    <div class="flex items-center">
                                        <svg class="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <svg class="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <svg class="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <svg class="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <svg class="w-3 h-3 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <p class="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">{{ rvw.rating }}</p>
                                        <p class="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">out of</p>
                                        <p class="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">5</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>