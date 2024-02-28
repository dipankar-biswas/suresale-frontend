<script setup>
const auth = useAuthStore();

const route = useRoute();
const form = reactive({
    linkPeram: route.fullPath.split("?")[1],
})

const errors = ref([]);
const message = ref(null);

onMounted( async() => {
    try{
        const data = await auth.emailVerify(form);
        success_msg.value = data.message;
    }catch(error){
        errors.value = error.data.errors;
    }  
})
</script>
<template>
    <div v-if="success_msg" class="p-4 my-4 text-sm text-green-800 text-center rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        <span class="font-medium">{{ success_msg }}</span>
    </div>
</template>