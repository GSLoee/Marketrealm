'use client'
import React, { useState } from 'react'
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
import { Textarea } from '../ui/textarea'
import { FileUploader } from './FileUploader'
import { IProduct } from '@/lib/database/models/product.model'
import { productDefaultValues } from '@/constants'
import Image from 'next/image'
import { useUploadThing} from '@/lib/uploadthings'
import { createProduct, updateProduct } from '@/lib/actions/product.actions'
import { useRouter } from 'next/navigation'
 
const formSchema = z.object({
    title: z.string().min(2,"Title must be at least 2 characters."),
    description: z.string().min(3,"Description must be at least 2 characters.").max(400, 'Description must be less than 400 characters'),
    imageURL: z.string(),
    categoryId: z.string(),
    price: z.string(),
})

type ProductFormProps = {
    userId: string
    type: "Create" | "Update"
    product?: IProduct
    productId?: string
}

const ProductForm = ({ userId, type, product, productId}: ProductFormProps) => {
    const [files, setFiles] = useState<File[]>([])
    const initialValues = product && type === 'Update' ? product: productDefaultValues;

    const router = useRouter()
    const { startUpload } = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
      })
    
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
        let uploadedImageUrl = values.imageURL

        if(files.length > 0){
            const uploadedImages = await startUpload(files)

            if(!uploadedImages) {
                return
              }
        
              uploadedImageUrl = uploadedImages[0].url
            }

            if(type === 'Create') {
                try {
                  const newProduct = await createProduct({
                    product: { ...values, imageUrl: uploadedImageUrl },
                    userId,
                    path: '/profile'
                  })
          
                  if(newProduct) {
                    form.reset();
                    router.push(`/products/${newProduct._id}`)
                  }
                } catch (error) {
                  console.log(error);
                }
              }
          
              if(type === 'Update') {
                if(!productId) {
                  router.back()
                  return;
                }
          
                try {
                  const updatedProduct = await updateProduct({
                    userId,
                    product: { ...values, imageUrl: uploadedImageUrl, _id: productId },
                    path: `/products/${productId}`
                  })
          
                  if(updatedProduct) {
                    form.reset();
                    router.push(`/products/${updatedProduct._id}`)
                  }
                } catch (error) {
                  console.log(error);
                }
              }

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
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="imageURL"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <FileUploader 
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
  <FormField
    control={form.control}
    name="price"
    render={({ field }) => (
      <FormItem className="w-full">
        <FormControl>
          <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
            <Image
              src="/assets/icons/dollar-icon.png"
              alt="dollar"
              width={24}
              height={24}
              className="filter-grey"
            />
            <Input
              type="number"
              placeholder="Price"
              {...field}
              className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

    <Button 
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? (
            'Submitting...'
          ): `${type} Product `}</Button>
      </form>
    </Form>
  )
}


export default ProductForm