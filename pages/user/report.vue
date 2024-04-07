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
  title: 'Reports - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})

const token = useTokenStore();
const datetime = useDateTime();
const common = useCommonFun();


const reports = ref([]);
const Reports = async() => {
    refreshNuxtData();
    
    try{
        const { pending, data, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/report`,{
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        if (error.value?.data?.message === 'Unauthenticated.') {
            token.removeToken();
        } else {
            reports.value = data.value.data;
        }
    }catch(error){
        console.log(error);
    }
}
Reports();

const reportdetail = ref([]);
const ReportRead = async(rprt) => {
    const modal = new Modal(document.getElementById('reportdetail-modal'), null);
    modal.show();
    const modalClose = document.querySelectorAll('.reportdetail-modal');
    modalClose.forEach(closebtn => {
        closebtn.addEventListener('click', () => {
            modal.hide();
        })
    });
    
    reportdetail.value = rprt;
}

const reportDeleteId = ref(null);
const reportDeleteIcon = async(id) => {
    const modal = new Modal(document.getElementById('reportdelete-modal'), null);
    modal.show();
    const modalClose = document.querySelectorAll('.reportdelete-modal');
    modalClose.forEach(closebtn => {
        closebtn.addEventListener('click', () => {
            modal.hide();
        })
    });
    reportDeleteId.value = id;
}

const reportDeleteBtn = async() => {
    const modal = new Modal(document.getElementById('reportdelete-modal'), null);
    
    
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/report/${reportDeleteId.value}`,{
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        
        if(data){
            Reports();
            modal.hide();
        }
    }catch(error){
        console.log(error);
    }
}

</script>
<template>    
    <div class="content">
        <div class="max-w-screen-2xl flex gap-x-4 h-full mx-auto px-4 py-9">
            
            <UserSidebar></UserSidebar>

            <div class="w-[calc(100%-basis-72)] w-full">
                <div class="mx-auto w-full max-w-screen-2xl">

                    <div class="bg-gray-100 rounded-md px-4 py-5 mt-6">
                        <h4 class="text-lg font-semibold mb-3">Reports</h4>
                        <div v-if="reports.length > 0" class="adses rounded grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-5">

                            <div v-for="(rprt, index) in reports" :key="index" class="bg-white max-w-full border border-gray-200 rounded-lg shadow ease-in-out duration-300 hover:shadow-lg hover:scale-y-105 dark:bg-gray-800 dark:border-gray-700 mb-3">
                                <div class="px-5 py-3 w-full">
                                    <h2 class="text-md text-gray-700 font-semibold flex justify-between items-start">
                                        <span @click="ReportRead(rprt)" class="cursor-pointer">{{ rprt?.subject }}</span>
                                        <span class="cursor-pointer" @click="reportDeleteIcon(rprt.id)">
                                            <svg class="w-5 h-5 text-gray-500 hover:text-red-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                            </svg>
                                        </span>
                                    </h2>
                                    <p class="text-sm mb-2 font-normal">{{ common.parseText(rprt?.desc,120) }}</p>
                                    <p class="text-sm text-gray-400">{{ datetime.formatCompat(rprt?.created_at) }}</p>
                                </div>
                            </div>

                        </div>
                        <div v-else class="adses rounded grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-5">

                            <div class="py-3">
                                Report Not Found
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Main modal -->
        <div id="reportdetail-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Report Detail
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white reportdetail-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div v-if="reportdetail != null" class="p-4 md:p-5 space-y-4">
                        <h2 class="text-md text-gray-700 font-semibold" >{{ reportdetail.subject }}</h2>
                        <p class="text-sm mb-2 font-normal">{{ reportdetail.desc }}</p>
                        <p class="text-sm text-gray-400">{{ datetime.formatCompat(reportdetail.created_at) }}</p>
                    </div>
                    <div v-else class="p-4 md:p-5 space-y-4">
                        Something Wrong!!
                    </div>
                    <!-- Modal footer -->
                    <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 reportdetail-modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete -->
        <div id="reportdelete-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white reportdelete-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-4 md:p-5 text-center">
                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                        <button @click="reportDeleteBtn" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center reportdeletebtn-modal">
                            Yes, I'm sure
                        </button>
                        <button type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 reportdelete-modal">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>