<script setup>
import imagePath from '/assets/images/slider/slider-1.webp';
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
        categories.value = data.value;
    }catch(error){
        console.log(error);
    }
}
getCetagories();


const handelSubmit = async() => {
    refreshNuxtData();
    return navigateTo(`/search?search=${form.searchText}&category=${form.category}`);
}


const loadbtn = ref(false);
const page = ref(1);
const loadMoreCatBtn = async() => {
    loadbtn.value = true;
    page.value++;
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories?page=${page.value}`);
        categories.value.push(...data.value?.categories?.data);
        slides.value = categories.value;
        loadbtn.value = false;
    }catch(error){
        loadbtn.value = false;
        console.log(error);
    }
}

watch(() => form.category, async (currentValue) => {
    form.category = '';
    loadMoreCatBtn();
  },
  {deep: true}
);

</script>
<template>
    <!-- <div class="banner w-full h-40 bg-center bg-no-repeat bg-cover" :style="`background-image: url(${imagePath})`"> -->
    <div class="banner w-full h-40 bg-gray-500/40 bg-center bg-no-repeat bg-cover">
        <div class="max-w-screen-2xl flex flex-wrap items-center justify-between h-full mx-auto p-4">
        
            <form class="flex justify-center w-full">
                <div class="flex justify-center w-3/5">
                    
                    <form @submit.prevent="handelSubmit" action="`/search`" class="relative w-full flex">
                        <div class="flex w-full">
                            <select id="categories"
                                v-model="form.category"
                                class="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-s-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option disabled value="">Category</option>
                                <option v-for="cat of categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                                <!-- <option value="morecat">More Categoris</option> -->
                            </select>
    
                            <input type="text" v-model="form.searchText" id="search-dropdown" class="block p-2.5 w-full z-10 text-sm text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates...">
                        </div>
                        
                        <button type="submit" class="py-2.5 px-5 text-sm font-medium h-full text-white rounded-e-lg bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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