import { links } from '@/const/nav-links'
import { cn } from '@repo/ui/cn'
import { Separator } from '@repo/ui/separator'
import Link from 'next/link'
import { ThemedLogo } from './theme-logo'

type Props = {
  className?: string
}
const Footer = ({ className = "" }: Props) => {
  return (
    <footer className={cn('w-full', className)}>
      <div className='container gap-4 p-8 flex flex-col'>
        <div className='flex w-full'>
          <div className='flex flex-col justify-between w-full max-w-xs gap-4'>
            <ThemedLogo width={72} height={72} mode="symbol" alt='footer-logo' />
            <div className="flex flex-wrap items-start w-full gap-1">
              <span className="text-3xl font-bold text-secondary">YZ13.</span>
              <span className="text-3xl font-bold">Frontend.</span>
              <span className="text-3xl font-bold">Think.</span>
              <span className="text-3xl font-bold">Develop.</span>
            </div>
          </div>
          <div className='w-full'>
            <nav className='flex flex-col gap-2 w-fit'>
              <span className='text-sm text-secondary'>YZ13</span>
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
          <span className='text-sm text-secondary'>YZ13 - frontend developer</span>
          <span className='text-sm text-secondary'>@2024</span>
        </div>
      </div>
    </footer>
  )
}
export { Footer }
