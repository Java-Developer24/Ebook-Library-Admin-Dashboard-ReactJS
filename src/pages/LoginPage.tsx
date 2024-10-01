import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"
  import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


  
const LoginPage = () => {
  return (
    <section className="flex h-screen w-full items-center justify-center">
        <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <Button className="w-full">Sign in</Button>
        <div className="mt-4 text-center text-sm">
         Dont  have an account?{" "}
          <Link to={"/register"} className="underline">
            Sign in
          </Link>
        </div></div>
        
      </CardFooter>
    </Card>
    </section>
  )
}

export default LoginPage