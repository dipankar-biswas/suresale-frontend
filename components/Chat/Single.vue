<script setup>
const auth = useAuthStore();
const route = useRoute();
const props = defineProps(['chathideshow','toUser','getmessage','chatslistlastid']);
const emit = defineEmits(['chathide','loadmoremsgid']);

const chathide = () => {
    emit('chathide',false);
}

const loadbtn = ref(false);
const form = reactive({
    message: null,
})

// const newChat = {
//             id: props.getmessage[props.getmessage.length] + 1,
//             from_uuid: auth?.user?.id?.toString(),
//             to_uuid: props?.toUser?.form_uuid?.toString(),
//             product_id: props?.toUser?.product_id,
//             message: form.message,
//             created_at: Date.now(),
//             updated_at: Date.now(),
//         }

const msgid = ref(null);
const handelSubmit = async() => {
    loadbtn.value = true;
    let chats = document?.getElementById('chats');
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/message`, {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                    body: {
                        to_uuid: props?.toUser?.form_uuid?.toString(),
                        product_id: props?.toUser?.product_id,
                        message: form.message,
                        from_uuid: auth?.user?.id?.toString(),
                    },
                });
        if(data){
            loadbtn.value = false;
            msgid.value = props.getmessage[props.getmessage.length - 1].id + 1;
            let newChatMsg = '';
            newChatMsg += `<div>
                            <div class="chat right flex flex-row-reverse justify-end gap-x-3 mb-5">
                                <div class="avatar flex">
                                    <img class="w-7 h-7 rounded-full shadow-md" src="${useRuntimeConfig().public.imageUrl}${props.toUser?.profile_picture}" alt="Picture">
                                </div>
                                <div class="msg w-[calc(100%-32px)] flex items-end flex-col gap-y-2">
                                    <div class="txt bg-gradient-to-r from-indigo-500 to-indigo-300 text-sm text-white shadow-md py-3 px-2 rounded-md who-arrow">
                                    ${form.message}
                                    </div>
                                </div>
                            </div>
                        </div>`;
            chats.innerHTML= chats.innerHTML + newChatMsg;
            form.message = '';
        }
    }catch(error){
        loadbtn.value = false;
        console.log(error);
    }
}

const loadMoreMsg = (id) => {
    emit('loadmoremsgid',id);
}

</script>

<style>
    .chatbox {
        width: 0;
        transform-origin: right bottom;
        transform: scale(0);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease 0s;
        -webkit-transition: all 0.3s ease 0s;
    }
    .chatbox.show {
        width: 320px;
        transform: scaleY(1);
        opacity: 1;
        visibility: visible;
        transition: all 0.3s ease 0s;
        -webkit-transition: all 0.3s ease 0s;
    }
    .chatbox .body {
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: #0000 #0000;
    }
    .chatbox body:hover {
        scrollbar-width: thin;
        scrollbar-color: #d9d9d9 #0000;
    }
    /* Chrome Scroll Support Css */
    .chatbox body::-webkit-scrollbar {
        /* height: 8px; */
        width: 8px;
        position: absolute;

    }
    .chatbox body::-webkit-scrollbar-thumb {
        background: #d9d9d9;
        -webkit-border-radius: 10px;
        display: block;
        transition: all 0.3s ease 0s;
        -webkit-transition: all 0.3s ease 0s;
    }
    .chatbox body:hover::-webkit-scrollbar-thumb {
        display: block;
    }
    .chatbox body .who-arrow:first-child {
            position: relative;
    }
    .chatbox body .left .who-arrow:first-child::after {
        position: absolute;
        content: '';
        top: 0;
        left: -12px;
        width: 20px;
        height: 20px;
        background: linear-gradient(-135deg, rgb(243 244 246 / 1) 0%, rgb(243 244 246 / 1) 50%, transparent 50%, transparent);
        filter: drop-shadow(0 4px 8px rgba(0,0,0,.15));
        z-index: -1;
    }
    .chatbox body .right .who-arrow:first-child::after {
        position: absolute;
        content: '';
        top: 0;
        right: -12px;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #B4C6FC 0%, #B4C6FC 50%, transparent 50%, transparent);
        filter: drop-shadow(0 4px 8px rgba(0,0,0,.15));
        z-index: -1;
    }

</style>
<template>
    <div class="chatbox fixed h-96 right-2.5 bottom-12 shadow-md rounded-md z-30 bg-white" :class="props.chathideshow ? 'show' : ''">
        <div class="head flex items-center h-12 border-b">
            <div class="content flex justify-between items-center w-full px-3">
                <div class="avatar flex items-center gap-x-2">
                    <img class="w-8 h-8 rounded-full object-contain shadow-md border-b-2 flex" v-if="props.toUser?.profile_picture" :src="useRuntimeConfig().public.imageUrl+props.toUser?.profile_picture" alt="Avatar">
                    <span class="text-sm font-semibold">{{ props.toUser?.name }}</span>
                </div>
                <div class="options flex gap-x-2.5">
                    <span class="option flex items-center justify-center text-base p-1 w-7 h-7 rounded-full hover:bg-gray-200">
                        <svg class="w-6 h-6 text-gray-800 font-bold dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 12h0m6 0h0m6 0h0"/>
                        </svg>
                    </span>
                    <span @click="chathide" class="minimize flex items-center justify-center text-base p-1 w-7 h-7 rounded-full hover:bg-gray-200">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
        <div class="body h-[calc(100%-96px)] overflow-y-auto">
            <div class="scroll px-3 py-4">
                <button type="button" v-if="props.chatslistlastid != 0" @click="loadMoreMsg(props.chatslistlastid)">load data {{ props.chatslistlastid }}</button>
                <div class="chats" id="chats">
                    <div v-for="(msg,index) in props.getmessage" :key="msg.id">
                        <div v-if="msg?.from_uuid == auth?.user?.id" class="chat right flex flex-row-reverse justify-end gap-x-3 mb-5">
                            <div class="avatar flex">
                                <img class="w-7 h-7 rounded-full shadow-md" v-if="auth?.user?.profile_picture" :src="useRuntimeConfig().public.imageUrl+auth?.user?.profile_picture" alt="Picture">
                            </div>
                            <div class="msg w-[calc(100%-32px)] flex items-end flex-col gap-y-2">
                                <div class="txt bg-gradient-to-r from-indigo-500 to-indigo-300 text-sm text-white shadow-md py-3 px-2 rounded-md who-arrow">{{ msg?.message }}</div>
                            </div>
                        </div>
                        <div v-else class="chat left flex gap-x-3 mb-5">
                            <div class="avatar flex">
                                <img class="w-7 h-7 rounded-full shadow-md" v-if="props.toUser?.profile_picture" :src="useRuntimeConfig().public.imageUrl+props.toUser?.profile_picture" alt="Picture">
                            </div>
                            <div class="msg w-[calc(100%-32px)] flex items-start flex-col gap-y-2">
                                <div class="txt bg-gray-100 text-sm text-gray-500 shadow-md py-3 px-2 rounded-md who-arrow">{{ msg?.message }}</div>
                            </div>
                        </div>
                    </div>
                    

                    <!-- <div class="chat right flex flex-row-reverse justify-end gap-x-3 mb-5">
                        <div class="avatar flex">
                            <img class="w-8 h-8 rounded-full object-contain shadow-md border-b-2 flex" src="assets/images/avatar.png" alt="Avatar">
                        </div>
                        <div class="msg w-[calc(100%-32px)] flex items-end flex-col gap-y-2">
                            <div class="txt bg-gradient-to-r from-indigo-500 to-indigo-300 text-sm text-white shadow-md py-3 px-2 rounded-md who-arrow">Hello!</div>
                        </div>
                    </div>
                    <div class="chat left flex gap-x-3 mb-5">
                        <div class="avatar flex">
                            <img class="w-8 h-8 rounded-full object-contain shadow-md border-b-2 flex" src="assets/images/avatar.png" alt="Avatar">
                        </div>
                        <div class="msg w-[calc(100%-32px)] flex items-start flex-col gap-y-2">
                            <div class="txt bg-gray-100 text-sm text-gray-500 shadow-md py-3 px-2 rounded-md who-arrow">SDF tyt uiuyi deter!</div>
                        </div>
                    </div>
                    <div class="chat right flex flex-row-reverse justify-end gap-x-3 mb-5">
                        <div class="avatar flex">
                            <img class="w-8 h-8 rounded-full object-contain shadow-md border-b-2 flex" src="assets/images/avatar.png" alt="Avatar">
                        </div>
                        <div class="msg items-center w-[calc(100%-32px)] flex items-end flex-col gap-y-2">
                            <div class="txt bg-gradient-to-r from-indigo-500 to-indigo-300 text-sm text-white shadow-md py-3 px-2 rounded-md who-arrow">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam corporis dolor iste accusamus optio doloribus quam mollitia at et eligendi.</div>
                        </div>
                    </div>
                    <div class="chat left flex gap-x-3 mb-5">
                        <div class="avatar flex">
                            <img class="w-8 h-8 rounded-full object-contain shadow-md border-b-2 flex" src="assets/images/avatar.png" alt="Avatar">
                        </div>
                        <div class="msg w-[calc(100%-32px)] flex items-start flex-col gap-y-2">
                            <div class="txt bg-gray-100 text-sm text-gray-500 shadow-md py-3 px-2 rounded-md who-arrow">Totam corporis dolor iste accusamus optio</div>
                            <div class="txt bg-gray-100 text-sm text-gray-500 shadow-md py-3 px-2 rounded-md who-arrow">Consectetur adipisicing elit totam corporis dolor sit amet consectetur.</div>
                        </div>
                    </div>
                    <div class="chat right flex flex-row-reverse justify-end gap-x-3 mb-5">
                        <div class="avatar flex">
                            <img class="w-8 h-8 rounded-full object-contain shadow-md border-b-2 flex" src="assets/images/avatar.png" alt="Avatar">
                        </div>
                        <div class="msg w-[calc(100%-32px)] flex items-end flex-col gap-y-2">
                            <div class="txt bg-gradient-to-r from-indigo-500 to-indigo-300 text-sm text-white shadow-md py-3 px-2 rounded-md who-arrow">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</div>
                        </div>
                    </div>
                    <div class="chat left flex gap-x-3 mb-5">
                        <div class="avatar flex">
                            <img class="w-8 h-8 rounded-full object-contain shadow-md border-b-2 flex" src="assets/images/avatar.png" alt="Avatar">
                        </div>
                        <div class="msg w-[calc(100%-32px)] flex items-start flex-col gap-y-2">
                            <div class="txt bg-gray-100 text-sm text-gray-500 shadow-md py-3 px-2 rounded-md who-arrow">It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</div>
                            <div class="txt bg-gray-100 text-sm text-gray-500 shadow-md py-3 px-2 rounded-md who-arrow">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi totam aspernatur quas perferendis rerum aut voluptatem ullam dolorum eveniet doloribus rem, est, aliquid sed ea error, architecto natus dolor nemo!</div>
                        </div>
                    </div>
                    <div class="chat right flex flex-row-reverse justify-end gap-x-3 mb-5">
                        <div class="avatar flex">
                            <img class="w-8 h-8 rounded-full object-contain shadow-md border-b-2 flex" src="assets/images/avatar.png" alt="Avatar">
                        </div>
                        <div class="msg w-[calc(100%-32px)] flex items-end flex-col gap-y-2">
                            <div class="txt bg-gradient-to-r from-indigo-500 to-indigo-300 text-sm text-white shadow-md py-3 px-2 rounded-md who-arrow">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.</div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="foot flex items-center h-12 border-t">
            <form @submit.prevent="handelSubmit" class="form flex justify-between items-center gap-x-2 w-full px-3">
                <div class="type w-[calc(100%-48px)]">
                    <input type="text" v-model="form.message" class="w-full text-sm border-gray-300 rounded-3xl focus:ring-indigo-200 focus:border-indigo-400 focus:ps-4 py-2 px-3 tracking-wide" placeholder="Enter your message ...">
                </div>
                <button :type="loadbtn== false ? 'submit' : 'button'" class="send w-12 bg-gradient-to-r from-indigo-500 to-indigo-300 text-white shadow-md px-2 py-2 rounded-2xl cursor-pointer">
                    <span class="icon flex items-center justify-center">
                        <svg class="w-6 h-6 text-white dark:text-white rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"/>
                        </svg>
                    </span>
                </button>
            </form>
        </div>
    </div>
</template>