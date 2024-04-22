<script setup>
const props = defineProps(['adsItem']);
const auth = useAuthStore();
const datetime = useDateTime();
const common = useCommonFun();
const toaster = useToasterStore();



// Bookmark
const bookmarkAdd = async(product) => {
    const token = useTokenStore();
    try{
        const { data, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${product?.id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                });
        if (error.value?.data?.message === 'Unauthenticated.') {
            token.removeToken();
        } 
        if(data){
            product.is_bookmarked = 1;
            toaster.addSuccess(data.value.message);
        }
    }catch(error){
        console.log(error);
        toaster.addWrong(error.data?.message);
    }
}

const bookmarkRemove = async(product) => {
    const token = useTokenStore();
    try{
        const { data, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${product?.id}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                });
        if (error.value?.data?.message === 'Unauthenticated.') {
            token.removeToken();
        }
        if(data){
            product.is_bookmarked = 0;
            toaster.addSuccess(data.value.message);
        }
    }catch(error){
        console.log(error);
        toaster.addWrong(error.data?.message);
    }
}
</script>

<template>
    <div v-if="props.adsItem" class="max-w-full bg-white border border-gray-200 rounded-lg shadow ease-in-out duration-300 hover:shadow-lg hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
        <div class="relative">
            <nuxt-link :to="`/ads-details/${props.adsItem?.category?.slug}/${common.convertToSlug(props.adsItem?.title)}/${props.adsItem?.id}`">
                <img class="rounded-t-lg w-full h-48 object-cover" v-if="props.adsItem?.picture != ''" :src="useRuntimeConfig().public.imageUrl+'/'+props.adsItem?.picture[0].replaceAll('public','storage')" alt="Ads" />
                <img class="rounded-t-lg w-full h-48 object-cover" v-else src="assets/images/dummy-image.jpg" alt="Ads" />
            </nuxt-link>
            <!-- <span class="bg-blue-200 text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-blue-900 dark:text-blue-200 absolute bottom-0 right-0">4</span> -->
        </div>
        <div class="p-5">
            <div class="flex justify-between">
                <div class="left flex gap-x-3">
                    <h3 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ props.adsItem?.currency?.symbol }} {{ common.formatPrice(props.adsItem?.price) }}</h3>
                    <!-- <h5 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">$11,300.00</h5> -->
                </div>
                <!-- <div class="right">
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Premium</span>
                </div> -->
            </div>
            <h4 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                <nuxt-link :to="`/ads-details/${props.adsItem?.category?.slug}/${common.convertToSlug(props.adsItem?.title)}/${props.adsItem?.id}`">
                    {{ props.adsItem?.title }}
                </nuxt-link>
            </h4>
            <h5 class="mb-2 text-sm font-samibold tracking-tight text-gray-500 dark:text-white">
                {{ common.parseText(props.adsItem?.location,60) }}
            </h5>
            

            <div class="flex justify-between">
                <p class="text-sm">
                    <nuxt-link :to="`/${props.adsItem?.user?.name.replaceAll(' ','-')}/${props.adsItem?.user?.id}/products`">{{ props.adsItem?.user?.name }}</nuxt-link>, {{ datetime.formatCompat(props.adsItem?.created_at) }}
                </p>
                <div v-if="auth?.user?.id != props.adsItem?.user_id">
                    <svg v-if="props.adsItem?.is_bookmarked == 1" @click="bookmarkRemove(props.adsItem)" class="w-6 h-6 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"/>
                    </svg>
                    <svg v-else @click="bookmarkAdd(props.adsItem)" class="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>