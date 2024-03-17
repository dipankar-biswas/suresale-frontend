<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/_nuxt/assets/images/suresale-favicon.svg'
    },
  ]
});
useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>
<template>
  <div class="relative">
    <Header/>
      <slot />
    <Footer/>  
    
    <LoginCheck></LoginCheck>
    <ToasterAlert></ToasterAlert>
  </div>
</template>