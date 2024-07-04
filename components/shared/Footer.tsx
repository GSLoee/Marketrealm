import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-white h-20 relative'>
        
            <div className='border-t  border-gray-200'>
                <div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center'>
                    <div className='wrapper text-center md:text-left pb-2 pt-3 md:pb-0'>
                        <p className='text-sm text-muted-foreground'>
                            &copy; {new Date().getFullYear()} All rights reserved
                        </p>
                    </div>
                </div>
            </div>
    </footer>
  )
}

export default Footer