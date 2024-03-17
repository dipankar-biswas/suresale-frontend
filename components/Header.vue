<script setup>
    const token = useTokenStore();
    const auth = useAuthStore();
    const common = useCommonFun();
</script>
<template>

    <div class="bg-yellow-300 dark:bg-gray-900 w-full dark:border-gray-600 z-20">
      <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto px-4">
        <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <ul class="font-medium flex px-0 sm:px-2 md:px-3 md:flex-row rtl:space-x-reverse md:mt-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a href="#"
                        class="block py-1 px-1 sm:px-3 text-xs sm:text-sm md:text-sm font-normal text-gray-900 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">For Business</a>
                </li>
                <li>
                    <a href="#"
                        class="block py-1 px-1 sm:px-3 text-xs sm:text-sm md:text-sm font-normal text-gray-900 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">The Shops</a>
                </li>
                <li>
                    <a href="#"
                        class="block py-1 px-1 sm:px-3 text-xs sm:text-sm md:text-sm font-normal text-gray-900 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Compare</a>
                </li>
                <li>
                    <a href="#"
                        class="block py-1 px-1 sm:px-3 text-xs sm:text-sm md:text-sm font-normal text-gray-900 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Help</a>
                </li>
            </ul>
        </div>
        <div class="flex items-center">
            <ul class="font-medium flex flex-col px-0 sm:px-2 md:px-3 md:flex-row rtl:space-x-reverse md:mt-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a href="#"class="block py-1 px-1 sm:px-3 text-xs sm:text-sm md:text-sm font-normal text-gray-900 rounded dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        EN | BD
                    </a>
                </li>
            </ul>
        </div>
      </div>
    </div>

    <div class="header sticky top-0 z-20 shadow-lg">
        <nav class="bg-green-100 dark:bg-gray-900 w-full z-20 start-0 border-b border-gray-200 dark:border-gray-600 overflow-hidden">
            <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div class="flex items-center relative">
                    <div class="gap-x-7 after:absolute after:content-[''] after:bg-red-500 after:w-36 after:h-4 after:top-0 after:rotate-45 after:-right-2/4 sm:after:-right-3/4">
                        <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src="assets/images/suresale-logo.svg" class="h-8" alt="Logo"/>
                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
                        </NuxtLink>
                    </div>
                </div>
                <div class="flex md:order-1 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div>
                        <template v-if="!token.getStatus">
                            <ul class="font-normal md:font-medium flex items-center gap-x-4 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <div data-modal-target="logincheck-modal" data-modal-toggle="logincheck-modal" class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                                        </svg>
                                    </div>
                                </li>
                                <li>
                                    <div data-modal-target="logincheck-modal" data-modal-toggle="logincheck-modal" class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                </li>
                                <li>
                                    <nuxt-link to="/auth/register" class="text-white flex items-center w-full gap-x-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-3 py-1.5 text-center">Register</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/auth/login" class="text-white flex items-center w-full gap-x-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-3 py-1.5 text-center">Login</nuxt-link>
                                </li>
                            </ul>
                        </template>
                        <template v-if="token.getStatus">
                            <ul class="flex gap-x-4">
                                <li>
                                    <nuxt-link to="/user/bookmark" class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                                        </svg>
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/user/message" class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z" clip-rule="evenodd"/>
                                        </svg>
                                    </nuxt-link>
                                </li>
                                <!-- <li>
                                    <nuxt-link to="" class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM7 12.5a.5.5 0 0 1 .495.43.762.762 0 0 0 .157.096c.213.106.553.208 1.005.295.896.173 2.111.262 3.343.262 1.232 0 2.447-.09 3.343-.262.452-.087.792-.19 1.006-.295a.764.764 0 0 0 .156-.096.5.5 0 0 1 .995.07c0 1.19-.644 2.438-1.618 3.375C14.9 17.319 13.531 18 12 18c-1.531 0-2.9-.681-3.882-1.625C7.144 15.438 6.5 14.19 6.5 13a.5.5 0 0 1 .5-.5Zm9.519.417.003-.004-.003.004Zm-9.038 0a.017.017 0 0 1-.003-.004l.003.004Zm.901-4.853L9 6.81l.619 1.253 1.381.2-1 .976.236 1.376-1.237-.65-1.235.65L8 9.239l-1-.975 1.382-.2Zm6 0L15 6.81l.619 1.253 1.381.2-1 .976.236 1.376-1.237-.65-1.235.65L14 9.239l-1-.975 1.382-.2Z" clip-rule="evenodd"/>
                                        </svg>
                                    </nuxt-link>
                                </li> -->
                                <li>
                                    <div class="flex items-center gap-x-2 cursor-pointer" id="dropdownUser" data-dropdown-toggle="dropdownUserOptions">
                                        <img class="w-8 h-8 p-0.5 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" v-if="auth?.user?.profile_picture" :src="common?.defaultProfilePic(auth?.user?.profile_picture) == 0 ? auth?.user?.profile_picture : useRuntimeConfig().public.imageUrl+auth?.user?.profile_picture" alt="Avatar">
                                        <img class="w-8 h-8 p-0.5 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" v-else src="/assets/images/avatar.png" alt="Bonnie image"/>
                                        <!-- <p>{{ auth.user.name }}</p> -->
                                    </div>
                                    <!-- Dropdown menu -->
                                    <div id="dropdownUserOptions" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                        <ul class="py-2" aria-labelledby="dropdownUser">
                                            <li>
                                                <nuxt-link to="/user/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</nuxt-link>
                                            </li>
                                            <li>
                                                <nuxt-link to="/user/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</nuxt-link>
                                            </li>
                                            <li>
                                                <nuxt-link @click.prevent="auth.logout()" to="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</nuxt-link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <nuxt-link to="/user/create" class="text-white flex items-center w-full gap-x-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-3 py-1.5 text-center">
                                        <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                                        </svg>
                                        <span>Post an add</span>
                                    </nuxt-link>
                                </li>
                            </ul>
                        </template>
                    </div>
                    <!-- <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post and Ads</button> -->
                </div>
            </div>
        </nav>
    </div>
</template>