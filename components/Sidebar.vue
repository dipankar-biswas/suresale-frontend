<template>
    <aside id="sidebar-multi-level-sidebar" class="fixed top-0 left-0 z-40 lg:z-0 w-64 h-screen lg:relative lg:h-auto transition-transform -translate-x-full md:translate-x-0" aria-label="Sidebar">
        <div class="h-full px-3 py-6 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-b-sm">
            <div class="s-categories mb-8">
                <h4 class="text-lg font-medium mb-4">Price Range</h4>
                <ul class="space-y-2 font-normal ps-3">
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Less then 500</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">501 to 1000</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">1001 to 1500</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">1501 to 2000</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">2001 to 3000</label>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="s-browse-market">
                <h4 class="text-lg font-medium mb-4">Filters</h4>

                <h4 class="text-md font-medium mb-3 ps-5">Brand</h4>
                <ul class="space-y-2 font-normal ps-6">
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Apple</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Ausu</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Dell</label>
                        </div>
                    </li>
                </ul>
                <h4 class="text-md font-medium mb-3 mt-3 ps-5">Condition</h4>
                <ul class="space-y-2 font-normal ps-6">
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">New</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Good</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Fair</label>
                        </div>
                    </li>
                </ul>

                <h4 class="text-md font-medium mb-3 mt-3 ps-5">Location</h4>
                <ul class="space-y-2 font-normal ps-6">
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Dhaka</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Chittagong</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Barishal</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Sylhet</label>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="ads mt-10">
                <div class="image rounded-lg w-full h-64 overflow-hidden">
                    <img src="assets/images/slider/slider-1.webp" alt="Product Title" class="w-full h-full">
                </div>
            </div>
        </div>
    </aside>
</template>