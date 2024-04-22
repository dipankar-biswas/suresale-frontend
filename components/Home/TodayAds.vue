
<script setup>

// Bookmark
// const bookmarkAdd = async(id,index) => {
//     const token = useTokenStore();
//     try{
//         const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${id}`, {
//                     method: 'PUT',
//                     headers: {
//                         Accept: "application/json",
//                         Authorization: `Bearer ${token.getToken}`,
//                     },
//                 });
//         if(data){
//             regularAds.value[index].is_bookmarked = 1;
//         }
//     }catch(error){
//         console.log(error);
//     }
// }

// const bookmarkRemove = async(id,index) => {
//     const token = useTokenStore();
//     try{
//         const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${id}`, {
//                     method: 'DELETE',
//                     headers: {
//                         Accept: "application/json",
//                         Authorization: `Bearer ${token.getToken}`,
//                     },
//                 });
//         if(data){
//             regularAds.value[index].is_bookmarked = 0;
//         }
//     }catch(error){
//         console.log(error);
//     }
// }
</script>
<template>
    <div class="mx-auto w-full max-w-screen-2xl px-4 py-2">
        <div class="bg-white">
            <div class="title flex justify-between items-center gap-3 px-3 py-3 border-b-2 mb-4">
                <h4 class="text-xl font-semibold">Todays Ads</h4>
            </div>
            <div class="flex flex-cols-1  lg:flex-cols-2 gap-x-5 gap-y-5 h-full">
                <div class="adses basis-9/12 rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5">
                    <AdsItem>
                        <h5 class="mb-2 text-lg font-samibold tracking-tight text-gray-900 dark:text-white">
                            Technology acquisitions
                        </h5>
                        <div class="flex justify-between">
                            <p class="text-md">abul kasem, 08:22</p>
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"/>
                            </svg>
                        </div>
                    </AdsItem>
                    <AdsItem>
                        <h5 class="mb-2 text-lg font-samibold tracking-tight text-gray-900 dark:text-white">
                            Technology acquisitions
                        </h5>
                        <div class="flex justify-between">
                            <p class="text-md">abul kasem, 08:22</p>
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"/>
                            </svg>
                        </div>
                    </AdsItem>
                    <AdsItem>
                        <h5 class="mb-2 text-lg font-samibold tracking-tight text-gray-900 dark:text-white">
                            Technology acquisitions
                        </h5>
                        <div class="flex justify-between">
                            <p class="text-md">abul kasem, 08:22</p>
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"/>
                            </svg>
                        </div>
                    </AdsItem>
                </div>
                <div class="ads-banner basis-3/12">
                    <img class="rounded-lg  h-full" src="assets/images/slider/slider-1.webp" alt="Ads" />
                </div>
            </div>
        </div>
    </div>
</template>