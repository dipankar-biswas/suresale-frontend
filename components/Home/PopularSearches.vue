<script setup>
const emit = defineEmits(['popularSearch']);
const searches = ref([]);
const getMostSearch = async() => {
    refreshNuxtData();

    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/most-search`);
        searches.value = data.value;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
getMostSearch();

const handelSubmit = async(searchText) => {
    emit('popularSearch',searchText);
    return navigateTo(`/search?search=${searchText}&category=`);
}
</script>
<template>
    <div class="mx-auto w-full max-w-screen-2xl px-4 py-2">
        <div class="bg-white">
            <div class="title flex items-center gap-3 px-3 py-3 border-b-2 mb-4">
                <h4 class="text-xl font-semibold">Popular Searches</h4>
            </div>
            <div class="searches rounded grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-3 gap-y-4">
                <div v-if="pending">
                    Loading ...
                </div>
                <div v-else v-for="search in searches" :key="search.id" @click="handelSubmit(search.name)" class="py-2.5 px-5 flex items-center justify-center text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer">{{ search.name }}</div>
                <!-- <a href="#" class="py-2.5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Search Item</a>
                <a href="#" class="py-2.5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Search Item</a>
                <a href="#" class="py-2.5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Search Item</a>
                <a href="#" class="py-2.5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Search Item</a>
                <a href="#" class="py-2.5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Search Item</a>
                <a href="#" class="py-2.5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Search Item</a>
                <a href="#" class="py-2.5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Search Item</a>
                <a href="#" class="py-2.5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Search Item</a>
                <a href="#" class="py-2.5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Search Item</a>
                <a href="#" class="py-2.5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Search Item</a>
                <a href="#" class="py-2.5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Search Item</a>
                <a href="#" class="py-2.5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Search Item</a> -->
            </div>
        </div>
    </div>
</template>