import {Link, useNavigate} from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import { useMutation } from "@tanstack/react-query"
import { register } from "@/http/api"
import { LoaderCircle } from "lucide-react"
import useTokenStore from "@/store"
// Define the response type for the register function
interface RegisterResponse {
  accessToken: string;
}

// Define the input type for the register function
interface RegisterVariables {
  email: string;
  password: string;
  name: string;
}
const RegisterPage = () => {

  const setToken=useTokenStore((state)=>state.setToken)
  const navigate = useNavigate();
  const nameRef=useRef<HTMLInputElement>(null)
  const emailRef=useRef<HTMLInputElement>(null)
  const passwordRef=useRef<HTMLInputElement>(null)

  const mutation =  useMutation<RegisterResponse, unknown, RegisterVariables>({
    mutationFn: register,

    onSuccess: (response) => {
      console.log("successfully registered");
      setToken(response.accessToken)
      navigate('/dashboard/home');
      
    },
  })

  const handleRegisterSubmit=()=>{
    const email=emailRef.current?.value;
    const password=passwordRef.current?.value;
    const name=nameRef.current?.value;
    console.log(email,password);
    //redirect to dashboard
    if (!email||!password||!name) {
      return alert("Please enter email,name and password")
      
    }
    
    //make server call.
    mutation.mutate({email,password,name})
  }







  return (
    <div>
       <section className="flex h-screen w-full items-center justify-center"> <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
          <br/>
          {mutation.isError&&<span className="text-red-500 text-sm">{"Something went wrong"}</span>}

        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Name</Label>
              <Input ref={nameRef} id="first-name" placeholder="Max" required />
            </div>
            
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
            ref={emailRef}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input ref={passwordRef} id="password" type="password" />
          </div>
          <Button type="submit" className="w-full" onClick={handleRegisterSubmit} disabled={mutation.isPending}>
          {mutation.isPending && <LoaderCircle className="animate-spin"/> }
          <span className="ml-2"> Create an account </span>
            
          </Button>
          
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card></section>
    </div>
  )
}

export default RegisterPage
