<script setup>
import { onMounted } from 'vue'
import { Modal, initFlowbite } from 'flowbite';

onMounted(() => {
    initFlowbite();
})
definePageMeta({
  middleware: ["auth"]
})
useSeoMeta({
  title: 'Ads Type Select - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})

const adstype = ref([]);
const adsType = async() => {
    refreshNuxtData();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/types`);
        adstype.value = data.value.data;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
adsType();
</script>
<template>    
    <div class="content">
        <div class="max-w-screen-2xl flex gap-x-4 h-full mx-auto px-4 py-9">
            
            <UserSidebar></UserSidebar>

            <div class="w-[calc(100%-basis-72)] w-full">
                <div class="mx-auto w-full max-w-screen-sm">
                    <div class="bg-gray-100 rounded-md px-4 py-5">
                        <h4 class="text-lg font-semibold mb-3">Choose Ads Type</h4>
                        <div class="adses rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-5">
                            
                            <div v-for="(type,index) in adstype" :key="type.id" class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div class="flex flex-col items-center px-6 pt-6 pb-8">
                                    <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/assets/images/avatar.png" alt="Bonnie image"/>
                                    <h5 class="mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
                                        <nuxt-link :to="`/user/create/${type.id}`">{{ type.name }}</nuxt-link>
                                    </h5>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>