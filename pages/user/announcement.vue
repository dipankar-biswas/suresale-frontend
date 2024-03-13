<script setup>
definePageMeta({
  middleware: ["auth"]
})
import { Modal } from 'flowbite';
useSeoMeta({
  title: 'Annoucement - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})
const datetime = useDateTime();
const common = useCommonFun();


const announcement = ref([]);
const Announcement = async() => {
    refreshNuxtData();
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/announcement`,{
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        announcement.value = data.value;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
Announcement();

const announcementdetail = ref([]);
const announRead = async(announ,seenValue) => {
    const modal = new Modal(document.getElementById('announdetail-modal'), null);
    modal.show();
    const modalClose = document.querySelectorAll('.announdetail-modal');
    modalClose.forEach(closebtn => {
        closebtn.addEventListener('click', () => {
            modal.hide();
        })
    });
    
    if(seenValue === 0){
        //@todo: One Click Functin Double Call
        const token = useTokenStore();
        try{
            const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/announcement/${announ?.id}`,{
                method: 'PATCH',
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token.getToken}`,
                },
            });
            announcementdetail.value = announ;
            Announcement();
        }catch(error){
            console.log(error);
        }
    }else{
        announcementdetail.value = announ;
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
                        <h4 class="text-lg font-semibold mb-3">Announcement</h4>
                        <div class="adses rounded grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-5">
                            
                            <div v-for="(announ, index) in announcement"  class="max-w-full border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-3" :class="announ.seen == 0 ? 'bg-blue-50' : 'bg-white'">
                                <div @click="announRead(announ,announ?.seen)" class="px-5 py-3 w-full cursor-pointer">
                                    <h2 class="text-md text-gray-700" :class="announ.seen == 0 ? 'font-bold' : 'font-semibold'">{{ announ.subject }}</h2>
                                    <p class="text-sm mb-2" :class="announ.seen == 0 ? 'font-semibold' : 'font-normal'">{{ common.parseText(announ.message,120) }}</p>
                                    <p class="text-sm text-gray-400">{{ datetime.formatCompat(announ.created_at) }}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Main modal -->
        <div :id="`announdetail-modal`" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Announcement Detail
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white announdetail-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div v-if="announcementdetail != null" class="p-4 md:p-5 space-y-4">
                        <h2 class="text-md text-gray-700 font-semibold" >{{ announcementdetail.subject }}</h2>
                        <p class="text-sm mb-2 font-normal">{{ announcementdetail.message }}</p>
                        <p class="text-sm text-gray-400">{{ datetime.formatCompat(announcementdetail.created_at) }}</p>
                    </div>
                    <div v-else class="p-4 md:p-5 space-y-4">
                        Something Wrong!!
                    </div>
                    <!-- Modal footer -->
                    <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 announdetail-modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>