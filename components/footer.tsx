import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react'
import { getData } from '@/lib/users'

export default function Footer() {
    return (
        <footer className='w-full border-t bg-background'>
            <div className='container px-4 py-12 md:px-6 md:py-16'>
                <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-4'>
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold'>GeoConnect</h3>
                        <p className='text-sm text-muted-foreground'>
                            Connect with friends and discover new places in your area with our advanced geolocation app.
                        </p>
                        <div className='flex space-x-4'>
                            <Link href='#' className='text-muted-foreground hover:text-foreground'>
                                <Facebook className='h-5 w-5' />
                                <span className='sr-only'>Facebook</span>
                            </Link>
                            <Link href='#' className='text-muted-foreground hover:text-foreground'>
                                <Twitter className='h-5 w-5' />
                                <span className='sr-only'>Twitter</span>
                            </Link>
                            <Link href='#' className='text-muted-foreground hover:text-foreground'>
                                <Instagram className='h-5 w-5' />
                                <span className='sr-only'>Instagram</span>
                            </Link>
                            <Link href='#' className='text-muted-foreground hover:text-foreground'>
                                <Linkedin className='h-5 w-5' />
                                <span className='sr-only'>LinkedIn</span>
                            </Link>
                            <Link href='#' className='text-muted-foreground hover:text-foreground'>
                                <Github className='h-5 w-5' />
                                <span className='sr-only'>GitHub</span>
                            </Link>
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold'>Company</h3>
                        <ul className='space-y-2 text-sm'>
                            <li>
                                <Link href='#' className='text-muted-foreground hover:text-foreground'>
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='mt-12 border-t pt-6'>
                    <p className='text-center text-sm text-muted-foreground'>
                        © {new Date().getFullYear()} GeoConnect. All rights reserved.
                        Version: {getData()}
                    </p>
                </div>
            </div>
        </footer>
    )
}
