// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    username: string
    email: string
  }
  
  export type UpdateUserParams = {
    username: string
  }
  
  // ====== PRODDUCT PARAMS
  export type CreateProductParams = {
    userId: string
    product: {
      title: string
      description: string
      imageUrl: string
      categoryId: string
      price: string
    }
    path: string
  }
  
  export type UpdateProductParams = {
    userId: string
    product: {
      _id: string
      title: string
      imageUrl: string
      description: string
      categoryId: string
      price: string
    }
    path: string
  }
  
  export type DeleteProductParams = {
    productId: string
    path: string
  }
  
  export type GetAllProductParams = {
    query: string
    category: string
    limit: number
    page: number
  }
  
  export type GetProductsByUserParams = {
    userId: string
    limit?: number
    page: number
  }
  
  export type GetRelatedProductsByCategoryParams = {
    categoryId: string
    productId: string
    limit?: number
    page: number | string
  }
  
  export type Product = {
    _id: string
    title: string
    description: string
    price: string
    imageUrl: string
    organizer: {
      _id: string
      firstName: string
      lastName: string
    }
    category: {
      _id: string
      name: string
    }
  }
  
  // ====== CATEGORY PARAMS
  export type CreateCategoryParams = {
    categoryName: string
  }
  
  // ====== ORDER PARAMS
  export type CheckoutOrderParams = {
    productTitle: string
    productId: string
    price: string
    buyerId: string
  }
  
  export type CreateOrderParams = {
    stripeId: string
    productId: string
    buyerId: string
    totalAmount: string
    address: {
        city: string
        country: string
        line1: string
        line2?: string
        postal_code: string
      }
  }
  
  export type GetOrdersByProductParams = {
    productId: string
    searchString: string
  }
  
  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }
  
  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }