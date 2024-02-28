<script setup>
const common = useCommonFun();


const categories = ref([]);
const getCetagories = async() => {
    refreshNuxtData();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories`);
        categories.value = data.value.categories;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
getCetagories();

</script>
<template>
    <div class="mx-auto w-full max-w-screen-2xl px-4 py-2">
        <div class="bg-white">
            <div class="title flex items-center gap-3 px-3 py-3 border-b-2 mb-4">
                <h4 class="text-xl font-semibold">Categories</h4>
                <h5>See All</h5>
            </div>
            <div class="categories rounded grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9 gap-x-3 gap-y-5">
                <div class="category" v-for="cat in categories" :key="cat.id">
                    <nuxt-link :to="`/category/${cat.id}`" class="flex flex-col items-center">
                        <div class="image bg-zinc-300 rounded-full w-16 h-16 flex justify-center items-center">
                            <img src="assets/images/categories/thumb-sub-cat-tops.webp" alt="Product Title" class="w-12">
                        </div>
                        <h4 class="title font-semibold">{{ cat.name }}</h4>
                        <p class="text-gray-400 text-sm">{{ cat.product_count }} ads</p>
                    </nuxt-link>
                </div>

                <!-- <div class="category">
                    <a href="#" class="flex flex-col items-center">
                        <div class="image bg-zinc-300 rounded-full w-16 h-16 flex justify-center items-center">
                            <img src="assets/images/categories/thumb-sub-cat-dresses.webp" alt="Product Title" class="w-12">
                        </div>
                        <h4 class="title font-semibold">Dresses</h4>
                        <p class="text-gray-400 text-sm">23,444 ads</p>
                    </a>
                </div>
                <div class="category">
                    <a href="#" class="flex flex-col items-center">
                        <div class="image bg-zinc-300 rounded-full w-16 h-16 flex justify-center items-center">
                            <img src="assets/images/categories/thumb-sub-cat-sling-bags.webp" alt="Product Title" class="w-12">
                        </div>
                        <h4 class="title font-semibold">Sling Bags</h4>
                        <p class="text-gray-400 text-sm">23,444 ads</p>
                    </a>
                </div>
                <div class="category">
                    <a href="#" class="flex flex-col items-center">
                        <div class="image bg-zinc-300 rounded-full w-16 h-16 flex justify-center items-center">
                            <img src="assets/images/categories/thumb-sub-cat-socks-tights.webp" alt="Product Title" class="w-12">
                        </div>
                        <h4 class="title font-semibold">Socks Tights</h4>
                        <p class="text-gray-400 text-sm">23,444 ads</p>
                    </a>
                </div>
                <div class="category">
                    <a href="#" class="flex flex-col items-center">
                        <div class="image bg-zinc-300 rounded-full w-16 h-16 flex justify-center items-center">
                            <img src="assets/images/categories/thumb-sub-cat-clutches-mini-bags.webp" alt="Product Title" class="w-12">
                        </div>
                        <h4 class="title font-semibold">Clutches Mini Bags</h4>
                        <p class="text-gray-400 text-sm">23,444 ads</p>
                    </a>
                </div>
                <div class="category">
                    <a href="#" class="flex flex-col items-center">
                        <div class="image bg-zinc-300 rounded-full w-16 h-16 flex justify-center items-center">
                            <img src="assets/images/categories/thumb-sub-cat-handbags.webp" alt="Product Title" class="w-12">
                        </div>
                        <h4 class="title font-semibold">Handbags</h4>
                        <p class="text-gray-400 text-sm">23,444 ads</p>
                    </a>
                </div>
                <div class="category">
                    <a href="#" class="flex flex-col items-center">
                        <div class="image bg-zinc-300 rounded-full w-16 h-16 flex justify-center items-center">
                            <img src="assets/images/categories/thumb-sub-cat-pants-leggings.webp" alt="Product Title" class="w-12">
                        </div>
                        <h4 class="title font-semibold">Pants Leggings</h4>
                        <p class="text-gray-400 text-sm">23,444 ads</p>
                    </a>
                </div>
                <div class="category">
                    <a href="#" class="flex flex-col items-center">
                        <div class="image bg-zinc-300 rounded-full w-16 h-16 flex justify-center items-center">
                            <img src="assets/images/categories/thumb-sub-cat-hats-caps.webp" alt="Product Title" class="w-12">
                        </div>
                        <h4 class="title font-semibold">Hats Caps</h4>
                        <p class="text-gray-400 text-sm">23,444 ads</p>
                    </a>
                </div>
                <div class="category">
                    <a href="#" class="flex flex-col items-center">
                        <div class="image bg-zinc-300 rounded-full w-16 h-16 flex justify-center items-center">
                            <img src="assets/images/categories/thumb-sub-cat-pants.webp" alt="Product Title" class="w-12">
                        </div>
                        <h4 class="title font-semibold">Pants</h4>
                        <p class="text-gray-400 text-sm">23,444 ads</p>
                    </a>
                </div> -->
            </div>
        </div>
    </div>
</template>