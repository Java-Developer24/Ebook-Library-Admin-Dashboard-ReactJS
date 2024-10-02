import useTokenStore from '@/store';
import { Book } from '@/types';
import axios from 'axios'
// Define the type of the login response (based on your backend's response)

interface LoginResponse {
    accessToken: string;
  }
// Define the type for the Register response
interface RegisterResponse {
    accessToken: string;
  }
const api= axios.create({
    baseURL:"http://localhost:4000",
    headers:{
        "Content-Type":"application/json",
    }
});

api.interceptors.request.use((config)=>{
  const token=useTokenStore(state=>state.token);
  if (!config.headers) {
    config.headers = {};
  }
  if(token){
    config.headers.Authorization=`Bearer ${token}`;
  }
  return config;
})

export const login=async(data:{email:string;password:string})=>{
    const response = await api.post<LoginResponse>('/api/users/login', data);
  
  // Return the actual data, which includes accessToken
  return response.data;
}

export const register=async(data:{email:string;password:string;name:string})=>{
    const response = await api.post<RegisterResponse>('/api/users/register', data);
  
    // Make sure you're returning only the data part containing accessToken
    return response.data;
  
}

export const getBooks=async()=>{
  const response = await api.get<Book[]>('/api/users/books');
  return response.data; 
}
export const createBook=async(data:FormData)=>{
  const response=await api.post('/api/users/books',data,{
    headers:{
    'Content-Type':'multipart/form-data',

    },
  })
  return response.data;
}