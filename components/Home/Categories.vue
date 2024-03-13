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

const sliderDivWidht = document?.querySelector('.slider-width')?.offsetWidth;
const showNum = ref(1);
if(window?.innerWidth > 991){
    showNum.value = 7;
}else if(window?.innerWidth > 767){
    showNum.value = 4;
}else if(window?.innerWidth > 575){
    showNum.value = 3;
}else if(window?.innerWidth > 375){
    showNum.value = 2;
}
const gap = ref(10);
const currentIndex = ref(0);
const slideWidht = ref(parseFloat(sliderDivWidht) / parseFloat(showNum.value));
const gapbad = ref((gap.value * (showNum.value - 1)) /showNum.value);
const gapextplus = ref(gap.value - gapbad.value);

const divWidth = ref(sliderDivWidht);
const singleWidth = ref(parseFloat(slideWidht.value) - parseFloat(gapbad.value));

const next = () => {
    if (currentIndex.value < categories.value.length - showNum.value) {
        showSlide(currentIndex.value + 1);
    }
}

const prev = () => {
    if (currentIndex.value > 0) {
        showSlide(currentIndex.value - 1);
    }
}

function showSlide(index) {
    const sliderContent = document?.querySelector('#sliderContent');
    currentIndex.value = index;
    let translateValue = -index * (slideWidht.value + gapextplus.value);
    sliderContent.style.transform = 'translateX(' + translateValue + 'px)';
}


</script>
<template>
    <div class="slider mx-auto w-full max-w-screen-2xl px-4 py-2">
        <div class="title flex justify-between items-center gap-3 px-3 py-3 border-b-2 mb-4">
            <h4 class="text-xl font-semibold">Categories</h4>
            <h5>See All</h5>
        </div>
        <div class="relative">
            <div class="slider-container slider-width flex overflow-hidden" :style="`width: ${divWidth}px;`">
                <div v-if="singleWidth" class="slider-content flex" id="sliderContent" :style="`column-gap:${gap}px;transition: transform 0.5s ease-in-out;`">
                    <div v-for="(cat,index) in categories" :key="index" draggable class="slide h-44 overflow-hidden flex justify-center items-center text-center bg-gray-50" :style="`min-width: ${singleWidth}px;`">
                        <nuxt-link :to="`/category/${cat.id}`" class="flex flex-col items-center">
                            <div class="image bg-zinc-300 rounded-full w-16 h-16 flex justify-center items-center">
                                <img src="assets/images/categories/thumb-sub-cat-tops.webp" alt="Image" class="w-full h-full object-cover">
                            </div>
                            <h4 class="title font-semibold">{{ cat.name }}</h4>
                            <p class="text-gray-400 text-sm">{{ cat.product_count }} ads</p>
                        </nuxt-link>
                    </div>
                </div>
            </div>
    
            <div class="arrow" v-if="categories.length > showNum">
                <span @click="prev()" class="prev absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200/50 hover:bg-gray-200 cursor-pointer">
                    <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                    </svg>
                </span>
                <span @click="next()" class="prev absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200/50 hover:bg-gray-200 cursor-pointer">
                    <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>