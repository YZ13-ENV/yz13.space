import { links } from '@/const/nav-links'
import { Separator } from '@repo/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
const Footer = () => {
  return (
    <footer className='container flex flex-col w-full gap-4 p-8 mx-auto'>
      <div className='flex w-full'>
        <div className='flex flex-col justify-between w-full max-w-xs gap-4'>
          <Image src="/dm-star-dark.svg" width={48} height={48} alt='footer-logo' />
          <div className="flex flex-wrap items-start w-full gap-1">
            <span className="text-3xl font-bold text-muted-foreground">YZ13.</span>
            <span className="text-3xl font-bold">Frontend.</span>
            <span className="text-3xl font-bold">Think.</span>
            <span className="text-3xl font-bold">Develop.</span>
          </div>
        </div>
        <div className='w-full'>
          <nav className='flex flex-col gap-2 w-fit'>
            <span className='text-sm text-muted-foreground'>YZ13</span>
            {
              links.map(link =>
                <Link
                  className="transition-colors hover:underline text-accent-foreground/80 hover:text-accent-foreground"
                  href={link.value}
                  key={"footer-" + link.value}
                >
                  {link.label}
                </Link>
              )
            }
          </nav>
        </div>
      </div>
      <Separator />
      <div className='flex items-center justify-between w-full'>
        <span className='text-sm text-muted-foreground'>YZ13 - frontend developer</span>
        <span className='text-sm text-muted-foreground'>@2024</span>
      </div>
    </footer>
  )
}
export { Footer }
