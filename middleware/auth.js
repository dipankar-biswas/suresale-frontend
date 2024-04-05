export default defineNuxtRouteMiddleware((to, from) => {
    const token = useTokenStore();
    const router = useRouter();
    
    if (!token.getStatus) {
        return navigateTo('/auth/login');
    }

    // const authCheck = async() => {
    //     const token = useTokenStore();
    //     try{
    //         const {data} = await useFetch(`${useRuntimeConfig().public.baseUrl}/profile`, {
    //                     headers: {
    //                         Accept: "application/json",
    //                         Authorization: `Bearer ${token.getToken}`,
    //                     },
    //                 });

    //         if (!data.value) {
    //             router.push('/auth/login');
    //         }else{
    //             if(from.fullPath == '/auth/login'){
    //                 router.push('/user/dashboard');
    //             }
    //         }
    //     }catch(error){
    //         console.log(error);
    //         router.push('/auth/login');
    //     }
    // }
    // authCheck();
    
    
})
