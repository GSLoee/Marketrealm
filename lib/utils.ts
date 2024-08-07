import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import qs from 'query-string'
import { UrlQueryParams, RemoveUrlQueryParams } from '@/types'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string, 
  options: {
    currency?: 'USD' | 'CAD',
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) {
  const {currency = 'USD', notation = 'compact'} = options

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('en-US', {
    style: 'currency', 
    currency,
    notation,
    maximumFractionDigits: 2
  }).format(numericPrice)
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const formatedPrice = (price: string) => {
  const amount = parseFloat(price)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  return formattedPrice
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params)

  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export const handleError = (error: unknown) => {
  console.log(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}