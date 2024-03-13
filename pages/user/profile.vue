<script setup>
definePageMeta({
  middleware: ["auth"]
})
useSeoMeta({
  title: 'My Profile - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})

const auth = useAuthStore();
definePageMeta({
  middleware: ["auth"]
})


const errors = ref([]);
const errors1 = ref([]);
const errors2 = ref([]);
const errors3 = ref([]);
const loadbtn = ref(false);
const loadbtn1 = ref(false);
const loadbtn2 = ref(false);
const loadbtn3 = ref(false);
const success_msg = ref(null);
const success_msg1 = ref(null);
const success_msg2 = ref(null);
const success_msg3 = ref(null);


// Follower
const follower = ref(0);
const followersData = ref([]);
const followers = async() => {
    refreshNuxtData();
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/followers`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                });
        followersData.value = data.value.data;
        follower.value = followersData.value.length;
    }catch(error){
        console.log(error);
    }
}
followers();


// Update User Info
const formEidt = ref(false);
const form = reactive({
    name: auth?.user ? auth?.user?.name : null,
    email: auth?.user ? auth?.user?.email : null,
    mobile: auth?.user ? auth?.user?.mobile : null,
    mobiles: auth?.user ? auth?.user?.mobiles : null,
    dob: auth?.user ? auth?.user?.dob : null,
    gender: auth?.user ? auth?.user?.gender : null,
    address: auth?.user ? auth?.user?.address : null,
    about_me: auth?.user ? auth?.user?.about_me : null,
})
const formEidtBtn = async() => {
    formEidt.value = true;
}
const updateUser = async() => {
    if(form.mobile === auth?.user?.mobile){
        form.mobiles = auth?.user?.mobile;
        delete form.mobile;
    }
    loadbtn.value = true;
    try{
        await auth.updateUserData(form);
        loadbtn.value = false;
        formEidt.value = false;
    }catch(error){
        loadbtn.value = false;
        errors.value = error.data.errors;
    }
}


// Change password
const passform = reactive({
    email: auth.user.email,
    old_password: null,
    new_password: null,
    password_confirmation: null,
})
const passChange = async() => {
    loadbtn1.value = true;
    try{
        const data = await auth.passwordChange(passform);
        loadbtn1.value = false;
        success_msg1.value = data.message;
    }catch(error){
        errors1.value = error.data.errors;
        loadbtn1.value = false;
    }
}

const displayImage = ref(null);
const uploadedFile = ref([]);
const handleFileSelection = async( event ) => {
    uploadedFile.value = event.target.files[0];
    displayImage.value = URL.createObjectURL(event.target.files[0]);
}

const profilePicUpdateBtn = async() => {
    loadbtn2.value = true;

    const formDatas = new FormData();
    formDatas.append('profile_picture', uploadedFile.value);

    try{
        const data = await auth.profilePictureUpdate(formDatas);
        loadbtn2.value = false;
        success_msg2.value = data.message;
    }catch(error){
        errors2.value = error.data.errors;
        loadbtn2.value = false;
    }
}


// Account Switch
const Business = async() => {
    loadbtn3.value = true;
    try{
        const data = await auth.AccountSwitch();
        loadbtn3.value = false;
        success_msg3.value = data.message;
    }catch(error){
        errors3.value = error.data.errors;
        loadbtn3.value = false;
    }
}

</script>
<template>    
    <div class="content">
        <div class="max-w-screen-2xl flex gap-x-4 h-full mx-auto px-4 py-9">
            
            <UserSidebar></UserSidebar>

            <div class="w-[calc(100%-basis-72)] w-full">
                <div class="mx-auto w-full max-w-screen-2xl">
                    
                    <div class="group relative">
                        <div class="absolute w-full h-64 bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                            <button data-tooltip-target="download-image" class="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
                                <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z" clip-rule="evenodd"/>
                                    <path fill-rule="evenodd" d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z" clip-rule="evenodd"/>
                                </svg>
                            </button>
                            <div id="download-image" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                Banner image Change
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                        <img src="/assets/images/slider/slider-1.webp" class="w-full h-64 rounded-lg" />
                    </div>

                    <div class="mx-auto w-full bg-whiterounded-lg dark:bg-gray-800">
                        <div class="flex">
                            <div class="w-1/4"></div>
                            <div class="w-2/4 flex flex-col items-center pb-10 -mt-14">
                                <div class="border-2 bg-white border-gray-300 rounded-full shadow-lg mb-3 relative z-10">
                                    <img class="w-28 h-28 rounded-full p-1" v-if="auth?.user?.profile_picture" :src="useRuntimeConfig().public.imageUrl+auth?.user?.profile_picture" alt="image"/>
                                    <img class="w-28 h-28 rounded-full p-1" v-else src="/assets/images/avatar.png" alt="image"/>
                                </div>
                                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white" v-if="auth?.user?.name">{{ auth?.user?.name }}</h5>
                                <span class="text-sm text-gray-500 dark:text-gray-400 mb-2">Visual Designer</span>
                                <span class="text-sm font-semibold dark:text-gray-400">{{ follower }} Followers</span>
                            </div>
                            <div class="w-1/4 mt-4">
                                <div class="flex" v-if="auth?.user?.id">
                                    <button type="button" @click="Business" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Business Account</button>
                                    <!-- <button type="button" class="text-gray-900 bg-gray-200 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Business</button> -->
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h1 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center justify-between">
                            <span>Profile Information</span>
                            <button @click="formEidtBtn" type="button" class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                        </h1>
                        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
                        <div v-if="formEidt">
                            <form @submit.prevent="updateUser">
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-4">
                                    <div class="mb-3">
                                        <FormLabel for="name">Name</FormLabel>
                                        <FormInput type="name" name="name" id="name" placeholder="Your name" v-if="auth?.user" v-model="form.name"/>
                                        <span v-if="errors.name" class="text-sm text-red-500">{{ errors.name[0] }}</span>
                                    </div>
                                    <div class="mb-3">
                                        <FormLabel for="email">Email</FormLabel>
                                        <FormInput type="email" name="email" class="cursor-not-allowed" id="disabled-input" aria-label="disabled input" placeholder="name@gmail.com" v-if="auth?.user" v-model="form.email" disabled/>
                                        <span v-if="errors.email" class="text-sm text-red-500">{{ errors.email[0] }}</span>
                                    </div>
                                    <div class="mb-3">
                                        <FormLabel for="mobile">Phone</FormLabel>
                                        <FormInput type="text" name="mobile" id="mobile" :placeholder="form.mobiles !== null ? form.mobiles : '0174*******'" v-if="auth?.user" v-model="form.mobile"/>
                                        <span v-if="errors.mobile" class="text-sm text-red-500">{{ errors.mobile[0] }}</span>
                                    </div>
                                    <div class="mb-3">
                                        <FormLabel for="dob">Birthday</FormLabel>
                                        <FormInput type="text" name="dob" id="dob" placeholder="2020-02-25" v-if="auth?.user" v-model="form.dob"/>
                                        <span v-if="errors.dob" class="text-sm text-red-500">{{ errors.dob[0] }}</span>
                                    </div>
                                    <div class="mb-3">
                                        <FormLabel for="gender">Gender</FormLabel>
                                        <FormInput type="text" name="gender" id="gender" placeholder="Male" v-if="auth?.user" v-model="form.gender"/>
                                        <span v-if="errors.gender" class="text-sm text-red-500">{{ errors.gender[0] }}</span>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <FormLabel for="address">Address</FormLabel>
                                    <FormInput type="text" name="address" id="address" placeholder="271-Moghbazar, Dhaka" v-if="auth?.user" v-model="form.address"/>
                                    <span v-if="errors.address" class="text-sm text-red-500">{{ errors.address[0] }}</span>
                                </div>
                                <div class="mb-3">
                                    <FormLabel for="about_me">About Me</FormLabel>
                                    <textarea id="about_me" name="about_me" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." v-model="form.about_me"></textarea>
                                </div>
                                <div class="flex gap-x-4">
                                    <ButtonPrimary type="submit" class="w-auto">
                                        <div class="flex items-center justify-center gap-x-2">
                                            <div role="status" v-if="loadbtn">
                                                <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                            <span>Save & Change</span>
                                        </div>
                                    </ButtonPrimary>
                                    <ButtonPrimary type="button" class="w-auto" @click="formEidt = false">
                                        <div class="flex items-center justify-center gap-x-2">
                                            <span>Cancel</span>
                                        </div>
                                    </ButtonPrimary>
                                </div>
                            </form>
                        </div>
                        <div v-else>
                            <div class="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-start">
                                <span class="w-40 font-semibold">Name : </span> 
                                <span class="w-[calc(100%-10rem)]" v-if="auth?.user">{{ auth?.user?.name }}</span>
                            </div>
                            <div class="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-start">
                                <span class="w-40 font-semibold">Email : </span> 
                                <span class="w-[calc(100%-10rem)]" v-if="auth?.user">{{ auth?.user?.email }}</span>
                            </div>
                            <div class="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-start">
                                <span class="w-40 font-semibold">Phone : </span> 
                                <span class="w-[calc(100%-10rem)]" v-if="auth?.user">{{ auth?.user?.mobile }}</span>
                            </div>
                            <div class="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-start">
                                <span class="w-40 font-semibold">Birthday : </span> 
                                <span class="w-[calc(100%-10rem)]" v-if="auth?.user?.profile">{{ auth?.user?.profile.dob }}</span>
                            </div>
                            <div class="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-start">
                                <span class="w-40 font-semibold">Gender : </span> 
                                <span class="w-[calc(100%-10rem)]" v-if="auth?.user?.profile">{{ auth?.user?.profile.gender }}</span>
                            </div>
                            <div class="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-start">
                                <span class="w-40 font-semibold">Address : </span> 
                                <span class="w-[calc(100%-10rem)]" v-if="auth?.user?.profile">{{ auth?.user?.profile.address }}</span>
                            </div>
                            <div class="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-start">
                                <span class="w-40 font-semibold">About Me : </span> 
                                <span class="w-[calc(100%-10rem)]" v-if="auth?.user?.profile">{{ auth?.user?.profile.about_me }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h1 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Password Change</h1>
                        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
                        <form class="space-y-6" @submit.prevent="passChange">
                            <div v-if="success_msg1" class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                <span class="font-medium">{{ success_msg1 }}</span>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-1/2">
                                <FormLabel for="old_password">New Password</FormLabel>
                                <FormInput type="password" name="old_password" id="old_password" placeholder="Old Password" v-model="passform.old_password"/>
                                <span v-if="errors1.old_password" class="text-sm text-red-500">{{ errors.old_password[0] }}</span>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-1/2">
                                <FormLabel for="new_password">New Password</FormLabel>
                                <FormInput type="password" name="new_password" id="new_password" placeholder="New Password" v-model="passform.new_password"/>
                                <span v-if="errors1.new_password" class="text-sm text-red-500">{{ errors.new_password[0] }}</span>
                            </div>
                            <div class="w-full md:w-1/2 lg:w-1/2">
                                <FormLabel for="password_confirmation">Confirm Password</FormLabel>
                                <FormInput type="password" name="password_confirmation" id="password_confirmation" placeholder="Password Confirmation" v-model="passform.password_confirmation"/>
                                <span v-if="errors1.password_confirmation" class="text-sm text-red-500">{{ errors.password_confirmation[0] }}</span>
                            </div>

                            <ButtonPrimary type="submit" class="w-auto">
                                <div class="flex items-center justify-center gap-x-2">
                                    <div role="status" v-if="loadbtn1">
                                        <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <span>Change Password</span>
                                </div>
                            </ButtonPrimary>
                        </form>
                    </div>

                </div>
            </div>
        </div>

        <!-- Main modal -->
        <div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <form @submit.prevent="profilePicUpdateBtn">
                        <!-- Modal header -->
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Profile Picture Change
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="p-4 md:p-5 space-y-4">
                            <div class="flex justify-center items-center gap-x-5">
                                <div class="flex items-center justify-center">
                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-40 h-40 rounded-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span></p>
                                            <!-- <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> -->
                                        </div>
                                        <input id="dropzone-file" type="file" class="hidden" @change="handleFileSelection( $event )"/>
                                    </label>
                                </div> 
                                <img :src="displayImage" class="w-40 h-40 object-contain rounded-full"/>
                            </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="default-modal" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save & Change</button>
                            <button data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>

</template>