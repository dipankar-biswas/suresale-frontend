<script setup>
    const auth = useAuthStore();
    definePageMeta({
    middleware: ["auth"]
    })
    
    

    const chathideshow = ref(false);
    const chathideFun = async(event) => {
        chathideshow.value = event;
    }


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
            console.log(data);
            chatLists.value = data.value.data.data;
        }catch(error){
            console.log(error);
        }
    }
    getChatList();


    const toUuid = ref(null);
    const productId = ref(null);
    const toUser = ref(null);
    const msgShowBtn = (to_uuid, product_id, form_uuid, uName, uPicture) => {
        toUuid.value = to_uuid;
        productId.value = product_id;
        console.log(to_uuid, product_id);
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
            const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/message?amount=20&from_message_id=0&with_uuid=${toUuid.value}&product_id=${productId.value}`, {
                        method: 'GET',
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token.getToken}`,
                        },
                    });
            console.log(data);
            getmessage.value = data.value.data.data;
            console.log(getmessage.value);
        }catch(error){
            console.log(error);
        }
    }
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
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                    <tr v-for="(chat,index) in chatLists" :key="chat.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div class="flex items-center gap-x-2">
                                                <img class="w-7 h-7 rounded-full" v-if="chat?.to_user!=null || chat?.from_user!=null" :src="`${useRuntimeConfig().public.imageUrl}${(chat?.to_user==null) ? (chat?.from_user?.profile_picture) : (chat?.to_user?.profile_picture)}`" alt="Picture">
                                                <span @click="chathideshow = true, msgShowBtn(chat?.to_uuid,  chat?.product_id,  chat?.from_user?.id,  chat?.to_user==null? chat?.from_user?.name : chat?.to_user?.name,  chat?.to_user==null? chat?.from_user?.profile_picture : chat?.to_user?.profile_picture )" class="cursor-pointer">{{ chat?.to_user==null? chat?.from_user?.name : chat?.to_user?.name }}</span>
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

    <ChatSingle v-if="auth?.user?.id" :chathideshow="chathideshow" :toUser="toUser" :getmessage="getmessage" @chathide="chathideFun($event)"></ChatSingle>
</template>