<script setup>
const auth = useAuthStore();
const route = useRoute();
const datetime = useDateTime();


function normalizeAndReverseArray(arr) {
  // Step 1: Reverse the array
  const reversedArray = arr.reverse();

  // Step 2: Find the minimum and maximum values
  const minValue = Math.min(...reversedArray);
  const maxValue = Math.max(...reversedArray);

  // Step 3: Normalize the values
  const normalizedArray = reversedArray.map(value => {
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    return normalizedValue;
  });

  return normalizedArray;
}

const adsView = ref([]);
const showImage = ref();
const AdsView = async() => {
    refreshNuxtData();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/view-product/${route.params.id}`);
        adsView.value = data.value.product;
        showImage.value = adsView.value?.picture[0];
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
AdsView();

const productId = ref(route.params.id);
const allReviews = ref([]);
const form = reactive({
    rating: null,
    comment: null,
})


const AllReviews = async() => {
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/review/product/${productId.value}`);
        console.log(data.value.data);
        allReviews.value = data.value.data.data;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
AllReviews();

const handelSubmit = async() => {
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/review`, {
                    method: 'PUT',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                    body: {
                        product_id: productId.value,
                        rating: form.rating,
                        comment: form.comment,
                    },
                });
        console.log(data);
        AllReviews(productId.value);
    }catch(error){
        console.log(error);
    }
}


// Message
const replies = ref([]);
const replybox = ref([]);
const reviewReplyBtn = async(id,index) => {
    if(replybox.value[index] == true){
        replybox.value[index] = false;
    }else{
        replybox.value[index] = true;
    }
    reviewReply(id,index);
}

const reviewReply = async(id,index) => {
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/review/${id}`);
        console.log(data.value.data.replies);
        replies.value[index] = data.value.data.replies;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}


const toUuid = ref(null);
const productsId = ref(null);
const toUser = ref(null);
const msgShowBtn = (to_uuid, product_id, form_uuid, uName, uPicture) => {
    toUuid.value = to_uuid;
    productsId.value = product_id;
    console.log(to_uuid, product_id, form_uuid, uName, uPicture);
    const touser = {
        name:uName,
        profile_picture:uPicture,
        form_uuid:form_uuid,
        product_id:product_id,
    }
    toUser.value = touser;
    getMessages();
}
const getmessage = ref('');
const getMessages = async() => {
    refreshNuxtData();
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/message?amount=20&from_message_id=0&with_uuid=${toUuid.value}&product_id=${productsId.value}`, {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                });
        getmessage.value = [...data.value.data.data].reverse();
    }catch(error){
        console.log(error);
    }
}



const loadMoreMsgFun = async(id) => {
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/message?amount=20&from_message_id=${id}&with_uuid=${toUuid.value}&product_id=${productsId.value}`, {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                });
        normalizeAndReverseArray(getmessage.value);
        console.log(getmessage.value);
        console.log(data.value.data.data);
        getmessage.value.push(...data.value.data.data);
    }catch(error){
        console.log('Somthing Wrong!');
    }
}

const replyText = ref([]);
const handelReplySubmit = async(id,index) => {
    console.log(id, index);
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/review/${id}?review_id=${auth?.user?.id}&reply=${replyText.value[index]}`, {
                    method: 'PATCH',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                });
        if(data){
            replyText.value[index] = '';
            reviewReply(id,index);
        }
    }catch(error){
        console.log(error);
    }
}

const chathideshow = ref(false);
const chathideFun = async(event) => {
    chathideshow.value = event;
}


const zoomScale = ref(1);
const zoomMove = ref({ x: 0, y: 0 });
const imageMouseOver = (e) => {
    console.log('Ok')
    const { offsetX, offsetY, target } = e;
    const { offsetWidth: width, offsetHeight: height } = target;
    const x = (offsetX / width) * 100;
    const y = (offsetY / height) * 100;

    zoomMove.value = { x, y };
}
const imageMouseLeave = () => {
    console.log('Oks')
    zoomScale.value = 1;
    zoomMove.value = { x: 0, y: 0 };
}
</script>
<style>
.zoomable-image {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-out;
}

/* Custom directive for zooming */
.v-zoomable-enter-active, .v-zoomable-leave-active {
  transition: transform 0.3s ease-out;
}

.v-zoomable-enter, .v-zoomable-leave-to {
  transform: scale(1);
}
</style>
<template>    
    <div class="max-w-screen-2xl mx-auto px-4 py-9">
        <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li class="inline-flex items-center">
                    <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
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
                        <a href="#" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Projects</a>
                    </div>
                </li>
                <li aria-current="page">
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Flowbite</span>
                    </div>
                </li>
            </ol>
        </nav>

        <div v-if="adsView">
            <div class="flex justify-between gap-x-6 h-full mt-6">
                <div class="w-7/12">
                    <div class="w-full flex gap-x-4">
                        
                        <div class="w-9/12">
                            <div class="feature-image">
                                <img class="rounded-lg w-full h-auto object-cover ease-out zoomable-image" @mouseover="imageMouseOver" @mouseleave="imageMouseLeave" v-if="adsView?.picture" :src="useRuntimeConfig().public.imageUrl+'/'+showImage?.replaceAll('public','storage')" alt="Ads" />
                                <img class="rounded-lg w-full h-auto object-cover ease-out" v-else src="assets/images/dummy-image.jpg" alt="Ads" />
                            </div>
                        </div>
                        <div class="w-3/12">
                            <div class="slides flex flex-col gap-y-3">
                                <div v-for="(image,index) in adsView?.picture" :key="index" class="item border border-cyan-500 rounded-lg">
                                    <img class="rounded-lg w-full h-28 object-cover" @click="showImage = image" :src="useRuntimeConfig().public.imageUrl+'/'+image.replaceAll('public','storage')" alt="Ads" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-5/12">
                    <div class="detail">
                        <div class="price">
                            <h4 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            </h4>
                            <div class="flex items-center justify-start gap-x-4 mt-2 mb-5 space-x-3 rtl:space-x-reverse">
                                <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-x-1">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M5 5c.6 0 1-.4 1-1a1 1 0 1 1 2 0c0 .6.4 1 1 1h1c.6 0 1-.4 1-1a1 1 0 1 1 2 0c0 .6.4 1 1 1h1c.6 0 1-.4 1-1a1 1 0 1 1 2 0c0 .6.4 1 1 1a2 2 0 0 1 2 2v1c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V7c0-1.1.9-2 2-2ZM3 19v-7c0-.6.4-1 1-1h16c.6 0 1 .4 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6-6c0-.6-.4-1-1-1a1 1 0 1 0 0 2c.6 0 1-.4 1-1Zm2 0a1 1 0 1 1 2 0c0 .6-.4 1-1 1a1 1 0 0 1-1-1Zm6 0c0-.6-.4-1-1-1a1 1 0 1 0 0 2c.6 0 1-.4 1-1ZM7 17a1 1 0 1 1 2 0c0 .6-.4 1-1 1a1 1 0 0 1-1-1Zm6 0c0-.6-.4-1-1-1a1 1 0 1 0 0 2c.6 0 1-.4 1-1Zm2 0a1 1 0 1 1 2 0c0 .6-.4 1-1 1a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                                    </svg>
                                    
                                    <span>{{ datetime.formatMDY(adsView?.created_at) }}</span>
                                </div>
                                <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-x-1">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M12 2a8 8 0 0 1 6.6 12.6l-.1.1-.6.7-5.1 6.2a1 1 0 0 1-1.6 0L6 15.3l-.3-.4-.2-.2v-.2A8 8 0 0 1 11.8 2Zm3 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"/>
                                    </svg>
                                    <span>{{ adsView?.location }}</span>
                                </div>
                            </div>
                            <div class="price text-4xl font-semibold mb-4">{{ adsView?.currency?.symbol }}{{ adsView?.price }}</div>
    
                            <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
                            <div class="actions mb-4">
                                <a v-if="adsView?.user?.mobile != null" :href="`tel:${ adsView?.user?.mobile }`" class="inline-flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    <div class="flex items-center gap-x-1">
                                        <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z"/>
                                        </svg>
                                        <span>Contact Seller</span>
                                    </div>
                                </a>
                                <a v-else href="#" class="inline-flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    <div class="flex items-center gap-x-1">
                                        <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z"/>
                                        </svg>
                                        <span>Contact Seller</span>
                                    </div>
                                </a>
                                <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    <div class="flex items-center gap-x-1">
                                        <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M7.8 2c-.5 0-1 .2-1.3.6A2 2 0 0 0 6 3.9V21a1 1 0 0 0 1.6.8l4.4-3.5 4.4 3.5A1 1 0 0 0 18 21V3.9c0-.5-.2-1-.5-1.3-.4-.4-.8-.6-1.3-.6H7.8Z"/>
                                        </svg>
                                        <span>Save</span>
                                    </div>
                                </button>
                                <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    <div class="flex items-center gap-x-1">
                                        <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.5 3A3.5 3.5 0 0 0 14 7L8.1 9.8A3.5 3.5 0 0 0 2 12a3.5 3.5 0 0 0 6.1 2.3l6 2.7-.1.5a3.5 3.5 0 1 0 1-2.3l-6-2.7a3.5 3.5 0 0 0 0-1L15 9a3.5 3.5 0 0 0 6-2.4c0-2-1.6-3.5-3.5-3.5Z"/>
                                        </svg>
                                        <span>Share</span>
                                    </div>
                                </button>
                            </div>
                            <figcaption class="flex items-center justify-start mt-6 mb-5 space-x-3 rtl:space-x-reverse">
                                <img class="w-12 h-12 rounded-full" v-if="adsView?.user?.profile_picture" :src="useRuntimeConfig().public.imageUrl+adsView?.user?.profile_picture" alt="profile picture">
                                <div class="">
                                    <div class="font-medium text-gray-900 dark:text-white">
                                        <nuxt-link :to="`/${adsView?.user?.name.replaceAll(' ','-')}/${adsView?.user?.id}/products`">{{ adsView?.user?.name }}</nuxt-link>
                                    </div>
                                    <div class="flex gap-x-5">
                                        <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-x-1">
                                            <svg class="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                            </svg>
                                            <span>5.0</span>
                                        </div>
                                        <div data-modal-target="reviews-modal" data-modal-toggle="reviews-modal" class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-x-1 cursor-pointer hover:text-gray-900">
                                            <svg class="w-4 h-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M3 6c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 1.9h-6.6l-2.9 2.7c-1 .9-2.5.2-2.5-1v-1.7H5a2 2 0 0 1-2-2V6Zm5.7 3.8a1 1 0 1 0-1.4 1.4 1 1 0 1 0 1.4-1.4Zm2.6 0a1 1 0 1 1 0 1.4 1 1 0 0 1 0-1.4Zm5.4 0a1 1 0 1 0-1.4 1.4 1 1 0 1 0 1.4-1.4Z" clip-rule="evenodd"/>
                                            </svg>
                                            <span>{{ allReviews.length }} Reviews</span>
                                        </div>
                                    </div>
                                </div>
                            </figcaption>
                            <div class="actions mb-4">
                                <button v-if="auth?.user?.id" type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    <div @click="chathideshow = true, msgShowBtn(adsView?.user?.id,  adsView?.id, adsView?.user?.id,  adsView?.user?.name,  adsView?.user?.profile_picture)" class="flex items-center gap-x-1">
                                        <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M4 3a1 1 0 0 0-1 1v8c0 .6.4 1 1 1h1v2a1 1 0 0 0 1.7.7L9.4 13H15c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1H4Z" clip-rule="evenodd"/>
                                            <path fill-rule="evenodd" d="M8 17.2h.1l2.1-2.2H15a3 3 0 0 0 3-3V8h2c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1h-1v2a1 1 0 0 1-1.7.7L14.6 18H9a1 1 0 0 1-1-.8Z" clip-rule="evenodd"/>
                                        </svg>
                                        <span>Start Chat</span>
                                    </div>
                                </button>
                                <button v-else type="button" data-modal-target="start-chat-modal" data-modal-toggle="start-chat-modal" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    <div class="flex items-center gap-x-1">
                                        <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M4 3a1 1 0 0 0-1 1v8c0 .6.4 1 1 1h1v2a1 1 0 0 0 1.7.7L9.4 13H15c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1H4Z" clip-rule="evenodd"/>
                                            <path fill-rule="evenodd" d="M8 17.2h.1l2.1-2.2H15a3 3 0 0 0 3-3V8h2c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1h-1v2a1 1 0 0 1-1.7.7L14.6 18H9a1 1 0 0 1-1-.8Z" clip-rule="evenodd"/>
                                        </svg>
                                        <span>Start Chat</span>
                                    </div>
                                </button>
                                <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    <div class="flex items-center gap-x-1">
                                        <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 10a2.5 2.5 0 1 1 5 .2 2.4 2.4 0 0 1-2.5 2.4V14m0 3h0m9-5a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                        <span>Report</span>
                                    </div>
                                </button>
                            </div>
    
                            <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
    
                            <h4 class="text-md font-semibold mb-2">Share</h4>
                            <div class="text-start flex gap-x-3">
                                <button type="button"
                                    class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        viewBox="0 0 8 19">
                                        <path fill-rule="evenodd"
                                            d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <button type="button"
                                        class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        viewBox="0 0 18 19">
                                        <path fill-rule="evenodd"
                                            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <button type="button"
                                    class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-between gap-x-6 h-full mt-6">
                <div class="w-7/12">
                    <div class="content">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <tbody>
                                    <tr class="border-gray-200 dark:border-gray-700 flex">
                                        <th scope="row" class="px-6 py-4 w-28 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Description : 
                                        </th>
                                        <td class="px-6 py-4">
                                            {{ adsView?.description }}
                                        </td>
                                    </tr>
                                    <tr class="border-gray-200 dark:border-gray-700 flex">
                                        <th scope="row" class="px-6 py-4 w-28 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Category : 
                                        </th>
                                        <td class="px-6 py-4">
                                            {{ adsView?.category?.name }}
                                        </td>
                                    </tr>
                                    <tr class="border-gray-200 dark:border-gray-700 flex">
                                        <th scope="row" class="px-6 py-4 w-28 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Model : 
                                        </th>
                                        <td class="px-6 py-4">
                                            Apple 15 Pro Max
                                        </td>
                                    </tr>
                                    <tr class="border-gray-200 dark:border-gray-700 flex">
                                        <th scope="row" class="px-6 py-4 w-28 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Condition : 
                                        </th>
                                        <td class="px-6 py-4">
                                            {{ adsView?.condition?.name }}
                                        </td>
                                    </tr>
                                    <tr class="border-gray-200 dark:border-gray-700 flex">
                                        <td class="px-6 py-4 w-full flex items-center justify-center gap-x-2" colspan="2">
                                            <span class="font-medium text-gray-900">Show More Details</span>
                                            <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                                            </svg>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="w-5/12">
                    <div class="shadow-md p-4 rounded-lg bg-gray-100">
                        <h4 class="text-md font-semibold mb-2">Stay Safe</h4>
                        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
                        <p >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <a href="#" class="text-sm font-semibold mt-3 flex items-center">
                            <span>Read More</span>
                            <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 16 4-4-4-4m6 8 4-4-4-4"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Similar Ads -->
    <div class="mx-auto w-full max-w-screen-2xl px-4 py-2">
        <div class="bg-white">
            <div class="title flex justify-between items-center gap-3 px-3 py-3 border-b-2 mb-4">
                <h4 class="text-xl font-semibold">Similar Ads</h4>
            </div>
            <div class="adses rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-5">
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


    <!-- Main modal -->
    <div id="reviews-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-lg max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Reviews
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="reviews-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form @submit.prevent="handelSubmit" class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="rating" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                            <input type="text" v-model="form.rating" name="rating" id="rating" min="1" max="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="5" required="">
                        </div>
                        <div class="col-span-2">
                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Review</label>
                            <textarea id="description" v-model="form.comment" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product review here"></textarea>                    
                        </div>
                    </div>
                    <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add Review
                    </button>
                </form>

                
                <!-- All Reviews -->
                <div class="p-4">
                    <div class="flex items-center justify-between p-2 mb-3 border-b rounded-t dark:border-gray-600">
                        <h4 class="text-md font-semibold text-gray-900 dark:text-white"> All Reviews </h4>
                    </div>
                    <div v-if="allReviews.length > 0">
                        <article v-for="(reviw, index) in allReviews" :key="reviw?.id">
                            <div class="flex items-center mb-3">
                                <img class="w-8 h-8 me-4 rounded-full border border-gray-300 shadow-md" v-if="reviw?.user?.profile_picture" :src="useRuntimeConfig().public.imageUrl+reviw?.user?.profile_picture" alt="Bonnie image"/>
                                <img class="w-8 h-8 me-4 rounded-full border border-gray-300 shadow-md" v-else src="/assets/images/avatar.png" alt="Bonnie image"/>
                                <div class="leading-4 dark:text-white">
                                    <p class="text-xs font-medium">{{ reviw?.user?.name }}</p>
                                    <span class="text-xs text-gray-500 dark:text-gray-400">Visual Designer</span>
                                </div>
                            </div>
                            <div class="flex item-center gap-x-2 mb-1">
                                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                                    <svg class="w-3 h-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                    <svg class="w-3 h-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                    <svg class="w-3 h-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                    <svg class="w-3 h-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                    <svg class="w-3 h-3 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                </div>
                                <div class="flex item-center">
                                    <p class="ms-1 text-xs text-gray-500 dark:text-gray-400">4.95</p>
                                    <p class="ms-1 text-xs text-gray-500 dark:text-gray-400">out of</p>
                                    <p class="ms-1 text-xs text-gray-500 dark:text-gray-400">5</p>
                                </div>
                            </div>
                            <div class="border-b border-gray-100 mb-3 pb-2">
                                <p class="mb-2 text-sm text-gray-800 dark:text-gray-400">{{ reviw?.comment }}</p>
                                <p @click="reviewReplyBtn(reviw?.id, index)" class="text-xs text-gray-500 "><span class="font-medium cursor-pointer me-2 hover:text-gray-800">Reply</span>{{ datetime.formatMDY(reviw?.created_at) }} {{ datetime.formatHM(reviw?.created_at) }}</p>
                            </div>
                            <!-- Reply -->
                            <div v-if="auth?.user?.id && replybox[index]" class="mb-4">
                                <form @submit.prevent="handelReplySubmit(reviw?.id,index)" class="max-w-md mx-auto px-8">   
                                    <div class="relative">
                                        <input type="text" v-model="replyText[index]" id="default-search" class="block w-full p-2 pe-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                                        <button type="submit" class="text-white absolute end-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style="bottom:5px">Reply</button>
                                    </div>
                                </form>
                            </div>
                            <div  v-if="replies[index]?.length > 0 && replybox[index]" class="mt-2 ps-8">
                                <div v-for="(reply, inde) in replies[index]" :key="reply?.id">
                                    <div class="flex items-center mb-3">
                                        <img class="w-8 h-8 me-4 rounded-full border border-gray-300 shadow-md" v-if="reply?.by?.profile_picture" :src="useRuntimeConfig().public.imageUrl+reply?.by?.profile_picture" alt="Bonnie image"/>
                                        <img class="w-8 h-8 me-4 rounded-full border border-gray-300 shadow-md" v-else src="/assets/images/avatar.png" alt="Bonnie image"/>
                                        <div class="leading-4 dark:text-white">
                                            <p class="text-xs font-medium">{{ reply?.by?.name }}</p>
                                            <span class="text-xs text-gray-500 dark:text-gray-400">Visual Designer</span>
                                        </div>
                                    </div>
                                    <div class="border-b border-gray-100 mb-2 pb-1">
                                        <p class="text-sm text-gray-800 dark:text-gray-400">{{ reply?.reply }}</p>
                                        <!-- <p class="text-xs text-gray-500 "><span class="font-medium cursor-pointer me-2 hover:text-gray-800">Reply</span>{{ datetime.formatMDY(reviw?.created_at) }} {{ datetime.formatHM(reviw?.created_at) }}</p> -->
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div v-else>
                        <span class="text-sm">No Reviews...</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
    
    <ChatSingle v-if="auth?.user?.id" :chathideshow="chathideshow" :toUser="toUser" :getmessage="getmessage" @chathide="chathideFun($event)" @loadmoremsgid="loadMoreMsgFun($event)"></ChatSingle>
    
    <div id="start-chat-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="start-chat-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-4 md:p-5 text-center">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Please Login First ! Try agian.</h3>
                    <button data-modal-hide="start-chat-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Ok</button>
                </div>
            </div>
        </div>
    </div>
</template>