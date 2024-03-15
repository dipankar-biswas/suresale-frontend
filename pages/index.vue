<script setup>
useSeoMeta({
  title: 'Suresale - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
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