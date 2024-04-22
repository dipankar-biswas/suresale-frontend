<script setup>
import { onMounted } from 'vue'
import { Modal, initFlowbite } from 'flowbite';

onMounted(() => {
    initFlowbite();
})

useSeoMeta({
  title: 'Suresale - A Bangladeshi Local Marketplace',
  ogTitle: 'Suresale - A Bangladeshi Local Marketplace',
  description: 'Suresale - A Bangladeshi Local Marketplace.',
  ogDescription: 'Suresale - A Bangladeshi Local Marketplace.',
  ogImage: 'image',
  twitterCard: 'image',
})
</script>

<template>
    <!-- Banner -->
    <HomeBanner></HomeBanner>

    <!-- Categories -->
    <HomeCategories></HomeCategories>


    <!-- Premium Ads -->
    <!-- <HomePremiumAds></HomePremiumAds> -->


    <!-- Todays Ads -->
    <!-- <HomeTodayAds></HomeTodayAds> -->
    <HomeRegularAds></HomeRegularAds>


    <!-- Popular Searches -->
    <HomePopularSearches></HomePopularSearches>

    <!-- Regular Ads -->
    <!-- <HomeRegularAds></HomeRegularAds> -->

    
</template>