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
    title: 'Products listing - My Amazing Site',
    ogTitle: 'My Amazing Site',
    description: 'This is my amazing site, let me tell you all about it.',
    ogDescription: 'This is my amazing site, let me tell you all about it.',
    ogImage: 'image',
    twitterCard: 'image',
})
const listgrid = ref(1);
</script>
<template>    
    <div class="content">
        <div class="max-w-screen-2xl flex gap-x-4 h-full mx-auto px-4 py-9">
            
            <UserSidebar></UserSidebar>

            <div class="w-[calc(100%-basis-72)] w-full">
                <div class="mx-auto w-full max-w-screen-2xl">
                    <div class="bg-gray-100 rounded-md px-4 py-5">
                        <div class="flex justify-between">
                            <h4 class="text-lg font-semibold mb-3">Your Listing</h4>
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
                            <div class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" :class="[ listgrid == 2 ? '' : 'flex' ]">
                                <div class="relative">
                                    <nuxt-link to="/ads-details">
                                        <img class="h-48" :class="[ listgrid == 1 ? 'w-72 rounded-s-md' : 'w-full rounded-t-md' ]" src="assets/images/slider/slider-1.webp" alt="Ads" />
                                    </nuxt-link>
                                </div>
                                <div class="px-5 py-3" :class="[ listgrid == 1 ? 'w-[calc(100% - 18rem)]' : 'w-full' ]">
                                    <h4 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                                        <nuxt-link to="/ads-details">
                                            Noteworthy technology acquisitions 2021
                                        </nuxt-link>
                                    </h4>
                                    <div class="left flex gap-x-3">
                                        <h3 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">$11,300.00</h3>
                                        <h5 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">$11,300.00</h5>
                                    </div>
                                    <p class="text-md">Solid-Listed on 12 Dec 2023</p>
                                    <div class="actions mt-3">
                                        <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12 4.7 4.5 9.3-9"/>
                                                </svg>
                                                <span>Mark as Available</span>
                                            </div>
                                        </button>
                                        <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4"/>
                                                </svg>
                                                <span>Relist this Ttem</span>
                                            </div>
                                        </button>
                                        <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.5 3A3.5 3.5 0 0 0 14 7L8.1 9.8A3.5 3.5 0 0 0 2 12a3.5 3.5 0 0 0 6.1 2.3l6 2.7-.1.5a3.5 3.5 0 1 0 1-2.3l-6-2.7a3.5 3.5 0 0 0 0-1L15 9a3.5 3.5 0 0 0 6-2.4c0-2-1.6-3.5-3.5-3.5Z"/>
                                                </svg>
                                                <span>Share</span>
                                            </div>
                                        </button>
                                        <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 12h0m6 0h0m6 0h0"/>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" :class="[ listgrid == 2 ? '' : 'flex' ]">
                                <div class="relative">
                                    <nuxt-link to="/ads-details">
                                        <img class="h-48" :class="[ listgrid == 1 ? 'w-72 rounded-s-md' : 'w-full rounded-t-md' ]" src="assets/images/slider/slider-1.webp" alt="Ads" />
                                    </nuxt-link>
                                </div>
                                <div class="px-5 py-3" :class="[ listgrid == 1 ? 'w-[calc(100% - 18rem)]' : 'w-full' ]">
                                    <h4 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                                        <nuxt-link to="/ads-details">
                                            Noteworthy technology acquisitions 2021
                                        </nuxt-link>
                                    </h4>
                                    <div class="left flex gap-x-3">
                                        <h3 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">$11,300.00</h3>
                                        <h5 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">$11,300.00</h5>
                                    </div>
                                    <p class="text-md">Solid-Listed on 12 Dec 2023</p>
                                    <div class="actions mt-3">
                                        <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12 4.7 4.5 9.3-9"/>
                                                </svg>
                                                <span>Mark as Available</span>
                                            </div>
                                        </button>
                                        <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4"/>
                                                </svg>
                                                <span>Relist this Ttem</span>
                                            </div>
                                        </button>
                                        <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.5 3A3.5 3.5 0 0 0 14 7L8.1 9.8A3.5 3.5 0 0 0 2 12a3.5 3.5 0 0 0 6.1 2.3l6 2.7-.1.5a3.5 3.5 0 1 0 1-2.3l-6-2.7a3.5 3.5 0 0 0 0-1L15 9a3.5 3.5 0 0 0 6-2.4c0-2-1.6-3.5-3.5-3.5Z"/>
                                                </svg>
                                                <span>Share</span>
                                            </div>
                                        </button>
                                        <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 12h0m6 0h0m6 0h0"/>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" :class="[ listgrid == 2 ? '' : 'flex' ]">
                                <div class="relative">
                                    <nuxt-link to="/ads-details">
                                        <img class="h-48" :class="[ listgrid == 1 ? 'w-72 rounded-s-md' : 'w-full rounded-t-md' ]" src="assets/images/slider/slider-1.webp" alt="Ads" />
                                    </nuxt-link>
                                </div>
                                <div class="px-5 py-3" :class="[ listgrid == 1 ? 'w-[calc(100% - 18rem)]' : 'w-full' ]">
                                    <h4 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                                        <nuxt-link to="/ads-details">
                                            Noteworthy technology acquisitions 2021
                                        </nuxt-link>
                                    </h4>
                                    <div class="left flex gap-x-3">
                                        <h3 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">$11,300.00</h3>
                                        <h5 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">$11,300.00</h5>
                                    </div>
                                    <p class="text-md">Solid-Listed on 12 Dec 2023</p>
                                    <div class="actions mt-3">
                                        <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12 4.7 4.5 9.3-9"/>
                                                </svg>
                                                <span>Mark as Available</span>
                                            </div>
                                        </button>
                                        <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4"/>
                                                </svg>
                                                <span>Relist this Ttem</span>
                                            </div>
                                        </button>
                                        <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.5 3A3.5 3.5 0 0 0 14 7L8.1 9.8A3.5 3.5 0 0 0 2 12a3.5 3.5 0 0 0 6.1 2.3l6 2.7-.1.5a3.5 3.5 0 1 0 1-2.3l-6-2.7a3.5 3.5 0 0 0 0-1L15 9a3.5 3.5 0 0 0 6-2.4c0-2-1.6-3.5-3.5-3.5Z"/>
                                                </svg>
                                                <span>Share</span>
                                            </div>
                                        </button>
                                        <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 12h0m6 0h0m6 0h0"/>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" :class="[ listgrid == 2 ? '' : 'flex' ]">
                                <div class="relative">
                                    <nuxt-link to="/ads-details">
                                        <img class="h-48" :class="[ listgrid == 1 ? 'w-72 rounded-s-md' : 'w-full rounded-t-md' ]" src="assets/images/slider/slider-1.webp" alt="Ads" />
                                    </nuxt-link>
                                </div>
                                <div class="px-5 py-3" :class="[ listgrid == 1 ? 'w-[calc(100% - 18rem)]' : 'w-full' ]">
                                    <h4 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                                        <nuxt-link to="/ads-details">
                                            Noteworthy technology acquisitions 2021
                                        </nuxt-link>
                                    </h4>
                                    <div class="left flex gap-x-3">
                                        <h3 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">$11,300.00</h3>
                                        <h5 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">$11,300.00</h5>
                                    </div>
                                    <p class="text-md">Solid-Listed on 12 Dec 2023</p>
                                    <div class="actions mt-3">
                                        <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12 4.7 4.5 9.3-9"/>
                                                </svg>
                                                <span>Mark as Available</span>
                                            </div>
                                        </button>
                                        <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.7 7.7A7.1 7.1 0 0 0 5 10.8M18 4v4h-4m-7.7 8.3A7.1 7.1 0 0 0 19 13.2M6 20v-4h4"/>
                                                </svg>
                                                <span>Relist this Ttem</span>
                                            </div>
                                        </button>
                                        <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.5 3A3.5 3.5 0 0 0 14 7L8.1 9.8A3.5 3.5 0 0 0 2 12a3.5 3.5 0 0 0 6.1 2.3l6 2.7-.1.5a3.5 3.5 0 1 0 1-2.3l-6-2.7a3.5 3.5 0 0 0 0-1L15 9a3.5 3.5 0 0 0 6-2.4c0-2-1.6-3.5-3.5-3.5Z"/>
                                                </svg>
                                                <span>Share</span>
                                            </div>
                                        </button>
                                        <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2">
                                            <div class="flex items-center gap-x-1">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 12h0m6 0h0m6 0h0"/>
                                                </svg>
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
    </div>

</template>