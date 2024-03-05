<script setup>
const route = useRoute();
const datetime = useDateTime();
const common = useCommonFun();

const categoryDatas = ref([]);
const queryParams = new URLSearchParams({ category: route.params?.slug.replaceAll('-',' ') });
const getSearchData = async() => {
    refreshNuxtData();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/search?${queryParams}`);
        categoryDatas.value = data.value.data;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
getSearchData();


const loadbtn = ref(false);
const page = ref(1);
const loadMoreBtn = async() => {
    loadbtn.value = true;
    page.value++;
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}?page=${page.value}`);
        categoryDatas.value.push(...data.value.data);
        loadbtn.value = false;
    }catch(error){
        console.log('Somthing Wrong!');
        loadbtn.value = false;
    }
}
</script>
<template>
    <div class="content">
        <div class="max-w-screen-2xl block lg:flex justify-between gap-x-4 h-full mx-auto px-4">
          
            <aside id="sidebar-multi-level-sidebar" class="fixed top-0 left-0 z-40 lg:z-0 w-64 h-screen lg:relative lg:h-auto transition-transform -translate-x-full md:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-6 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-b-sm">
                    <div class="s-categories mb-8">
                        <h4 class="text-lg font-medium mb-4">Categories</h4>
                        <ul class="space-y-2 font-medium">
                            <li>
                                <a href="#" class="flex items-center px-2 py-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg class="w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                    </svg>
                                    <span class="ms-3">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="flex items-center px-2 py-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg class="flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                                    </svg>
                                    <span class="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="flex items-center px-2 py-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg class="flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="flex items-center px-2 py-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg class="flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                                    </svg>
                                    <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="flex items-center px-2 py-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg class="flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                    </svg>
                                    <span class="flex-1 ms-3 whitespace-nowrap">Products</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="flex items-center px-2 py-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg class="flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                                    </svg>
                                    <span class="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="flex items-center px-2 py-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg class="flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                                        <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                                        <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                                    </svg>
                                    <span class="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="s-browse-market">
                        <h4 class="text-lg font-medium mb-4">Filters</h4>

                        <h4 class="text-md font-medium mb-3 ps-5">Brand</h4>
                        <ul class="space-y-2 font-normal ps-6">
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Apple</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Ausu</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Dell</label>
                                </div>
                            </li>
                        </ul>
                        <h4 class="text-md font-medium mb-3 mt-5 ps-5">Condition</h4>
                        <ul class="space-y-2 font-normal ps-6">
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">New</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Good</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Fair</label>
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

            <div class="lg:w-[calc(100%-16rem)]">
                <div class="py-6">
                    <nav class="flex" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li class="inline-flex items-center">
                                <a href="#" class="inline-flex items-center text-xs font-normal text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                    <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                    </svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <div class="flex items-center">
                                    <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <a href="#" class="ms-1 text-xs font-normal text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Projects</a>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div class="flex items-center">
                                    <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <span class="ms-1 text-xs font-normal text-gray-500 md:ms-2 dark:text-gray-400">Flowbite</span>
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
                    
                    <!-- Categories -->
                    <div class="mx-auto w-full max-w-screen-2xl px-4">
                        <div class="bg-white">
                            <div class="title flex items-center gap-3 px-3 py-3 border-b-2 mb-4">
                                <h4 class="text-xl font-semibold">Shop by Categories</h4>
                            </div>
                            <div class="cat rounded grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-2">
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
                                <a href="#" class="py-2.5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Search Item</a>
                                <a href="#" class="py-2.5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Search Item</a>
                            </div>
                        </div>
                    </div>
                

                    <!-- Ads -->
                    <div class="mx-auto w-full max-w-screen-2xl px-4 py-2">
                        <div class="bg-white">
                            <div class="flex flex-cols-1  lg:flex-cols-2 gap-x-5 gap-y-5 h-full">
                                <div v-if="categoryDatas" class="adses rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5">
                                    <AdsItem v-for="(ads,index) in categoryDatas" :key="index" :adsItem="ads">
                                        <h5 class="mb-2 text-lg font-samibold tracking-tight text-gray-900 dark:text-white">
                                            {{ common.parseText(ads.description,80) }}
                                        </h5>
                                        <div class="flex justify-between">
                                            <p class="text-sm">
                                                <nuxt-link :to="`/${ads?.user?.name.replaceAll(' ','-')}/${ads?.user?.id}/products`">{{ ads?.user?.name }}</nuxt-link>, {{ datetime.formatCompat(ads.created_at) }}
                                            </p>
                                            <svg class="w-6 h-6 text-gray-800 dark:text-white hover:text-green-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"/>
                                            </svg>
                                        </div>
                                    </AdsItem>
                                </div>
                            </div>


                            <div class="flex justify-center mt-8">
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
    
    <!-- Banner -->
    <div class="mx-auto w-full max-w-screen-2xl p-4 py-2">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4">
            <div class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="relative h-full">
                    <a href="#">
                        <img class="rounded-lg  h-full" src="assets/images/slider/slider-1.webp" alt="Ads" />
                    </a>
                    <div class="text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-lg px-2 absolute left-0 top-0 w-full h-full backdrop-brightness-90">
                        <div class="text-center p-3 flex flex-col justify-end h-full">
                            <p class="text-white text-lg">Grow business with us</p>
                            <h3 class="text-white text-2xl">Business Plans</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex flex-col gap-y-3">
                    <div class="relative h-full">
                        <a href="#">
                            <img class="rounded-lg  h-full" src="assets/images/slider/slider-1.webp" alt="Ads" />
                        </a>
                        <div class="text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-lg px-2 absolute left-0 top-0 w-full h-full backdrop-brightness-90">
                            <div class="text-center p-3 flex flex-col justify-end h-full">
                                <p class="text-white text-lg">Grow business with us</p>
                                <h3 class="text-white text-2xl">Business Plans</h3>
                            </div>
                        </div>
                    </div>
                    <div class="relative h-full">
                        <a href="#">
                            <img class="rounded-lg  h-full" src="assets/images/slider/slider-1.webp" alt="Ads" />
                        </a>
                        <div class="text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-lg px-2 absolute left-0 top-0 w-full h-full backdrop-brightness-90">
                            <div class="text-center p-3 flex flex-col justify-end h-full">
                                <p class="text-white text-lg">Grow business with us</p>
                                <h3 class="text-white text-2xl">Business Plans</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="relative h-full">
                    <a href="#">
                        <img class="rounded-lg  h-full" src="assets/images/slider/slider-1.webp" alt="Ads" />
                    </a>
                    <div class="text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-lg px-2 absolute left-0 top-0 w-full h-full backdrop-brightness-90">
                        <div class="text-center p-3 flex flex-col justify-end h-full">
                            <p class="text-white text-lg">Grow business with us</p>
                            <h3 class="text-white text-2xl">Business Plans</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex flex-col gap-y-3">
                    <div class="relative h-full">
                        <a href="#">
                            <img class="rounded-lg  h-full" src="assets/images/slider/slider-1.webp" alt="Ads" />
                        </a>
                        <div class="text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-lg px-2 absolute left-0 top-0 w-full h-full backdrop-brightness-90">
                            <div class="text-center p-3 flex flex-col justify-end h-full">
                                <p class="text-white text-lg">Grow business with us</p>
                                <h3 class="text-white text-2xl">Business Plans</h3>
                            </div>
                        </div>
                    </div>
                    <div class="relative h-full">
                        <a href="#">
                            <img class="rounded-lg  h-full" src="assets/images/slider/slider-1.webp" alt="Ads" />
                        </a>
                        <div class="text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-lg px-2 absolute left-0 top-0 w-full h-full backdrop-brightness-90">
                            <div class="text-center p-3 flex flex-col justify-end h-full">
                                <p class="text-white text-lg text-shadow-lg shadow-black">Grow business with us</p>
                                <h3 class="text-white text-2xl text-shadow-lg shadow-black">Business Plans</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
