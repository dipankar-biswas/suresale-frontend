<script setup>
    useSeoMeta({
        title: 'My Products - My Amazing Site',
        ogTitle: 'My Amazing Site',
        description: 'This is my amazing site, let me tell you all about it.',
        ogDescription: 'This is my amazing site, let me tell you all about it.',
        ogImage: 'image',
        twitterCard: 'image',
    })
    const auth = useAuthStore();
    const route = useRoute();
    const datetime = useDateTime();
    const common = useCommonFun();
    const listgrid = ref(2);

    const follower = ref(0);
    const followersData = ref([]);
    const followers = async() => {
        refreshNuxtData();
        const token = useTokenStore();
        try{
            const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/followers`, {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token.getToken}`,
                        },
                    });
            followersData.value = data.value.data;
            follower.value = followersData.value.length;
        }catch(error){
            console.log(error);
        }
    }
    followers();

    const following = ref(false);
    const followingsData = ref([]);
    const followings = async() => {
        refreshNuxtData();
        const token = useTokenStore();
        try{
            const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/followings`, {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token.getToken}`,
                        },
                    });
            followingsData.value = data.value.data;
            following.value = followingsData.value.find(item => item?.pivot?.follower_id === auth.user.id).id > 0 ? true : false;
        }catch(error){
            console.log(error);
        }
    }
    followings();

    const follow = async() => {
        const token = useTokenStore();
        try{
            const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/followers`, {
                        method: 'POST',
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token.getToken}`,
                        },
                        body: {
                            to:route.params.id
                        }
                    });
            console.log(data);
            following.value = true;
        }catch(error){
            console.log(error);
        }
    }

    const unfollow = async() => {
        const token = useTokenStore();
        try{
            const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/followers?to=${route.params.id}`, {
                        method: 'DELETE',
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token.getToken}`,
                        },
                    });
                    console.log(data);
                    following.value = false;
        }catch(error){
            console.log(error);
        }
    }



    const allAds = ref([]);
    const allAdsList = ref([]);
    const AllAds = async() => {
        refreshNuxtData();
        const token = useTokenStore();
        try{
            const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/profile/${route.params.id}`,{
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token.getToken}`,
                },
            });
            allAds.value = data.value;
            allAdsList.value = data.value?.product?.data;
        }catch(error){
            console.log('Somthing Wrong!');
        }
    }
    AllAds();


    const loadbtn = ref(false);
    const page = ref(1); 
    const loadMoreBtn = async() => {
        loadbtn.value = true;
        page.value++;
        try{
            const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}?page=${page.value}`);
            allAds.value.push(...data.value.data);
            loadbtn.value = false;
        }catch(error){
            console.log('Somthing Wrong!');
            loadbtn.value = false;
        }
    }


    
    // Bookmark
    const bookmarkAdd = async(id,index) => {
        const token = useTokenStore();
        try{
            const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${id}`, {
                        method: 'PUT',
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token.getToken}`,
                        },
                    });
            if(data){
                allAdsList.value[index].is_bookmarked = 1;
            }
        }catch(error){
            console.log('Somthing Wrong!');
        }
    }

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
            if(data){
                allAdsList.value[index].is_bookmarked = 0;
            }
        }catch(error){
            console.log('Somthing Wrong!');
        }
    }
</script>
<template>    
    <div class="content">
        <div class="max-w-screen-2xl flex gap-x-4 h-full mx-auto px-4 py-9">
            <div class="w-full">
                
                <div class="group relative">
                    <div class="absolute w-full h-64 bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <button data-tooltip-target="download-image" class="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
                            <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z" clip-rule="evenodd"/>
                                <path fill-rule="evenodd" d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                        <div id="download-image" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Banner image Change
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    </div>
                    <img src="/assets/images/slider/slider-1.webp" class="w-full h-64 rounded-lg" />
                </div>
                
                <div class="mx-auto w-full bg-whiterounded-lg dark:bg-gray-800">
                    <div class="flex">
                        <div class="w-1/4"></div>
                        <div class="w-2/4 flex flex-col items-center pb-10 -mt-14">
                            <div class="border-2 bg-white border-gray-300 rounded-full shadow-lg mb-3 relative z-10">
                                <img class="w-28 h-28 rounded-full p-1" v-if="allAds?.profile_picture" :src="useRuntimeConfig().public.imageUrl+allAds?.profile_picture" alt="Bonnie image"/>
                                <img class="w-28 h-28 rounded-full p-1" v-else src="/assets/images/avatar.png" alt="Bonnie image"/>
                            </div>
                            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ allAds?.name }}</h5>
                            <span class="text-sm text-gray-500 dark:text-gray-400 mb-2">Visual Designer</span>
                            <span class="text-sm font-semibold dark:text-gray-400">{{ follower }} Followers</span>
                        </div>
                        <div class="w-1/4 mt-4">
                            <div class="flex" v-if="auth.user.id">
                                <button type="button" v-if="following == false" @click="follow()" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Follow</button>
                                <button type="button" v-else @click="unfollow()" class="text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Unfollow</button>
                                <button type="button" class="inline-flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    <div class="flex items-center gap-x-1">
                                        <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z"/>
                                        </svg>
                                        <span>Contact Seller</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="bg-gray-100 rounded-md px-4 py-5">
                    <div class="flex justify-between">
                        <h4 class="text-lg font-semibold mb-3">All Products ({{ allAds?.product?.total }})</h4>
                        <div class="actions flex items-center">
                            <button type="button" class="list p-1 rounded-s-md bg-gray-400 [&.active]:bg-gray-600" @click="listgrid = 2" :class="{ 'active' : listgrid == 2 }">
                                <svg class="w-6 h-6 text-gray-800 [&.active]:text-white dark:text-white" :class="{ 'active' : listgrid == 2 }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M4.9 3C3.9 3 3 3.8 3 4.9V9c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V9c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9h-4Zm-10 10c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9h-4Z" clip-rule="evenodd"/>
                                </svg>
                            </button>
                            <button type="button" class="grid p-1 rounded-e-md bg-gray-400 [&.active]:bg-gray-600" @click="listgrid = 1" :class="{ 'active' : listgrid == 1 }">
                                <svg class="w-6 h-6 text-gray-800 [&.active]:text-white dark:text-white" :class="{ 'active' : listgrid == 1 }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 8h10M9 12h10M9 16h10M5 8h0m0 4h0m0 4h0"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
                    <div v-if="allAdsList?.length > 0" class="adses rounded grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5" :class="[ listgrid == 2 ? 'grid' : 'flex flex-col' ]">
                        <div v-for="(ads,index) in allAdsList" :key="ads.id" class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" :class="[ listgrid == 2 ? '' : 'flex' ]">
                            <div class="relative">
                                <nuxt-link :to="`/ads-details/${ads.id}`">
                                    <img class="rounded-t-lg w-full h-48 object-cover" :class="[ listgrid == 1 ? 'w-72 rounded-s-md' : 'w-full rounded-t-md' ]" v-if="ads.picture != ''" :src="useRuntimeConfig().public.imageUrl+'/'+ads?.picture[0]?.replaceAll('public','storage')" alt="Ads" />
                                    <img class="rounded-t-lg w-full h-48 object-cover" :class="[ listgrid == 1 ? 'w-72 rounded-s-md' : 'w-full rounded-t-md' ]" v-else src="assets/images/dummy-image.jpg" alt="Ads" />
                                </nuxt-link>
                            </div>
                            <div class="px-5 py-3" :class="[ listgrid == 1 ? 'w-[calc(100% - 18rem)]' : 'w-full' ]">
                                <div class="flex justify-between">
                                    <div class="left flex gap-x-3">
                                        <h3 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ ads.currency?.symbol }}{{ ads.price }}</h3>
                                        <h5 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">$11,300.00</h5>
                                    </div>
                                    <div class="right">
                                        <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Premium</span>
                                    </div>
                                </div>
                                <h4 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                    <nuxt-link :to="`/ads-details/${ads?.id}`">
                                        {{ ads.title }}
                                    </nuxt-link>
                                </h4>
                                <h5 class="mb-2 text-lg font-samibold tracking-tight text-gray-900 dark:text-white">
                                    {{ common.parseText(ads.description,80) }}
                                </h5>
                                <div class="flex justify-between">
                                    <p class="text-sm">
                                        {{ datetime.formatCompat(ads.created_at) }}
                                    </p>
                                    <div v-if="auth?.user?.id != ads?.user_id">
                                        <svg v-if="ads?.is_bookmarked == 1" @click="bookmarkRemove(ads?.id,index)" class="w-6 h-6 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"/>
                                        </svg>
                                        <svg v-else @click="bookmarkAdd(ads?.id,index)" class="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
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

</template>