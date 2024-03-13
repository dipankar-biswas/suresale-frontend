<script setup>
const form = reactive({
    category: '',
    searchText: '',
    location: '',
})
const categories = ref([]);
const getCetagories = async() => {
    refreshNuxtData();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories`);
        categories.value = data.value.categories;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
getCetagories();

const searchDatas = ref([]);
const handelSubmit = async() => {
    refreshNuxtData();
    return navigateTo(`/search?search=${form.searchText}&category=${form.category}`);
}
</script>
<template>
    <div class="banner w-full h-60 bg-center bg-no-repeat bg-cover" style="background-image: url('/_nuxt/assets/images/slider/slider-1.webp')">
        <div class="max-w-screen-2xl flex flex-wrap items-end justify-between h-full mx-auto p-4">
        
            <form class="flex justify-center w-full">
                <div class="flex justify-center w-3/4">
                    
                    <form @submit.prevent="handelSubmit" action="`/search`" class="relative w-full flex">
                        <div class="flex w-full">
                            <select id="categories"
                                v-model="form.category"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-s-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option disabled value="">Category</option>
                                <option v-for="cat of categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                            </select>
    
                            <input type="text" v-model="form.searchText" id="search-dropdown" class="block p-2.5 w-full z-10 text-sm text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates...">
                        </div>
                        
                        <button type="submit" class="p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </form>
                </div>
            </form>

        </div>
    </div>
</template>