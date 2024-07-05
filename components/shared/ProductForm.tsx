'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Dropdown from './Dropdown'
 
 
const formSchema = z.object({
    title: z.string().min(2,"Title must be at least 2 characters."),
    description: z.string().min(3,"Description must be at least 2 characters.").max(400, 'Description must be less than 400 characters'),
    imageURL: z.string(),
    categoryId: z.string(),
    price: z.string(),
})

const ProductForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          description: "",
          imageURL: "",
          categoryId: "",
          price: "",
        },
      })
    
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" wrapper flex flex-col gap-5">
        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='w-full'>
              {/* <FormLabel>Title</FormLabel> */}
              <FormControl>
                <Input placeholder="Product name/title" {...field} 
                className='input-field'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className='w-full'>
              {/* <FormLabel>Title</FormLabel> */}
              <FormControl>
                <Dropdown onChangeHandler={field.onChange} value={field.value}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default ProductForm