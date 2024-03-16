<script setup>
const emit = defineEmits(['priceFilter','adsChecked','catChecked','condChecked','stateChecked']);

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


const conditions = ref([]);
const getConditions = async() => {
    refreshNuxtData();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/conditions`);
        conditions.value = data.value;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
getConditions();

const price = ref({
    min: 0,
    max: 500,
});
const adsChecked = ref([]);
const catChecked = ref([]);
const condChecked = ref([]);
const stateChecked = ref([]);
emit('adsChecked',adsChecked);
emit('catChecked',catChecked);
emit('condChecked',condChecked);
emit('stateChecked',stateChecked);
emit('stateChecked',stateChecked);
const handelPriceFilter = () => {
    emit('priceFilter',price);
}

</script>
<template>
    <aside id="sidebar-multi-level-sidebar" class="fixed top-0 left-0 z-40 md:z-0 w-64 h-screen md:relative md:h-auto transition-transform -translate-x-full md:translate-x-0" aria-label="Sidebar">
        <div class="h-full px-3 py-6 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-b-sm">
            <div class="s-categories mb-3">
                <h4 class="text-lg font-medium mb-4">Price Range</h4>
                <form @submit.prevent="handelPriceFilter">
                    <div class="flex items-center gap-x-2">
                        <div>
                            <label for="min" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min</label>
                            <input type="text" id="min" v-model="price.min" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                        </div> 
                        <div>
                            <p class="pt-6">To</p>
                        </div>
                        <div>
                            <label for="max" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max</label>
                            <input type="text" id="max" v-model="price.max" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                        </div> 
                    </div>
                    <div class="flex justify-center mt-2">
                        <button type="submit" class="text-white text-xs bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Filter</button>
                    </div> 
                </form>
            </div>
            <div class="s-browse-market">
                <h4 class="text-lg font-medium mb-4">Filters</h4>

                <h4 class="text-md font-medium mb-3 ps-5">Ads Type</h4>
                <ul class="space-y-2 font-normal ps-6">

                    <li v-for="(ad,index) in adstype" :key="ad?.id">
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" :value="ad?.id" v-model="adsChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">{{ ad?.name }}</label>
                        </div>
                    </li>
                    
                </ul>

                <h4 class="text-md font-medium mb-3 ps-5">Categories</h4>
                <ul class="space-y-2 font-normal ps-6">

                    <li v-for="(cat,index) in categories" :key="cat?.id">
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" :value="cat?.id" v-model="catChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">{{ cat?.name }}</label>
                        </div>
                    </li>
                    
                </ul>
                <h4 class="text-md font-medium mb-3 mt-3 ps-5">Condition</h4>
                <ul class="space-y-2 font-normal ps-6">

                    <li v-for="(cond,index) in conditions" :key="cond?.id">
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" :value="cond?.id" v-model="condChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">{{ cond?.name }}</label>
                        </div>
                    </li>
                    
                </ul>

                <h4 class="text-md font-medium mb-3 mt-3 ps-5">Location</h4>
                <ul class="space-y-2 font-normal ps-6">
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Barishal" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Barishal</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Chattogram" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Chattogram</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Dhaka" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Dhaka</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Khulna" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Khulna</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Rajshahi" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Rajshahi</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Rangpur" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Rangpur</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Mymensingh" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Mymensingh</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Sylhet" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Sylhet</label>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="ads mt-10">
                <div class="image rounded-lg w-full h-64 overflow-hidden">
                    <img src="assets/images/slider/slider-1.webp" alt="Product Title" class="w-full h-full">
                </div>
            </div>
        </div>
    </aside>
</template>