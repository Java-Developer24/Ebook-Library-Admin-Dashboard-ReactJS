import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { createBook } from "@/http/api"


const formSchema = z.object({
    title: z.string().min(2, {
      message: "title must be at least 2 characters.",
    }),
    genre: z.string().min(2, {
        message: "genre must be at least 2 characters.",
      }),
      description: z.string().min(2, {
        message: "description must be at least 2 characters.",
      }),
      
      coverImage: z.instanceof(FileList).refine((file) => file.length === 1, {
        message: "Cover Image is required.",
    }),
    file: z.instanceof(FileList).refine((file) => file.length === 1, {
        message: "Book PDF is required.",
    }),

  })

const CreateBook = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            genre: "",
            description: "",
           
          },
       
      })
      const coverImageRef=form.register('coverImage');
      const fileRef=form.register("file");
      
  const mutation = useMutation({
    mutationFn: createBook,

    onSuccess: () => {
      
      console.log("book created sucessfully");
      
      
    },
    
  })
      function onSubmit(values: z.infer<typeof formSchema>) {
        const  formdata=new FormData();

        formdata.append("title", values.title);
        formdata.append("genre",values.genre);
        formdata.append("description",values.description);
        formdata.append("coverImage",values.coverImage[0]);
        formdata.append("file",values.file[0])

        
        mutation.mutate(formdata);
        console.log(values)
        
      }
  return (
    <section>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between">
      <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
   
    <BreadcrumbItem>
    <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
   
    <BreadcrumbItem>
      <BreadcrumbPage>Create</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
<div className="flex items-center gap-4">
<Button variant={"outline"}>

<span className="ml-2">Cancel </span> 
</Button>
<Button type="submit" >

<span className="ml-2">Submit </span> 
</Button>
</div>
 
      </div>

      <Card className="mt-6">
        <CardHeader>
            <CardTitle className="text-2xl font-semibold">Create a new book </CardTitle>
            <CardDescription>Fill out the form below to create a new book 
            </CardDescription>
        </CardHeader>
        <CardContent>
            <FormField  control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
              <Input  type="text" className="w-full" required {...field}/>
                
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}/>
          <FormField  control={form.control} name="genre" render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
              <Input  type="text" className="w-full" required {...field}/>
                
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}/>
          <FormField  control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
              <Textarea   className="min-h-32" required {...field}/>
                
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}/>
            <FormField  control={form.control} name="coverImage" render={() => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
              <Input  type="file" className="w-full" required {...coverImageRef}/>
                
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}/>
           <FormField  control={form.control} name="file" render={() => (
            <FormItem>
              <FormLabel>Book PDF</FormLabel>
              <FormControl>
              <Input  type="file" className="w-full" required {...fileRef}/>
                
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}/>
           
              
        </CardContent>
      </Card>
            </form>

        </Form>
      
    </section>
  )
}

export default CreateBook
