<script setup>
import { onMounted } from 'vue'
import { Modal, initFlowbite } from 'flowbite';

definePageMeta({
    middleware: ["auth"]
})

onMounted(() => {
    initFlowbite();
})

useSeoMeta({
    title: 'Chat Messages - My Amazing Site',
    ogTitle: 'My Amazing Site',
    description: 'This is my amazing site, let me tell you all about it.',
    ogDescription: 'This is my amazing site, let me tell you all about it.',
    ogImage: 'image',
    twitterCard: 'image',
})
const auth = useAuthStore();

const chatLists = ref('');
const getChatList = async() => {
    refreshNuxtData();
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/message`, {
                    method: 'OPTIONS',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                });
        chatLists.value = data.value.data.data;
    }catch(error){
        console.log(error);
    }
}
getChatList();


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
const getmessage = ref([]);
const chatslistlastid = ref(null);
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
        getmessage.value = data.value.data.data.reverse();
        chatslistlastid.value = data.value.data.data[0].id;
    }catch(error){
        console.log(error);
    }
}

const loadmoremsgdata = ref([]);
const loadMoreMsgFun = async(id) => {
    const token = useTokenStore();
    let chats = document?.getElementById('chats');
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/message?amount=20&from_message_id=${id}&with_uuid=${toUuid.value}&product_id=${productsId.value}`, {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                });
            if(data.value.data.data.length > 0){
                loadmoremsgdata.value = data.value.data.data.reverse();
                chatslistlastid.value = data.value.data.data[0].id;
                let newChat = ''
                for(let i = 0; i<loadmoremsgdata.value.length; i++) {
                    
                    newChat += `${
                        loadmoremsgdata.value[i]?.from_uuid == auth?.user?.id ?
                        `<div>
                            <div class="chat right flex flex-row-reverse justify-end gap-x-3 mb-5">
                                <div class="avatar flex">
                                    <img class="w-7 h-7 rounded-full shadow-md" src="http://bengalmart.xyz/storage/profile_picture/3" alt="Picture">
                                </div>
                                <div class="msg w-[calc(100%-32px)] flex items-end flex-col gap-y-2">
                                    <div class="txt bg-gradient-to-r from-indigo-500 to-indigo-300 text-sm text-white shadow-md py-3 px-2 rounded-md who-arrow">
                                    ${loadmoremsgdata.value[i].message}${loadmoremsgdata.value[i].id} 
                                    </div>
                                </div>
                            </div>
                        </div>`
                        :
                        `<div>
                            <div class="chat left flex gap-x-3 mb-5">
                                <div class="avatar flex">
                                    <img class="w-7 h-7 rounded-full shadow-md" src="http://bengalmart.xyz/storage/profile_picture/1" alt="Picture">
                                </div>
                                <div class="msg w-[calc(100%-32px)] flex items-start flex-col gap-y-2">
                                    <div class="txt bg-gray-100 text-sm text-gray-500 shadow-md py-3 px-2 rounded-md who-arrow">
                                        ${loadmoremsgdata.value[i].message}${loadmoremsgdata.value[i].id} 
                                    </div>
                                </div>
                            </div>
                        </div>`
                    }`
                    chats.innerHTML= newChat+chats.innerHTML;
                }

            }else{
                chatslistlastid.value = 0;
            }
    }catch(error){
        console.log(error);
    }
}


const chathideshow = ref(false);
const chathideFun = async(event) => {
    chathideshow.value = event;
}

// onMounted(async () => {
    
//     setInterval(function () {
//         getChatList();
//     }, 180000);
    
//     if(getmessage.value.length > 0){
//         setInterval(function () {
//             getMessages();
//         }, 300000);
//     }
// });
</script>
<template>    
    <div class="content">
        <div class="max-w-screen-2xl flex gap-x-4 h-full mx-auto px-4 py-9">
            
            <UserSidebar></UserSidebar>

            <div class="w-[calc(100%-basis-72)] w-full">
                <div class="mx-auto w-full max-w-screen-2xl">

                    <div class="bg-gray-100 rounded-md px-4 py-5 mt-6">
                        <h4 class="text-lg font-semibold mb-3">All Messages</h4>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-green-300 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            User name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Message
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody v-if="chatLists.length > 0">
                                    <tr v-for="(chat,index) in chatLists" :key="chat.id" class="bg-white even:bg-gray-50 hover:bg-green-100 border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div class="flex items-center gap-x-2">
                                                <img class="w-7 h-7 rounded-full" v-if="chat?.to_user!=null || chat?.from_user!=null" :src="`${useRuntimeConfig().public.imageUrl}${(chat?.to_user==null) ? (chat?.from_user?.profile_picture) : (chat?.to_user?.profile_picture)}`" alt="Picture">
                                                <span @click="chathideshow = true, msgShowBtn(chat?.to_uuid,  chat?.product_id,  chat?.from_uuid,  chat?.to_user==null? chat?.from_user?.name : chat?.to_user?.name,  chat?.to_user==null? chat?.from_user?.profile_picture : chat?.to_user?.profile_picture )" class="cursor-pointer">{{ chat?.to_user==null? chat?.from_user?.name : chat?.to_user?.name }}</span>
                                            </div>
                                        </th>
                                        <td class="px-6 py-4">
                                            {{ chat?.message }}
                                        </td>
                                        <td class="px-6 py-4">
                                            Ok
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th colspan="3" scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Not Message
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ChatSingle v-if="auth?.user?.id" :chathideshow="chathideshow" :toUser="toUser" :getmessage="getmessage" :chatslistlastid="chatslistlastid" @chathide="chathideFun($event)" @loadmoremsgid="loadMoreMsgFun($event)"></ChatSingle>
</template>