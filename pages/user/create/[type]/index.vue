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
  title: 'Ads Category Select - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})

const route = useRoute();

const categories = ref([]);
const categoryId = ref(null);
const getCetagories = async() => {
    refreshNuxtData();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/categories/types/${route.params.type}`);
        categories.value = data.value.data;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
getCetagories();
</script>
<template>    
    <div class="content">
        <div class="max-w-screen-2xl flex gap-x-4 h-full mx-auto px-4 py-9">
            
            <UserSidebar></UserSidebar>

            <div class="w-[calc(100%-basis-72)] w-full">
                <div class="mx-auto w-full max-w-screen-sm">
                    <div class="bg-gray-100 rounded-md px-4 py-5">
                        <h4 class="text-lg font-semibold mb-3">Choose Category</h4>
                        <div class="col-span-2 sm:col-span-1">
                            <select id="categories"
                                v-model="categoryId"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option disabled value="null">Category</option>
                                <option v-for="(cat,index) in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                            </select>
                        </div>
                        <nuxt-link :to="`/user/create/${route.params.type}/${categoryId}`" class=" mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Continue
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>