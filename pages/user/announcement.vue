
<template>    
    <div class="content">
        <div class="max-w-screen-2xl flex gap-x-4 h-full mx-auto px-4 py-9">
            
            <UserSidebar></UserSidebar>

            <div class="w-[calc(100%-basis-72)] w-full">
                <div class="mx-auto w-full max-w-screen-2xl">

                    <div class="bg-gray-100 rounded-md px-4 py-5 mt-6">
                        <h4 class="text-lg font-semibold mb-3">Announcement</h4>
                        <div class="adses rounded grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-5" :class="[ listgrid == 2 ? 'grid' : 'flex flex-col' ]">
                            <div class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" :class="[ listgrid == 2 ? '' : 'flex' ]">
                                <div class="relative">
                                    <nuxt-link to="/ads-details">
                                        <img class="h-36 w-52 rounded-s-md" src="assets/images/slider/slider-1.webp" alt="Ads" />
                                    </nuxt-link>
                                </div>
                                <div class="px-5 py-3 w-full">
                                    <p class="text-md mb-2">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    </p>
                                    <p class="text-sm text-gray-400">2 hours ago</p>
                                </div>
                            </div>
                            <div class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" :class="[ listgrid == 2 ? '' : 'flex' ]">
                                <div class="relative">
                                    <nuxt-link to="/ads-details">
                                        <img class="h-36 w-52 rounded-s-md" src="assets/images/slider/slider-1.webp" alt="Ads" />
                                    </nuxt-link>
                                </div>
                                <div class="px-5 py-3 w-full">
                                    <p class="text-md mb-2">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    </p>
                                    <p class="text-sm text-gray-400">2 hours ago</p>
                                </div>
                            </div>
                            <div class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" :class="[ listgrid == 2 ? '' : 'flex' ]">
                                <div class="relative">
                                    <nuxt-link to="/ads-details">
                                        <img class="h-36 w-52 rounded-s-md" src="assets/images/slider/slider-1.webp" alt="Ads" />
                                    </nuxt-link>
                                </div>
                                <div class="px-5 py-3 w-full">
                                    <p class="text-md mb-2">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    </p>
                                    <p class="text-sm text-gray-400">2 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>