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