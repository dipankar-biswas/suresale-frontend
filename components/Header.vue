<script setup>
    const token = useTokenStore();
    const auth = useAuthStore();
</script>
<template>
    <div class="bg-white dark:bg-gray-900 w-full z-20 start-0 border-b border-gray-200 dark:border-gray-600 z-20">
      <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto px-4">
        <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <ul class="font-medium flex px-4 md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a href="#"
                        class="block py-2 px-3 text-sm font-normal text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">For Business</a>
                </li>
                <li>
                    <a href="#"
                        class="block py-2 px-3 text-sm font-normal text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">The Shops</a>
                </li>
                <li>
                    <a href="#"
                        class="block py-2 px-3 text-sm font-normal text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Compare</a>
                </li>
                <li>
                    <a href="#"
                        class="block py-2 px-3 text-sm font-normal text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Help</a>
                </li>
            </ul>
        </div>
        <div class="flex items-center">
            <ul class="font-medium flex flex-col px-4 md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a href="#"class="block py-2 px-3 text-sm font-normal text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        EN | BD
                    </a>
                </li>
            </ul>
        </div>
      </div>
    </div>

    <div class="header sticky top-0 z-20">
        <nav class="bg-white dark:bg-gray-900 w-full z-20 start-0 border-b border-gray-200 dark:border-gray-600">
            <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div class="flex items-center gap-x-7">
                    <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="assets/images/logo.svg" class="h-8" alt="Flowbite Logo"/>
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
                    </NuxtLink>
                </div>
                <div class="flex md:order-1 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div>
                        <template v-if="!token.getStatus">
                            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                    <li>
                                        <nuxt-link to="/auth/register"
                                            class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</nuxt-link>
                                    </li>
                                    <li>
                                        <nuxt-link to="/auth/login"
                                            class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</nuxt-link>
                                    </li>
                            </ul>
                        </template>
                        <template v-if="token.getStatus">
                            <div class="flex items-center gap-x-2 cursor-pointer" id="dropdownUser" data-dropdown-toggle="dropdownUserOptions">
                                <img class="w-7 h-7 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" v-if="auth?.user?.profile_picture" :src="useRuntimeConfig().public.imageUrl+auth?.user?.profile_picture" alt="Avatar">
                                <img class="w-7 h-7 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" v-else src="/assets/images/avatar.png" alt="Bonnie image"/>
                                <p>{{ auth.user.name }}</p>
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
                        </template>
                    </div>
                    <!-- <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post and Ads</button> -->
                </div>
            </div>
        </nav>
    </div>
</template>