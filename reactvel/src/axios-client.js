import axios from "axios"
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`
    // baseURL: 'http://127.0.0.1:8000'
})
// Mendapatkan CSRF token dari elemen meta di dokumen HTML
const csrfTokenElement = document.head.querySelector('meta[name="csrf-token"]');
const csrfToken = csrfTokenElement ? csrfTokenElement.content : null;

// Menambahkan CSRF token ke header permintaan axiosClient jika ditemukan
if (csrfToken) {
    axiosClient.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
}
axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

axiosClient.interceptors.response.use((response)=>{
    return response
},(error)=>{
    try{
        const {response} = error;
        if(response.status === 401){
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }catch(e){
        console.log(error)
    }

throw error;
})
export default axiosClient