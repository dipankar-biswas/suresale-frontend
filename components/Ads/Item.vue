<script setup>
const props = defineProps(['adsItem'])
</script>

<template>
    <div v-if="props.adsItem" class="max-w-full bg-white border border-gray-200 rounded-lg shadow ease-in-out duration-300 hover:shadow-lg hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
        <div class="relative">
            <nuxt-link :to="`/ads-details/${props.adsItem?.id}`">
                <img class="rounded-t-lg w-full h-48 object-cover" v-if="props.adsItem?.picture != ''" :src="useRuntimeConfig().public.imageUrl+'/'+props.adsItem?.picture[0].replaceAll('public','storage')" alt="Ads" />
                <img class="rounded-t-lg w-full h-48 object-cover" v-else src="assets/images/dummy-image.jpg" alt="Ads" />
            </nuxt-link>
            <!-- <span class="bg-blue-200 text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-blue-900 dark:text-blue-200 absolute bottom-0 right-0">4</span> -->
        </div>
        <div class="p-5">
            <div class="flex justify-between">
                <div class="left flex gap-x-3">
                    <h3 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ props.adsItem?.currency?.symbol }}{{ props.adsItem?.price }}</h3>
                    <!-- <h5 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">$11,300.00</h5> -->
                </div>
                <!-- <div class="right">
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Premium</span>
                </div> -->
            </div>
            <h4 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                <nuxt-link :to="`/ads-details/${props.adsItem?.id}`">
                    {{ props.adsItem?.title }}
                </nuxt-link>
            </h4>
            <slot />
        </div>
    </div>
</template>