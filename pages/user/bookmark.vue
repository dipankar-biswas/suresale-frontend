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
  title: 'Bookmark Products - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})
const datetime = useDateTime();
const listgrid = ref(1);

// =======================================
// Bookmark
const bookmarks = ref([]);
const MyBookmarks = async() => {
    refreshNuxtData();
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark`,{
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        bookmarks.value = data.value.data;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
MyBookmarks();


const bookmarkRemove = async(id,index) => {
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                });
        MyBookmarks();
    }catch(error){
        console.log('Somthing Wrong!');
    }
}


</script>

<template>    
    <div class="content">
        <div class="max-w-screen-2xl flex gap-x-4 h-full mx-auto px-4 py-9">
            
            <UserSidebar></UserSidebar>

            <div class="w-[calc(100%-basis-72)] w-full">
                <div class="mx-auto w-full max-w-screen-2xl">
                    <div class="bg-gray-100 rounded-md px-4 py-5">
                        <div class="flex justify-between">
                            <h4 class="text-lg font-semibold mb-3">My Wishlist</h4>
                            <div class="actions flex items-center">
                                <button type="button" class="list p-1 rounded-s-md bg-gray-400 [&.active]:bg-gray-600" @click="listgrid = 1" :class="{ 'active' : listgrid == 1 }">
                                    <svg class="w-6 h-6 text-gray-800 [&.active]:text-white dark:text-white" :class="{ 'active' : listgrid == 1 }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 8h10M9 12h10M9 16h10M5 8h0m0 4h0m0 4h0"/>
                                    </svg>
                                </button>
                                <button type="button" class="grid p-1 rounded-e-md bg-gray-400 [&.active]:bg-gray-600" @click="listgrid = 2" :class="{ 'active' : listgrid == 2 }">
                                    <svg class="w-6 h-6 text-gray-800 [&.active]:text-white dark:text-white" :class="{ 'active' : listgrid == 2 }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M4.9 3C3.9 3 3 3.8 3 4.9V9c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V9c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9h-4Zm-10 10c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9h-4Z" clip-rule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gray-100 rounded-md px-4 py-5 mt-6">
                        <div class="adses rounded grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-5" :class="[ listgrid == 2 ? 'grid' : 'flex flex-col' ]">
                            <div v-for="(ads,index) of bookmarks" :key="ads.id" class="max-w-full bg-white border border-gray-200 rounded-lg shadow ease-in-out duration-300 hover:shadow-lg  dark:bg-gray-800 dark:border-gray-700" :class="[ listgrid == 2 ? 'hover:scale-105' : 'flex hover:scale-y-105' ]">
                                <div class="relative">
                                    <nuxt-link :to="`/ads-details/${ads?.id}`">
                                        <img :class="[ listgrid == 1 ? 'w-72 h-48 rounded-s-md' : 'w-full h-56 rounded-t-md' ]" v-if="ads?.picture != ''" :src="useRuntimeConfig().public.imageUrl+'/'+ads?.picture[0].replaceAll('public','storage')" alt="Ads" />
                                        <img :class="[ listgrid == 1 ? 'w-72 h-48 rounded-s-md' : 'w-full h-56 rounded-t-md' ]" v-else src="assets/images/slider/slider-1.webp" alt="Ads" />
                                    </nuxt-link>
                                </div>
                                <div class="px-5 py-3" :class="[ listgrid == 1 ? 'w-[calc(100%-288px)]' : 'w-full' ]">
                                    <h4 class="mb-1 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                        <nuxt-link :to="`/ads-details/${ads?.id}`">{{ ads?.title }}</nuxt-link>
                                    </h4>
                                    <div class="flex items-center justify-start gap-x-4 mt-1 mb-2 space-x-3 rtl:space-x-reverse">
                                        <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-x-1">
                                            <svg class="w-3 h-3 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M5 5c.6 0 1-.4 1-1a1 1 0 1 1 2 0c0 .6.4 1 1 1h1c.6 0 1-.4 1-1a1 1 0 1 1 2 0c0 .6.4 1 1 1h1c.6 0 1-.4 1-1a1 1 0 1 1 2 0c0 .6.4 1 1 1a2 2 0 0 1 2 2v1c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V7c0-1.1.9-2 2-2ZM3 19v-7c0-.6.4-1 1-1h16c.6 0 1 .4 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6-6c0-.6-.4-1-1-1a1 1 0 1 0 0 2c.6 0 1-.4 1-1Zm2 0a1 1 0 1 1 2 0c0 .6-.4 1-1 1a1 1 0 0 1-1-1Zm6 0c0-.6-.4-1-1-1a1 1 0 1 0 0 2c.6 0 1-.4 1-1ZM7 17a1 1 0 1 1 2 0c0 .6-.4 1-1 1a1 1 0 0 1-1-1Zm6 0c0-.6-.4-1-1-1a1 1 0 1 0 0 2c.6 0 1-.4 1-1Zm2 0a1 1 0 1 1 2 0c0 .6-.4 1-1 1a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                                            </svg>
                                            
                                            <span class="text-xs">March 2, 2024</span>
                                        </div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-x-1">
                                            <svg class="w-3 h-3 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M12 2a8 8 0 0 1 6.6 12.6l-.1.1-.6.7-5.1 6.2a1 1 0 0 1-1.6 0L6 15.3l-.3-.4-.2-.2v-.2A8 8 0 0 1 11.8 2Zm3 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"/>
                                            </svg>
                                            <span class="text-xs">Moghbazar, Dhaka</span>
                                        </div>
                                    </div>
                                    <div class="price text-2xl font-semibold mb-3">{{ ads?.currency?.symbol }}{{ ads?.price }}</div>
                                    <div class="flex justify-between">
                                        <p class="text-xs">
                                            <nuxt-link :to="`${ads?.user?.name.replaceAll(' ','-')}/${ads?.user?.id}/products`">{{ ads?.user?.name }}</nuxt-link>, {{ datetime.formatCompat(ads.created_at) }}
                                        </p>
                                        <svg v-if="ads.is_bookmarked == 1" @click="bookmarkRemove(ads.id,index)" class="w-6 h-6 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"/>
                                        </svg>
                                    </div>
                                    <div class="actions">
                                        <a v-if="ads?.user?.mobile != null" :href="`tel:${ ads?.user?.mobile }`" class="inline-flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-sm font-medium text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z"/>
                                                </svg>
                                                <span>Contact Seller</span>
                                            </div>
                                        </a>
                                        <a v-else href="#" class="inline-flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-3 py-2 text-sm font-medium text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z"/>
                                                </svg>
                                                <span>Contact Seller</span>
                                            </div>
                                        </a>
                                        <button v-if="auth?.user?.id" type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">
                                            <div @click="chathideshow = true, msgShowBtn(ads?.user?.id,  ads?.id, ads?.user?.id,  ads?.user?.name,  ads?.user?.profile_picture)" class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" d="M4 3a1 1 0 0 0-1 1v8c0 .6.4 1 1 1h1v2a1 1 0 0 0 1.7.7L9.4 13H15c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1H4Z" clip-rule="evenodd"/>
                                                    <path fill-rule="evenodd" d="M8 17.2h.1l2.1-2.2H15a3 3 0 0 0 3-3V8h2c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1h-1v2a1 1 0 0 1-1.7.7L14.6 18H9a1 1 0 0 1-1-.8Z" clip-rule="evenodd"/>
                                                </svg>
                                                <span>Start Chat</span>
                                            </div>
                                        </button>
                                        <button v-else type="button" data-modal-target="start-chat-modal" data-modal-toggle="start-chat-modal" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" d="M4 3a1 1 0 0 0-1 1v8c0 .6.4 1 1 1h1v2a1 1 0 0 0 1.7.7L9.4 13H15c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1H4Z" clip-rule="evenodd"/>
                                                    <path fill-rule="evenodd" d="M8 17.2h.1l2.1-2.2H15a3 3 0 0 0 3-3V8h2c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1h-1v2a1 1 0 0 1-1.7.7L14.6 18H9a1 1 0 0 1-1-.8Z" clip-rule="evenodd"/>
                                                </svg>
                                                <span>Start Chat</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <ChatSingle v-if="auth?.user?.id" :chathideshow="chathideshow" :toUser="toUser" :getmessage="getmessage" @chathide="chathideFun($event)" @loadmoremsgid="loadMoreMsgFun($event)"></ChatSingle>
    
        <div id="start-chat-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="start-chat-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-4 md:p-5 text-center">
                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Please Login First ! Try agian.</h3>
                        <button data-modal-hide="start-chat-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>