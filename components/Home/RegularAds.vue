<script setup>
const datetime = useDateTime();
const common = useCommonFun();


const regularAds = ref([]);
const RegularAds = async() => {
    refreshNuxtData();
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}`,{
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        regularAds.value = data.value.data;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
RegularAds();

const loadbtn = ref(false);
const page = ref(1);
const loadMoreBtn = async() => {
    loadbtn.value = true;
    page.value++;
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}?page=${page.value}`);
        regularAds.value.push(...data.value.data);
        loadbtn.value = false;
    }catch(error){
        console.log('Somthing Wrong!');
        loadbtn.value = false;
    }
}

const bookmarkAdd = async(id) => {
    console.log(id);
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                });
        console.log(data);
    }catch(error){
        console.log('Somthing Wrong!');
    }
}

const bookmarkRemove = async(id) => {
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                });
        console.log(data);
    }catch(error){
        console.log('Somthing Wrong!');
    }
}

</script>

<template>
    <!-- {{ datetime.DayTimeFormat('2024-02-22T06:59:20.000000Z') }}
    <br/>
    {{ datetime.timeSincePosted("2010-01-01T12:00:00.000Z") }} 
    <br/>
    {{ datetime.formatCompat("2010-01-01T12:00:00.000Z") }} 
    <br/>
    {{ datetime.TimeFormat("2024-02-22T06:59:20.000000Z") }} -->
    <div class="mx-auto w-full max-w-screen-2xl px-4 py-2">
        <div class="bg-white">
            <div class="title flex justify-between items-center gap-3 px-3 py-3 border-b-2 mb-4">
                <h4 class="text-xl font-semibold">Todays Ads</h4>
            </div>
            <div class="flex flex-cols-1 lg:flex-cols-2 gap-x-5 gap-y-5 h-full">
                <div v-if="regularAds" class="adses rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5">
                    
                    <AdsItem v-for="ads of regularAds" :key="ads.id" :adsItem="ads">
                        {{ ads.is_bookmarked }}
                        <h5 class="mb-2 text-lg font-samibold tracking-tight text-gray-900 dark:text-white">
                            {{ common.parseText(ads.description,80) }}
                        </h5>
                        <div class="flex justify-between">
                            <p class="text-sm">
                                <nuxt-link :to="`${ads?.user?.name.replaceAll(' ','-')}/${ads?.user?.id}/products`">{{ ads?.user?.name }}</nuxt-link>, {{ datetime.formatCompat(ads.created_at) }}
                            </p>
                            <svg @click="bookmarkAdd(ads.id)" class="w-6 h-6 text-gray-400 dark:text-white hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
</template>