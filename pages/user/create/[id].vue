<script setup>
const auth = useAuthStore();
const route = useRoute();

const form = reactive({
    title: null,
    price: null,
    description: null,
    category: null,
    stock: null,
    condition: null,
    location: null,
    tags: [],
    image: [],
    sku: null,
    currency_id: 12,
    lat: null,
    lng: null,
    fields: {
        key1: []
    }
})


const categories = ref([]);
const getCetagories = async() => {
    refreshNuxtData();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/categories/types/${route.params.id}`);
        categories.value = data.value.data;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
getCetagories();

const fields = ref([]);
const categoryFields = async(id) => {
    console.log(id);
    refreshNuxtData();
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/categories/${id}`,{
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            }
        });
        fields.value = data.value.data;
        for (let i = 0; i < fields.value.length; i++) {
            // let fieldName = (fields.value[i].name).toLowerCase().replaceAll(' ','_');
            // let fieldValue = fields.value[i].name;
            let fieldObject = {
                name: fields.value[i].name,
                value: null
            };
            form.fields.key1.push(fieldObject);
        }
    }catch(error){
        console.log('Somthing Wrong!');
    }
}


const conditions = ref([]);
const getConditions = async() => {
    refreshNuxtData();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/conditions`);
        conditions.value = data.value;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
getConditions();




const galleryData = ref([]);
const showImage = ref(galleryData.value[0]);
const onChange = (event) => {
    form.image = event.target.files;
    for(let i=0; i<form.image.length; i++){
        showImage.value = URL.createObjectURL(event.target.files[0]);

        var reader = new FileReader();
        reader.onload = function(e) {
          const imageUrl = e.target.result;
          galleryData.value.push(imageUrl);
        }
        reader.readAsDataURL(form.image[i]);
    }

}


// let GalleryData = {
//     gallery: [
//         {
//             id: 0,
//             imgPath: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
//         },
//         {
//             id: 1,
//             imgPath: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
//         },
//         {
//             id: 2,
//             imgPath: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
//         },
//         {
//             id: 3,
//             imgPath: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
//         },
//         {
//             id: 4,
//             imgPath: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
//         },
//     ]
// }
// galleryData.value = GalleryData.gallery;



const open = ref(false);
const allTags = ref([]);
const todos = ref([]);
const todoText = ref("");
const tagKeyUp = async() => {
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/tags?name=${todoText.value}`,{
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        allTags.value = data.value;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
function addTodo(id,name) {
    form.tags.push([id]);
    todos.value.unshift({
        id: id,
        text: name,
    });
    todoText.value = "";
    allTags.value = "";
}
function removeTodo(index) {
    todos.value.splice(index, 1);
}


const handelSubmit = async() => {
    try{
        const { pending, data } = await useFetch('https://maps.googleapis.com/maps/api/geocode/json',{
            params:{
                address:form.location,
                key:'AIzaSyD-0xI794-kqn_h4sK6GJeACrGfDQMBUgk'
            }
        })
        form.lat = data.value?.results[0].geometry.location.lat;
        form.lng = data.value?.results[0].geometry.location.lng;

    }catch(error){
        console.log('Somthing Wrong!');
    }

    let formdata = new FormData();
    formdata.append("type_id", route.params.id);
    formdata.append("title", form.title);
    formdata.append("price", form.price);
    formdata.append("description", form.description);
    formdata.append("category_id", form.category);
    formdata.append("stock_amount", form.stock);
    formdata.append("condition_id", form.condition);
    formdata.append("location", form.location);
    formdata.append("currency_id", form.currency_id);
    formdata.append("lat", form.lat);
    formdata.append("lng", form.lng);
    formdata.append("currency_id", form.currency_id);
    for (let i = 0; i < form.tags.length; i++) {
        console.log(form.tags[i]);
        formdata.append(`tags[]`, form.tags[i]);
    }
    for (let i = 0; i < form.image.length; i++) {
        formdata.append(`image[]`, form.image[i]);
    }
    for (let i = 0; i < fields.value.length; i++) {
        formdata.append(`${fields.value[i].name}`, form.fields.key1[i].value);
    }

    for (var data of formdata) {
        console.log(data);
    }

    const token = useTokenStore();
    try{
        const data = await $fetch(`${useRuntimeConfig().public.baseUrl}/product`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
            body: formdata
        });

        return data;
    }catch(error){
        throw error;
    }
}


</script>
<template>
    <div class="content">
        <div class="max-w-screen-2xl flex gap-x-4 h-full mx-auto px-4 py-9">

            <div class="sidebar basis-72">
                <div>
                    <div class="s-categories bg-gray-100 px-3 py-4 rounded-md">
                        <nuxt-link to="/user/listings" class="text-sm font-semibold">Back</nuxt-link>
                        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
                        <h3 class="text-lg font-semibold mb-3">Sell Your Product</h3>

                        <div class="flex items-center justify-center w-full">
                            <label for="dropzone-file"
                                class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p v-if="galleryData.length > 0" class="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">{{ galleryData.length }} Items Selected</p>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                            class="font-semibold">Click to upload</span></p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" @change="onChange" multiple/>
                            </label>
                        </div>

                        <h4 class="text-md font-semibold mb-5 mt-8">Required</h4>
                        <div>
                            <div class="mb-3">
                                <input type="text" name="title" v-model="form.title" id="default-input" placeholder="Title"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                            <div class="mb-2">
                                <input type="text" name="price" v-model="form.price" id="default-input" placeholder="Price"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                            <div class="mb-3">
                                <textarea id="description" name="description" v-model="form.description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description"></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" class="sr-only peer">
                                    <div class="relative w-8 h-4 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-3.5 after:h-3.5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Price navigation</span>
                                </label>
                            </div>
                            <div class="mb-3">
                                <select id="categories"
                                    v-model="form.category"
                                    @change="categoryFields(form.category)"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Category DSF</option>
                                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                                </select>
                            </div>
                            <div v-if="fields.length > 0">
                                <div class="mb-2" v-for="field in fields" :key="field.id">
                                    <input type="text" :name="field.name" v-model="form.fields.key1[index].value" id="default-input" :placeholder="field.name[0]?.toUpperCase() + field.name?.slice(1)"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                            </div>
                            <div class="mb-2">
                                <input type="text" name="stock" v-model="form.stock" id="default-input" placeholder="Stock"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                            <div class="mb-3">
                                <select id="condition"
                                    v-model="form.condition"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Condition</option>
                                    <option v-for="cond in conditions" :key="cond.id" :value="cond.id">{{ cond.name }}</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <div class="form-group relative">
                                    <input type="text" 
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Todo Text"
                                        v-model="todoText"
                                        @keyup="tagKeyUp"
                                    >
                                    <ul @blur="alert('Ok')" v-if="allTags.length > 0" class="tag-lists absolute top-full bg-white shadow rounded-sm w-full z-10">
                                        <li v-for="tag in allTags" :key="tag.id" @click="addTodo(tag.id, tag.name)" class="px-2 py-1 text-sm font-normal hover:bg-gray-100">{{ tag.name }}</li>
                                    </ul>
                                </div>
                                <div v-if="todos.length > 0" class="todo_items flex flex-wrap gap-x-2 gap-y-3 mt-2 border-2 border-dashed p-1">
                                    <span 
                                        v-for="(todo, index) in todos" :key="index" 
                                        class="todo_item shadow-sm rounded flex items-center bg-gray-200 px-2 py-1"
                                        >
                                        <h5 class="text-sm">{{ todo.text }}</h5>
                                        <span @click="removeTodo(index)" class="text-sm ms-2 cursor-pointer hover:text-red-400">&#10005;</span>
                                    </span>
                                </div>
                            </div>

                            <div class="mb-2">
                                <input type="text" name="location" v-model="form.location" id="default-input" placeholder="Address"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>

                            <p class="text-sm text-gray-500 mt-6 leading-6">
                                Marketplace items are public and can be seen by anyone . Items like animals, drugs, weapons, counterfeits, and other items that infringe intellectual property aren't allowed on Marketplace. See our Commerce Policies 
                            </p>
                        </div>


                        <button type="button" @click="handelSubmit"
                            class="text-white flex items-center justify-center w-full gap-x-2 mt-5 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button>
                    </div>
                </div>
            </div>

            <div class="w-[calc(100%-basis-72)] w-full">
                <div class="mx-auto w-full max-w-screen-2xl">
                    <div class="bg-gray-100 rounded-md px-4 py-5 mb-5">
                        <h4 class="text-lg font-semibold mb-3">Priview</h4>
                        <div class="mx-auto w-full max-w-full my-4 flex gap-x-4 p-4 bg-white rounded shadow">
                            <div v-if="galleryData === undefined || galleryData.length == 0" class="mx-auto w-full max-w-1/2">
                                <div class="bg-gray-200 w-full h-full p-4 rounded-lg flex items-center">
                                    <div class="flex items-center justify-center w-full h-full">
                                        <label
                                            class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg class="w-14 h-14 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" d="M13 10c0-.6.4-1 1-1a1 1 0 1 1 0 2 1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                                                    <path fill-rule="evenodd" d="M2 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12c0 .6-.2 1-.6 1.4a1 1 0 0 1-.9.6H4a2 2 0 0 1-2-2V6Zm6.9 12 3.8-5.4-4-4.3a1 1 0 0 0-1.5.1L4 13V6h16v10l-3.3-3.7a1 1 0 0 0-1.5.1l-4 5.6H8.9Z" clip-rule="evenodd"/>
                                                </svg>
                                                <p class="mb-3 mt-4 text-sm text-gray-500 dark:text-gray-400"><span
                                                        class="font-semibold">Your Listing Preview</span></p>
                                                <p class="text-xs text-center text-gray-500 dark:text-gray-400">On the marketplace, you may see how it will look <br/> to other people.</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div v-else class="mx-auto w-full max-w-1/2">
                                <div class="grid gap-4">
                                    <div>
                                        <img class="h-auto max-w-full rounded-lg" :src="showImage" alt="Image">
                                    </div>
                                    <div class="grid grid-cols-5 gap-4">
                                        <div v-for="(slide,index) in galleryData" :key="index">
                                            <img @click="showImage = slide" class="h-auto max-w-full rounded-lg" :src="slide" alt="Image">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mx-auto w-full max-w-1/2">
                                <div class="bg-gray-100 w-full h-full p-4 rounded-lg">
                                    <h2 class="text-3xl font-semibold mb-3">
                                        <span v-if="form.title != null && form.title != ''">{{ form.title }}</span>
                                        <span v-else>Title</span>
                                    </h2>
                                    <h4 class="text-lg font-semibold mb-3">
                                        <span v-if="form.price != null && form.price != ''">Tk.{{ form.price }}</span>
                                        <span v-else>Price</span>
                                    </h4>
                                    <p class="text-sm font-normal mb-4">
                                        <span v-if="form.description != null && form.description != ''">{{ form.description }}</span>
                                        <span v-else>Description</span>
                                    </p>
                                    <h3 class="text-xl font-semibold mb-3">Details</h3>
                                    <p class="text-sm font-normal mb-2">
                                        <span v-if="form.category != null && form.category != ''" class="font-semibold">Category : </span><span>{{ form.category }}</span>
                                    </p>
                                    <div v-if="fields.length > 0">
                                        <p v-for="(field,index) in fields" :key="field.name.id" class="text-sm font-normal mb-2">
                                            <span class="font-semibold">{{ field.name[0]?.toUpperCase() + field.name?.slice(1) }} : </span><span>{{ form.fields.key1[index].value }}</span>
                                        </p>
                                    </div>
                                    <p class="text-sm font-normal mb-2">
                                        <span v-if="form.condition != null && form.condition != ''" class="font-semibold">Condition : </span><span>{{ form.condition }}</span>
                                    </p>
                                    <p class="text-sm font-normal mb-2">
                                        <span v-if="form.location != null && form.location != ''" class="font-semibold">Address : </span><span>{{ form.location }}</span>
                                    </p>
                                    <div class="location mt-5">
                                        <h4 class="text-lg font-semibold mb-2">Location</h4>
                                        <div class="map border border-gray-400 rounded-md overflow-hidden">
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.4367733384447!2d90.35431187071461!3d23.767456140979196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1e5f64e673d%3A0x8a5fc047c1d5198c!2sProjonmo%20Digital%20Ltd!5e0!3m2!1sen!2sbd!4v1707820809326!5m2!1sen!2sbd" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                        </div>
                                    </div>

                                    <div class="mt-6">
                                        <h4 class="text-xl font-semibold mb-2">Seller Information</h4>
                                        <hr class="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700">
                                        <div class="flex items-center gap-x-4 pb-10">
                                            <div class="border-2 bg-white border-gray-300 rounded-full shadow-lg relative z-10">
                                                <img class="w-16 h-16 rounded-full p-1" v-if="auth.user?.profile_picture" :src="useRuntimeConfig().public.imageUrl+auth.user?.profile_picture" alt="Bonnie image"/>
                                            </div>
                                            <div class="flex flex-col">
                                                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ auth.user?.name }}</h5>
                                                <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div class="shadow-md p-4 rounded-lg bg-gray-100">
                        <h4 class="text-md font-semibold mb-2">Stay Safe</h4>
                        <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
                        <p >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <a href="#" class="text-sm font-semibold mt-3 flex items-center">
                            <span>Read More</span>
                            <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 16 4-4-4-4m6 8 4-4-4-4"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>