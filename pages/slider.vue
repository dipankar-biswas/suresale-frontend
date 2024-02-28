<script setup>
const sliderDivWidht = document?.querySelector('.slider-width')?.offsetWidth;
console.log(sliderDivWidht);
const showNum = ref(4);
const gap = ref(10);
const currentIndex = ref(0);
const slideWidht = ref(parseFloat(sliderDivWidht) / parseFloat(showNum.value));
const gapbad = ref((gap.value * (showNum.value - 1)) /showNum.value);
const gapextplus = ref(gap.value - gapbad.value);

const divWidth = ref(sliderDivWidht);
const singleWidth = ref(parseFloat(slideWidht.value) - parseFloat(gapbad.value));
const allGallery = ref([]);
var galleryData = {
    gallery: [
        {
            id: 0,
            bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
            imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img1.jpg",
            imgDesc: "Hello I am image 0"
        },
        {
            id: 1,
            bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
            imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img2.jpg",
            imgDesc: "Hello I am image 1"
        },
        {
            id: 2,
            bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
            imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img3.jpg",
            imgDesc: "Hello I am image 2"
        },
        {
            id: 3,
            bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
            imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img4.jpg",
            imgDesc: "Hello I am image 3"
        },
        {
            id: 4,
            bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
            imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img5.jpg",
            imgDesc: "Hello I am image 4"
        },
        {
            id: 5,
            bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
            imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img6.jpg",
            imgDesc: "Hello I am image 5"
        },
        {
            id: 5,
            bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
            imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img7.jpg",
            imgDesc: "Hello I am image 5"
        },
        {
            id: 5,
            bgColor: '#'+Math.floor((Math.random() * 999999) + 1),
            imgPath: "http://sorgalla.com/jcarousel/examples/_shared/img/img8.jpg",
            imgDesc: "Hello I am image 5"
        }
    ]
};
allGallery.value = galleryData.gallery;

const next = () => {
    if (currentIndex.value < allGallery.value.length - showNum.value) {
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
    <div>

        <div class="slider relative mx-auto w-full max-w-screen-2xl px-4 py-2">
            <div class="slider-container slider-width flex overflow-hidden" :style="`width: ${divWidth}px;`">
                <div v-if="singleWidth" class="slider-content flex" id="sliderContent" :style="`column-gap:${gap}px;transition: transform 0.5s ease-in-out;`">
                    <div v-for="(slide,index) in allGallery" :key="index" draggable class="slide h-44 overflow-hidden flex justify-center items-center text-4xl text-center font-semibold text-white border border-gray-600" :style="`min-width: ${singleWidth}px;background:${slide.bgColor};`">
                        <img :src="slide.imgPath" draggable class="w-full h-full object-cover"/>
                    </div>
                </div>
            </div>

            <div class="arrow">
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




        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        

        <div id="gallery" class="relative w-full" data-carousel="slide">
            <!-- Carousel wrapper -->
            <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                <!-- Item 1 -->
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="">
                </div>
                <!-- Item 2 -->
                <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
                    <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="">
                </div>
                <!-- Item 3 -->
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="">
                </div>
                <!-- Item 4 -->
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="">
                </div>
                <!-- Item 5 -->
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="">
                </div>
            </div>
            <!-- Slider controls -->
            <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span class="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span class="sr-only">Next</span>
                </span>
            </button>
        </div>

    </div>
</template>