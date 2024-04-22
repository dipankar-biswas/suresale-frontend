<script setup>
import { onMounted } from 'vue'
import { Modal, initFlowbite } from 'flowbite';

definePageMeta({
    middleware: ["auth"]
});


const type_name = ref(null);
const type_image = ref(null);
onMounted(() => {
    initFlowbite();
    type_name.value = localStorage.getItem("type_name");
    type_image.value = localStorage.getItem("type_image");
})

useSeoMeta({
  title: 'Ads Category Select - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})

const token = useTokenStore();

const route = useRoute();

let parentId = ref(route.params.type);
let subcatname = ref(null);
const loading = ref(false);
const categories = ref([]);
const getCetagories = async() => {
    loading.value = true;

    refreshNuxtData();
    try{
        const { pending, data, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/categories?parent_id=${parentId.value}`);
        if (error.value?.data?.message === 'Unauthenticated.') {
            token.removeToken();
        } else {
            if(data.value.data.length == 0 || data.value.data == null){
                if(route.params.type != null && parentId.value != null){
                    return navigateTo(`/user/create/${route.params.type}/${parentId.value}`);
                }
            }else {
                categories.value = data.value.data;
                loading.value = false;
            }
        }
    }catch(error){
        console.log(error);
        loading.value = false;
    }
}
getCetagories();


const showSubCat = async(cat) => {
    parentId.value = cat?.id;
    subcatname.value = cat?.name;
    getCetagories()
}

const refreshData =async() => {
    parentId.value = route.params.type;
    getCetagories();
}

</script>
<template>    
    <div class="content">
        <div class="max-w-screen-2xl flex gap-x-4 h-full mx-auto px-4 py-9">
            
            <UserSidebar></UserSidebar>

            <div class="w-[calc(100%-basis-72)] w-full">
                <div class=" w-full max-w-screen-lg">
                    <div class="px-4 py-5">
                        <div class="adses rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                            
                            <div class="w-full max-w-sm bg-gray-100 rounded-md border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
                                <div v-if="subcatname == null" class="flex items-center gap-x-2 px-4 py-2">
                                    <div class="bg-gray-700 rounded-md">
                                        <img class="w-12 h-12" :src="useRuntimeConfig().public.imageUrl+'/'+type_image" alt="image"/>
                                    </div>
                                    <h5 class="mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
                                        <h4 class="text-md text-gray-600 font-semibold capitalize">{{ type_name }}</h4>
                                    </h5>
                                </div>
                                <div v-else class="flex items-center gap-x-2 px-4 py-2">
                                    <h5 class="mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
                                        <h4 class="text-md text-gray-600 font-semibold capitalize">{{ subcatname }}</h4>
                                    </h5>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="rounded-md px-4 py-5">
                        <h4 class="text-lg font-semibold mb-5">Sellect Category</h4>
                        <div v-if="!loading" class="adses rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                            
                            <div v-for="(cat,index) in categories" :key="index" class="w-full max-w-sm bg-gray-100 rounded-md border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
                                <div @click="showSubCat(cat)" class="flex items-center gap-x-2 px-4 py-2 cursor-pointer">
                                    <!-- <div class="p-0.5 rounded-md">
                                        <img class="w-12 h-12" :src="useRuntimeConfig().public.imageUrl+'/'+cat.image" alt="image"/>
                                    </div> -->
                                    <h5 class="mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
                                        <h4 class="text-sm text-gray-600 font-semibold">{{ cat.name }}</h4>
                                    </h5>
                                </div>
                            </div>

                        </div>
                        <div v-else class="w-full">
                            <div class="item px-4 py-1.5 my-6 flex justify-center items-center">
                                <img src="assets/images/loader.gif" alt="Loading..." class="flex w-6">
                            </div>
                        </div>

                        <div class="mt-8 flex justify-end">
                            <nuxt-link v-if="subcatname == null" to="/user/create" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Back</nuxt-link>
                            <button v-else @click="refreshData" type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>