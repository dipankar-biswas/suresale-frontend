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
  title: 'Suresale - A Bangladeshi Local Marketplace',
  ogTitle: 'Suresale - A Bangladeshi Local Marketplace',
  description: 'Suresale - A Bangladeshi Local Marketplace.',
  ogDescription: 'Suresale - A Bangladeshi Local Marketplace.',
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