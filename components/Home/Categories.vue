<script setup>
const common = useCommonFun();

// const totalcat = ref(0);
const categories = ref([
    {id: 2, name: 'Aircraft', slug: 'aircraft', image: 'storage/category/aircraft.svg', desc: null,},
    {id: 13, name: 'Cars', slug: 'cars', image: 'storage/category/cars.svg', desc: null,},
    {id: 14, name: 'Classic Cars', slug: 'classic-cars', image: 'storage/category/classic-cars.svg', desc: null, },
    {id: 293, name: 'Insurance', slug: 'insurance', image: 'storage/category/insurance.svg', desc: null, },
    {id: 16, name: 'Motorcycles', slug: 'motorcycles', image: 'storage/category/motorcycles.svg', desc: null, },
    {id: 298, name: 'Office Services', slug: 'office-services', image: 'storage/category/office-services.svg', desc: null, },
    {id: 278, name: 'Tickets', slug: 'tickets', image: 'storage/category/tickets.svg', desc: null, },
    {id: 20, name: 'Trucks', slug: 'trucks', image: 'storage/category/trucks.svg', desc: null, },
    {id: 31, name: 'for rent', slug: 'for-rent', image: 'storage/category/for-rent.svg', desc: null, },
    {id: 24, name: 'for sale', slug: 'for-sale', image: 'storage/category/for-sale.svg', desc: null,},
    {id: 0, name: 'All Categories', slug: 'all-categories', image: null, desc: null,},
]);
// const getCetagories = async() => {
//     refreshNuxtData();
//     try{
//         const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories`);
//         // totalcat.value = data.value?.categories;
//         console.log(data.value);
//         // categories.value = data.value?.categories?.data;
//         categories.value = data.value;
//     }catch(error){
//         console.log(error);
//     }
// }
// getCetagories();


const indexCount = ref(0);
const slides = ref(0);
const slidesLenght = ref(0);
const transition = ref(0.5);
const gap = ref(10);
const currentIndex = ref(0);
const showNum = ref(1);
const slideWidht = ref();
const gapbad = ref();
const gapextplus = ref();
const singleWidth = ref();
watch(() => categories.value, async (currentValue) => {
    if(currentValue?.length > 0){
    const sliderMainDiv = document?.querySelector('.slider-categories');
    const sliders = sliderMainDiv?.querySelector('.sliders');
    const sliderDivWidht = sliderMainDiv?.offsetWidth;
    if(window?.innerWidth > 991){
        showNum.value = 11;
    }else if(window?.innerWidth > 767){
        showNum.value = 7;
    }else if(window?.innerWidth > 575){
        showNum.value = 5;
    }else if(window?.innerWidth > 375){
        showNum.value = 3;
    }
    indexCount.value = indexCount.value + showNum.value;
    slideWidht.value = parseFloat(sliderDivWidht) / parseFloat(showNum.value);
    gapbad.value = (gap.value * (showNum.value - 1)) / showNum.value;
    gapextplus.value = gap.value - gapbad.value;

    singleWidth.value = parseFloat(slideWidht.value) - parseFloat(gapbad.value);
    setTimeout(() => {
        // Custom style
        sliders.style = `column-gap:${gap.value}px;transition: transform ${transition.value}s ease-in-out;`;
        slides.value = sliders?.querySelectorAll('.slide');
        slidesLenght.value = slides.value?.length;
        for (let el of slides.value) {
            el.style.minWidth= `${singleWidth.value}px`;
        }
    }, 500);
    }
  },
  {deep: true}
);

const next = () => {
        if (currentIndex.value < slidesLenght.value - showNum.value) {
        indexCount.value++;
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


const loadbtn = ref(false);
const page = ref(1);
const loadMoreCatBtn = async() => {
    let sliderData = document?.querySelector('.slider-categories .sliders');
    loadbtn.value = true;
    page.value++;
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories?page=${page.value}`);
        // categories.value.push(...data.value?.categories?.data);
        if(data){
            slidesLenght.value = slidesLenght.value + data.value?.categories?.data?.length;
            let newSlide = ''
            for(let i = 0; i<data.value?.categories?.data?.length; i++) {
                newSlide += `
                        <div draggable class="slide w-full h-44 flex justify-center items-center text-center" style="min-width:${singleWidth.value?.toFixed(3)}px;">
                            <nuxt-link :to="/category/${data.value?.categories?.data[i]?.id}" class="flex flex-col items-center rounded-md w-[calc(100%-6px)] h-[calc(100%-6px)] p-2 hover:scale-105 hover:bg-gray-100">
                                <div class="image bg-zinc-300 rounded-full w-16 h-16 flex justify-center items-center">
                                    <img src="" alt="Image" class="w-full h-full object-cover">
                                </div>
                                <h4 class="title font-semibold">${ data.value?.categories?.data[i]?.name }</h4>
                                <p class="text-gray-400 text-sm">${ data.value?.categories?.data[i]?.product_count } ads</p>
                            </nuxt-link>
                        </div>`;
                sliderData.innerHTML = sliderData.innerHTML + newSlide;
            }
            loadbtn.value = false;
        }
    }catch(error){
        loadbtn.value = false;
        console.log(error);
    }
}

</script>
<template>
    <div class="slider mx-auto w-full max-w-screen-2xl px-4 py-2">
        <div class="title flex justify-between items-center gap-3 px-3 py-3 border-b-2 mb-4">
            <h4 class="text-xl font-semibold">Categories</h4>
            <!-- <h5>See All</h5> -->
        </div>
        <div class="relative">
            <div class="slider-container slider-categories flex overflow-hidden">
                <div class="sliders grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-11" id="sliderContent">

                    <div v-for="(cat,index) in categories" :key="index" draggable class="slide w-full h-44 flex justify-center items-center text-center">
                        <nuxt-link :to="`/category/${cat.id}`" class="flex flex-col items-center rounded-md w-[calc(100%-6px)] h-[calc(100%-6px)] p-2 ease-in-out hover:scale-105 hover:bg-gray-100">
                            <div class="image bg-gray-100 rounded-full w-16 h-16 flex justify-center items-center">
                                <img :src="useRuntimeConfig().public.imageUrl+'/'+cat.image" alt="Image" class="w-8 h-8 object-cover">
                            </div>
                            <h4 class="title font-semibold leading-">{{ cat.name }}</h4>
                            <p class="text-gray-400 text-xs leading-0">{{ cat.product_count }} ads</p>
                        </nuxt-link>
                    </div>
                    <!-- <div @click="loadMoreCatBtn" class="slide w-full h-44 flex justify-center items-center text-center">
                        <div class="flex flex-col items-center rounded-md w-[calc(100%-6px)] h-[calc(100%-6px)] p-2 hover:scale-105 hover:bg-gray-100">
                            <h4 class="title font-semibold">More Categories</h4>
                            <p class="text-gray-400 text-sm">{{ totalcat.total }} Items</p>
                            <span class="mt-2">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
                                </svg>
                            </span>
                        </div>
                    </div> -->
                </div>
            </div>
    
            <div class="arrow block lg:hidden">
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
                <!-- <span v-if="slidesLenght != indexCount" @click="next()" class="prev absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200/50 hover:bg-gray-200 cursor-pointer">
                    <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                </span> -->
                <!-- <span v-else @click="loadMoreCatBtn" class="prev absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200/50 hover:bg-gray-200 cursor-pointer">
                    <div class="text-center" v-if="loadbtn">
                        <div role="status">
                            <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <svg v-else class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
                    </svg>
                </span> -->
            </div>
        </div>
    </div>
</template>