<script setup>
import { onMounted } from 'vue'
import { Modal, initFlowbite } from 'flowbite';

onMounted(() => {
    initFlowbite();
})
useSeoMeta({
  title: 'Categories Products - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})

const route = useRoute();
const auth = useAuthStore();
const datetime = useDateTime();
const common = useCommonFun();

const totalads = ref(null);
const categoryDatas = ref([]);
const queryParams = new URLSearchParams({ category: route.params?.slug?.replaceAll('-',' ') });
const loading = ref(false);
const getSearchData = async() => {
    loading.value = true;
    refreshNuxtData();
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/search?search=${route.params?.slug?.replaceAll('-',' ')}`,{
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        if (data){
            categoryDatas.value = data.value.data;
            totalads.value = data.value.total;
            loading.value = false;
        }
    }catch(error){
        console.log(error);
        loading.value = false;
    }
}
getSearchData();



const priceFilterFun = (event) => {
    getSearchDatas(event,'price');
}
const adsCheckData = ref();
const adsCheckedFun = (event) => {
    adsCheckData.value = event
}
const catCheckData = ref();
const catCheckedFun = (event) => {
    catCheckData.value = event
}
const condCheckData = ref();
const condCheckedFun = (event) => {
    condCheckData.value = event
}
const stateCheckData = ref();
const stateCheckedFun = (event) => {
    stateCheckData.value = event
}

const searchDatas = ref([]);
const getSearchDatas = async(value, action) => {
    let obj;
    if(action == 'price'){
        obj = { price:[value.value.min,value.value.max] }
    }else if(action == 'type'){
        obj = { type:value }
    }else if(action == 'category'){
        obj = { category:value }
    }else if(action == 'condition'){
        obj = { condition:value }
    }else if(action == 'location'){
        obj = { location:value }
    }
    loading.value = true;
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/filter`,{
            method: 'POST',
            body: obj
        });
        categoryDatas.value = data.value.data;
        loading.value = false;
    }catch(error){
        console.log(error);
        loading.value = false;
    }
}

watch(() => adsCheckData.value, async (currentValue) => {
    if(currentValue.value.length > 0){
        getSearchDatas(adsCheckData.value,'type');
    }
  },
  {deep: true}
);
watch(() => catCheckData.value, async (currentValue) => {
    if(currentValue.value.length > 0){
        getSearchDatas(catCheckData.value,'category');
    }
  },
  {deep: true}
);
watch(() => condCheckData.value, async (currentValue) => {
    if(currentValue.value.length > 0){
        getSearchDatas(condCheckData.value,'condition');
    }
  },
  {deep: true}
);
watch(() => stateCheckData.value, async (currentValue) => {
    if(currentValue.value.length > 0){
        getSearchDatas(stateCheckData.value,'location');
    }
  },
  {deep: true}
);



const loadbtn = ref(false);
const page = ref(1);
const loadMoreBtn = async() => {
    loadbtn.value = true;
    page.value++;
    loading.value = true;
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/search?page=${page.value}`);
        categoryDatas.value.push(...data.value.data);
        loadbtn.value = false;
        loading.value = false;
    }catch(error){
        console.log(error);
        loadbtn.value = false;
        loading.value = false;
    }
}

</script>
<template>
    <div class="content">
        <div class="max-w-screen-2xl block md:flex justify-between gap-x-4 h-full mx-auto px-4">
          
            <Sidebar @priceFilter="priceFilterFun" @catChecked="catCheckedFun($event)" @condChecked="condCheckedFun($event)" @stateChecked="stateCheckedFun($event)" @adsChecked="adsCheckedFun($event)"></Sidebar>

            <div class="lg:w-[calc(100%-16rem)]">
                <div class="py-6">
                    <nav class="flex mb-3" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li class="inline-flex items-center">
                                <nuxt-link to="/" class="inline-flex items-center text-xs font-normal text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                    <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                    </svg>
                                    Home
                                </nuxt-link>
                            </li>
                            <li aria-current="page">
                                <div class="flex items-center">
                                    <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <span class="ms-1 text-xs font-normal text-gray-500 md:ms-2 dark:text-gray-400 capitalize">{{ route.params?.slug }}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <span class="sr-only">Open sidebar</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                

                    <!-- Ads -->
                    <div class="mx-auto w-full max-w-screen-2xl px-4 py-2">
                        <div class="bg-white">
                            <div v-if="!loading" class="w-full">
                                <div v-if="categoryDatas.length > 0" class="adses rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5">
                                    <AdsItem v-for="(ads,index) in categoryDatas" :key="index" :adsItem="ads"></AdsItem>
                                </div>
                                <div v-else>
                                    <p class="text-center py-4">Data Not Found!!</p>
                                </div>
                            </div>

                            <div v-else class="w-full">
                                <div class="item px-4 py-1.5 my-6 flex justify-center items-center">
                                    <img src="assets/images/loader.gif" alt="Loading..." class="flex w-6">
                                </div>
                            </div>


                            <div v-if="categoryDatas.length < totalads" class="flex justify-center mt-8">
                                <button @click="loadMoreBtn" type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-600 focus:outline-none bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    <div class="flex items-center justify-center gap-x-2">
                                        <div role="status" v-if="loadbtn">
                                            <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                        <span>Load More</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Popular Searches -->
    <HomePopularSearches></HomePopularSearches>
    
</template>
