<script setup>
import { onMounted } from 'vue'
import { Modal, initFlowbite } from 'flowbite';

onMounted(() => {
    initFlowbite();
})
useSeoMeta({
  title: 'All Cateogories - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})
</script>
<template>
    All Categories
</template>