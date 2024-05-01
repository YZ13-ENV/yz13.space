import { links } from '@/const/nav-links'
import { Separator } from '@repo/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
const Footer = () => {
  return (
    <footer className='w-full flex flex-col gap-4 p-8 container mx-auto'>
      <div className='w-full flex'>
        <div className='w-full flex flex-col justify-between gap-4 max-w-xs'>
          <Image src="/dm-star-dark.svg" width={48} height={48} alt='footer-logo' />
          <div className="w-full flex flex-wrap gap-1 items-start">
            <span className="text-3xl font-bold text-muted-foreground">YZ13.</span>
            <span className="text-3xl font-bold">Frontend.</span>
            <span className="text-3xl font-bold">Think.</span>
            <span className="text-3xl font-bold">Develop.</span>
          </div>
        </div>
        <div className='w-full'>
          <div className='flex flex-col gap-2'>
            <span className='text-sm text-muted-foreground'>YZ13</span>
            {
              links.map(link =>
                <Link href={link.value} key={"footer-" + link.value}>{link.label}</Link>
              )
            }
          </div>
        </div>
      </div>
      <Separator />
      <div className='w-full flex items-center justify-between'>
        <span className='text-sm text-muted-foreground'>YZ13 - frontend developer</span>
        <span className='text-sm text-muted-foreground'>@2024</span>
      </div>
    </footer>
  )
}
export { Footer }
