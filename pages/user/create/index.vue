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
  title: 'Ads Type Select - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})

const token = useTokenStore();

const adstype = ref([]);
const adsType = async() => {
    refreshNuxtData();
    try{
        const { pending, data, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/categories`);
        if (error.value?.data?.message === 'Unauthenticated.') {
            token.removeToken();
        } else {
            adstype.value = data.value.data;
        }
    }catch(error){
        console.log(error);
    }
}
adsType();

const typeId = ref(null);
const categoryId = ref(null);

const isActive = ref([]);
const categories = ref([]);
const showCategory = async(type) => {
    isActive.value = [];
    typeId.value = type.id;

    const modal = new Modal(document.getElementById('categoryselect-modal'), null);
    modal.show();
    try{
        const { pending, data, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/categories?parent_id=${type?.id}`);
        if (error.value?.data?.message === 'Unauthenticated.') {
            token.removeToken();
        } else {
            categories.value = data.value.data;
        }
    }catch(error){
        console.log(error);
    }
}

const loading = ref(false);
const activeFun = async(id,index) => {
    isActive.value = [];
    isActive.value[index] = true;
    categoryId.value = id;
    loading.value = true;

    try{
        categories.value = [];
        const { pending, data, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/categories?parent_id=${id}`);
        if(data.value.data.length == 0 || data.value.data == null){
            const modal = new Modal(document.getElementById('categoryselect-modal'), null);
            if(typeId.value != null && categoryId.value != null){
                modal.hide();
                return navigateTo(`/user/create/${typeId.value}/${categoryId.value}`);
            }
        }else {
            isActive.value = [];
            categories.value = data.value.data;
            loading.value = false;
        }
        
    }catch(error){
        console.log(error);
        loading.value = false;
    }
}

const actionSubmit = async() => {
    const modal = new Modal(document.getElementById('categoryselect-modal'), null);
    if(typeId.value != null && categoryId.value != null){
        modal.hide();
        return navigateTo(`/user/create/${typeId.value}/${categoryId.value}`);
    }
}


const CacheType = (type) => {
    localStorage.setItem("type_name", type.name);
    localStorage.setItem("type_image", type.image);
    return navigateTo(`/user/create/${type.id}`);
}

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
                                <div @click="CacheType(type)" class="cursor-pointer flex flex-col items-center px-6 pt-6 pb-8">
                                    <img class="w-24 h-24 mb-3 rounded-full shadow-lg" :src="useRuntimeConfig().public.imageUrl+'/'+type?.image" alt="image"/>
                                    <h5 class="mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
                                        <h4 class="text-md text-gray-700 capitalize mb-2.5">{{ type?.name }}</h4>
                                        <p class="text-xs text-gray-500">{{ type?.desc }}</p>
                                    </h5>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Category Select Modal -->
        <div id="categoryselect-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-lg max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Categories</h3>
                        <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="categoryselect-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-4 md:p-5">
                        
                        <div v-if="!loading">
                            <ul v-if="categories.length > 0" class="flex flex-wrap gap-x-3 gap-y-4">
                                <li v-for="(cat,index) in categories" :key="index" @click="activeFun(cat.id,index)" :class="isActive[index] ? 'bg-blue-400 text-white' : ''" class="item px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer capitalize">{{ cat.name }}</li>
                            </ul>
                            <ul v-else class="w-full">
                                <li class="item px-4 py-1.5 my-6 flex justify-center items-center">
                                    Data Not Found!!
                                </li>
                            </ul>
                        </div>

                        <ul v-else class="w-full">
                            <li class="item px-4 py-1.5 my-6 flex justify-center items-center">
                                <img src="assets/images/loader.gif" alt="Loading..." class="flex w-6">
                            </li>
                        </ul>


                        <!-- <button @click="actionSubmit" class="mt-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Continue</button> -->
                    </div>
                </div>
            </div>
        </div> 
    </div>

</template>